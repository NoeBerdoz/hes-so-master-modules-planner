import React, { useState } from 'react';
import { useCourseStore } from '../store/useCourseStore';
import { cn } from '../utils/cn';
import { X, ExternalLink, AlertTriangle } from 'lucide-react';

const TIME_BLOCKS = [
    { id: 'TB1', label: 'Block 1', time: '08:55 - 11:10' },
    { id: 'TB2', label: 'Block 2', time: '11:15 - 13:40' },
    { id: 'TB3', label: 'Block 3', time: '15:00 - 17:25' },
    { id: 'TB4', label: 'Block 4', time: '17:30 - 19:55' },
];

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const ScheduleGrid: React.FC = () => {
    const { removeCourse, getSelectedCourses } = useCourseStore();
    const selectedCourses = getSelectedCourses();
    const [semester, setSemester] = useState<'1' | '2' | '3' | '4'>('1');

    const getCourseForSlot = (day: string, block: string) => {
        return selectedCourses.filter(
            (c) => c.WeekDay === day && c.TimeBlock === block && c.assignedSemester === semester
        );
    };

    const getCategoryColor = (moduleCode: string) => {
        if (moduleCode.startsWith('TSM')) return 'bg-blue-100 border-blue-200 text-blue-800';
        if (moduleCode.startsWith('FTP')) return 'bg-purple-100 border-purple-200 text-purple-800';
        if (moduleCode.startsWith('MA')) return 'bg-emerald-100 border-emerald-200 text-emerald-800';
        if (moduleCode.startsWith('CM')) return 'bg-amber-100 border-amber-200 text-amber-800';
        return 'bg-gray-100 border-gray-200 text-gray-800';
    };

    const semesterECTS = selectedCourses
        .filter(c => c.assignedSemester === semester)
        .reduce((sum, c) => sum + (c.credits || 3), 0);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-4">
                    <div className="flex bg-gray-200 p-1 rounded-lg">
                        {(['1', '2', '3', '4'] as const).map((s) => (
                            <button
                                key={s}
                                className={cn(
                                    "px-4 py-1.5 rounded-md text-sm font-bold transition-all",
                                    semester === s ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                )}
                                onClick={() => setSemester(s)}
                            >
                                S{s}
                            </button>
                        ))}
                    </div>
                    <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Semester Credits:</span>
                        <span className="text-sm font-bold text-blue-600">{semesterECTS} ECTS</span>
                    </div>
                </div>

                <div className="flex gap-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> TSM</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> FTP</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> MA</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> CM</div>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto p-6">
                <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-4 min-w-[800px]">
                    {/* Header Row */}
                    <div className="col-start-2 col-span-5 grid grid-cols-5 gap-4 mb-2">
                        {WEEK_DAYS.map((day) => (
                            <div key={day} className="text-center font-bold text-gray-600 uppercase tracking-wider text-sm bg-white py-2 rounded-lg border border-gray-100 shadow-sm">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Time Blocks */}
                    {TIME_BLOCKS.map((block) => (
                        <React.Fragment key={block.id}>
                            {/* Time Label */}
                            <div className="flex flex-col justify-center items-center text-center py-4 bg-white rounded-xl border border-gray-100 shadow-sm h-[140px]">
                                <span className="font-bold text-gray-700 text-sm">{block.label}</span>
                                <span className="text-xs text-gray-400 mt-1">{block.time.split(' - ')[0]}</span>
                                <div className="w-px h-4 bg-gray-200 my-1"></div>
                                <span className="text-xs text-gray-400">{block.time.split(' - ')[1]}</span>
                            </div>

                            {/* Days */}
                            {WEEK_DAYS.map((day) => {
                                const coursesInSlot = getCourseForSlot(day, block.id);
                                const isCollision = coursesInSlot.length > 1;

                                return (
                                    <div
                                        key={`${day}-${block.id}`}
                                        className={cn(
                                            "rounded-xl border border-dashed transition-all h-[140px] relative group p-2 overflow-y-auto",
                                            coursesInSlot.length > 0 ? "border-transparent bg-gray-50" : "border-gray-200 bg-white hover:bg-gray-50"
                                        )}
                                    >
                                        {coursesInSlot.map((course) => (
                                            <div
                                                key={course.module}
                                                className={cn(
                                                    "w-full h-full rounded-lg p-3 border shadow-sm relative flex flex-col justify-between transition-transform hover:scale-[1.02]",
                                                    getCategoryColor(course.module),
                                                    isCollision ? "h-[48%] mb-1 border-red-300 bg-red-50" : "h-full"
                                                )}
                                            >
                                                {isCollision && (
                                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full z-10 shadow-sm">
                                                        <AlertTriangle size={12} />
                                                    </div>
                                                )}

                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <span className="font-bold text-xs">{course.module}</span>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); removeCourse(course.module); }}
                                                            className="text-current opacity-40 hover:opacity-100 transition-opacity"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] font-medium leading-tight mt-1 line-clamp-3 opacity-80">
                                                        {course.title}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-[10px] font-bold opacity-60">{course.type === 'R' ? 'Recommended' : 'Optional'}</span>
                                                    <a
                                                        href={course.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-current opacity-40 hover:opacity-100"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink size={12} />
                                                    </a>
                                                </div>
                                                {course.location && (
                                                    <div className="mt-1 flex items-center gap-1 text-[9px] opacity-60 font-medium uppercase tracking-wider">
                                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                            <circle cx="12" cy="10" r="3"></circle>
                                                        </svg>
                                                        {course.location}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
