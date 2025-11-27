import dataScienceCourses from '../../hes-so-master-ds-courses.json';
import softwareEngineeringCourses from '../../hes-so-master-cs-s-courses.json';
import type { Course } from '../types';

export interface Program {
    id: string;
    name: string;
    description: string;
    courses: Course[];
}

export const PROGRAMS: Program[] = [
    {
        id: 'ds',
        name: 'Data Science',
        description: 'Master of Science in Engineering - Data Science',
        courses: dataScienceCourses as Course[],
    },
    {
        id: 'cs-s',
        name: 'Computer Science - Software Engineering',
        description: 'Master of Science in Engineering - Computer Science (Software Engineering)',
        courses: softwareEngineeringCourses as Course[],
    },
];

export const getProgramById = (id: string): Program | undefined => {
    return PROGRAMS.find(p => p.id === id);
};
