import dataScienceCourses from '../../hes-so-master-ds-courses.json';
import softwareEngineeringCourses from '../../hes-so-master-cs-s-courses.json';
import cyberSecurityCourses from '../../hes-so-master-cs-cy-courses.json';
import embeddedSystemsCourses from '../../hes-so-master-cs-e-courses.json';
import communicationSystemsCourses from '../../hes-so-master-cs-c-courses.json';
import informationAndCybersecurityCourses from '../../hes-so-master-ics-courses.json';
import type { Course, ValidationRules } from '../types';

export interface Program {
    id: string;
    name: string;
    description: string;
    courses: Course[];
    validationRules: ValidationRules;
}

const defaultRules: ValidationRules = {
    TSM: { max: 12, minRec: 6 },
    FTP: { max: 9, minRec: 3 },
    MA: { max: 18, minRec: 12 },
    CM: { max: 6, minRec: 0 },
    BONUS: 3,
};

const icsRules: ValidationRules = {
    TSM: { max: 12, minRec: 6 },
    FTP: { max: 9, minRec: 3 },
    MA: { max: 12, minRec: 9 },
    CM: { max: 6, minRec: 0 },
    BONUS: 3,
};

export const PROGRAMS: Program[] = [
    {
        id: 'ds',
        name: 'Data Science',
        description: 'Master of Science in Engineering - Data Science',
        courses: dataScienceCourses as Course[],
        validationRules: defaultRules,
    },
    {
        id: 'cs-s',
        name: 'Computer Science - Software Engineering',
        description: 'Master of Science in Engineering - Computer Science (Software Engineering)',
        courses: softwareEngineeringCourses as Course[],
        validationRules: defaultRules,
    },
    {
        id: 'cs-cy',
        name: 'Computer Science - Cybersecurity',
        description: 'Master of Science in Engineering - Computer Science (Cybersecurity)',
        courses: cyberSecurityCourses as Course[],
        validationRules: defaultRules,
    },
    {
        id: 'cs-e',
        name: 'Computer Science - Embedded Systems',
        description: 'Master of Science in Engineering - Computer Science (Embedded Systems)',
        courses: embeddedSystemsCourses as Course[],
        validationRules: defaultRules,
    },
    {
        id: 'cs-c',
        name: 'Computer Science - Communication Systems',
        description: 'Master of Science in Engineering - Computer Science (Communication Systems)',
        courses: communicationSystemsCourses as Course[],
        validationRules: defaultRules,
    },
    {
        id: 'ics',
        name: 'Information and Cybersecurity',
        description: 'Master of Science in Engineering - Information and Cybersecurity',
        courses: informationAndCybersecurityCourses as Course[],
        validationRules: icsRules,
    },
];

export const getProgramById = (id: string): Program | undefined => {
    return PROGRAMS.find(p => p.id === id);
};
