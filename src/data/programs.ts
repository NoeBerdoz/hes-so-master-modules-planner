import dataScienceCourses from '../../hes-so-master-ds-courses.json';
import softwareEngineeringCourses from '../../hes-so-master-cs-s-courses.json';
import cyberSecurityCourses from '../../hes-so-master-cs-cy-courses.json';
import embeddedSystemsCourses from '../../hes-so-master-cs-e-courses.json';
import communicationSystemsCourses from '../../hes-so-master-cs-c-courses.json';
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
    {
        id: 'cs-cy',
        name: 'Computer Science - Cybersecurity',
        description: 'Master of Science in Engineering - Computer Science (Cybersecurity)',
        courses: cyberSecurityCourses as Course[],
    },
    {
        id: 'cs-e',
        name: 'Computer Science - Embedded Systems',
        description: 'Master of Science in Engineering - Computer Science (Embedded Systems)',
        courses: embeddedSystemsCourses as Course[],
    },
    {
        id: 'cs-c',
        name: 'Computer Science - Communication Systems',
        description: 'Master of Science in Engineering - Computer Science (Communication Systems)',
        courses: communicationSystemsCourses as Course[],
    },
];

export const getProgramById = (id: string): Program | undefined => {
    return PROGRAMS.find(p => p.id === id);
};
