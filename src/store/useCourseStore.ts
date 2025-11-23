import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Course } from '../types';
import coursesData from '../../hes-so-master-ds-courses.json';

interface CourseStore {
    allCourses: Course[];
    selectedCourses: Course[];
    addCourse: (course: Course) => void;
    removeCourse: (moduleCode: string) => void;
    toggleCourse: (course: Course) => void;
    isCourseSelected: (moduleCode: string) => boolean;
}

export const useCourseStore = create<CourseStore>()(
    persist(
        (set, get) => ({
            allCourses: coursesData as Course[],
            selectedCourses: [],
            addCourse: (course) =>
                set((state) => {
                    if (state.selectedCourses.some((c) => c.module === course.module)) {
                        return state;
                    }
                    return { selectedCourses: [...state.selectedCourses, course] };
                }),
            removeCourse: (moduleCode) =>
                set((state) => ({
                    selectedCourses: state.selectedCourses.filter((c) => c.module !== moduleCode),
                })),
            toggleCourse: (course) => {
                const { isCourseSelected, addCourse, removeCourse } = get();
                if (isCourseSelected(course.module)) {
                    removeCourse(course.module);
                } else {
                    addCourse(course);
                }
            },
            isCourseSelected: (moduleCode) =>
                get().selectedCourses.some((c) => c.module === moduleCode),
        }),
        {
            name: 'course-planner-storage',
            partialize: (state) => ({ selectedCourses: state.selectedCourses }),
        }
    )
);
