import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Course, SelectedCourse } from '../types';
import { PROGRAMS, getProgramById } from '../data/programs';

interface CourseStore {
    currentProgramId: string | null;
    selectedCoursesByProgram: Record<string, SelectedCourse[]>;

    // Actions
    setProgram: (programId: string) => void;
    addCourse: (course: Course, assignedSemester: '1' | '2' | '3' | '4') => void;
    removeCourse: (moduleCode: string) => void;
    isCourseSelected: (moduleCode: string) => boolean;
    refreshData: () => void;

    // Getters (computed)
    getAllCourses: () => Course[];
    getSelectedCourses: () => SelectedCourse[];
}

export const useCourseStore = create<CourseStore>()(
    persist(
        (set, get) => ({
            currentProgramId: null,
            selectedCoursesByProgram: {},

            setProgram: (programId) => set({ currentProgramId: programId }),

            addCourse: (course, assignedSemester) =>
                set((state) => {
                    const programId = state.currentProgramId;
                    if (!programId) return state;

                    const currentSelections = state.selectedCoursesByProgram[programId] || [];

                    if (currentSelections.some((c) => c.module === course.module)) {
                        return state;
                    }
                    const newCourse: SelectedCourse = { ...course, assignedSemester };

                    return {
                        selectedCoursesByProgram: {
                            ...state.selectedCoursesByProgram,
                            [programId]: [...currentSelections, newCourse],
                        },
                    };
                }),

            removeCourse: (moduleCode) =>
                set((state) => {
                    const programId = state.currentProgramId;
                    if (!programId) return state;

                    const currentSelections = state.selectedCoursesByProgram[programId] || [];

                    return {
                        selectedCoursesByProgram: {
                            ...state.selectedCoursesByProgram,
                            [programId]: currentSelections.filter((c) => c.module !== moduleCode),
                        },
                    };
                }),

            isCourseSelected: (moduleCode) => {
                const state = get();
                const programId = state.currentProgramId;
                if (!programId) return false;
                const currentSelections = state.selectedCoursesByProgram[programId] || [];
                return currentSelections.some((c) => c.module === moduleCode);
            },

            refreshData: () =>
                set((state) => {
                    const newSelectionsByProgram = { ...state.selectedCoursesByProgram };

                    Object.keys(newSelectionsByProgram).forEach(programId => {
                        const program = getProgramById(programId);
                        if (!program) return;

                        const freshCoursesMap = new Map(program.courses.map((c) => [c.module, c]));
                        newSelectionsByProgram[programId] = newSelectionsByProgram[programId].map(selected => {
                            const freshData = freshCoursesMap.get(selected.module);
                            if (freshData) {
                                return { ...freshData, assignedSemester: selected.assignedSemester };
                            }
                            return selected;
                        });
                    });

                    return { selectedCoursesByProgram: newSelectionsByProgram };
                }),

            getAllCourses: () => {
                const state = get();
                if (!state.currentProgramId) return [];
                return getProgramById(state.currentProgramId)?.courses || [];
            },

            getSelectedCourses: () => {
                const state = get();
                if (!state.currentProgramId) return [];
                return state.selectedCoursesByProgram[state.currentProgramId] || [];
            }
        }),
        {
            name: 'course-planner-storage-v2', // Changed name to avoid conflicts with old structure
            partialize: (state) => ({
                currentProgramId: state.currentProgramId,
                selectedCoursesByProgram: state.selectedCoursesByProgram
            }),
        }
    )
);
