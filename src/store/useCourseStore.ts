import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Course, SelectedCourse } from '../types';
import coursesData from '../../hes-so-master-ds-courses.json';

interface CourseStore {
    allCourses: Course[];
    selectedCourses: SelectedCourse[];
    addCourse: (course: Course, assignedSemester: '1' | '2' | '3' | '4') => void;
    removeCourse: (moduleCode: string) => void;
    isCourseSelected: (moduleCode: string) => boolean;
    refreshData: () => void;
}

export const useCourseStore = create<CourseStore>()(
    persist(
        (set, get) => ({
            allCourses: coursesData as Course[],
            selectedCourses: [],
            addCourse: (course, assignedSemester) =>
                set((state) => {
                    if (state.selectedCourses.some((c) => c.module === course.module)) {
                        return state;
                    }
                    const newCourse: SelectedCourse = { ...course, assignedSemester };
                    return { selectedCourses: [...state.selectedCourses, newCourse] };
                }),
            removeCourse: (moduleCode) =>
                set((state) => ({
                    selectedCourses: state.selectedCourses.filter((c) => c.module !== moduleCode),
                })),
            isCourseSelected: (moduleCode) =>
                get().selectedCourses.some((c) => c.module === moduleCode),
            refreshData: () =>
                set((state) => {
                    const freshCoursesMap = new Map(state.allCourses.map((c) => [c.module, c]));
                    const updatedSelectedCourses = state.selectedCourses.map((selected) => {
                        const freshData = freshCoursesMap.get(selected.module);
                        if (freshData) {
                            return { ...freshData, assignedSemester: selected.assignedSemester };
                        }
                        return selected;
                    });
                    return { selectedCourses: updatedSelectedCourses };
                }),
        }),
        {
            name: 'course-planner-storage',
            partialize: (state) => ({ selectedCourses: state.selectedCourses }),
        }
    )
);
