import React, { useState, useMemo } from 'react';
import { useCourseStore } from '../store/useCourseStore';
import { Plus, Search } from 'lucide-react';
import { cn } from '../utils/cn';

export const AddModule: React.FC = () => {
    const { allCourses, addCourse, isCourseSelected } = useCourseStore();
    const [search, setSearch] = useState('');
    const [semesterFilter, setSemesterFilter] = useState<'1' | '2' | null>(null);
    const [typeFilter, setTypeFilter] = useState<'R' | 'O' | null>(null);

    const filteredCourses = useMemo(() => {
        return allCourses.filter((course) => {
            const matchesSearch =
                course.module.toLowerCase().includes(search.toLowerCase()) ||
                course.title.toLowerCase().includes(search.toLowerCase());
            const matchesSemester = semesterFilter ? course.Semester === semesterFilter : true;
            const matchesType = typeFilter ? course.type === typeFilter : true;
            const notSelected = !isCourseSelected(course.module);
            return matchesSearch && matchesSemester && matchesType && notSelected;
        });
    }, [allCourses, search, semesterFilter, typeFilter, isCourseSelected]);

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="bg-blue-600 text-white p-1 rounded-full">
                    <Plus size={14} />
                </span>
                Add Module
            </h2>

            <div className="space-y-4 mb-4">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Module Name / Code</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Type code (e.g. FTP_Alg) or name..."
                            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Semester</label>
                        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                            <button
                                className={cn(
                                    "flex-1 py-1 text-xs font-bold rounded transition-colors",
                                    semesterFilter === '1' ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                                )}
                                onClick={() => setSemesterFilter(semesterFilter === '1' ? null : '1')}
                            >
                                S1
                            </button>
                            <button
                                className={cn(
                                    "flex-1 py-1 text-xs font-bold rounded transition-colors",
                                    semesterFilter === '2' ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                                )}
                                onClick={() => setSemesterFilter(semesterFilter === '2' ? null : '2')}
                            >
                                S2
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Type</label>
                        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                            <button
                                className={cn(
                                    "flex-1 py-1 text-xs font-bold rounded transition-colors",
                                    typeFilter === 'R' ? "bg-emerald-500 text-white" : "text-gray-600 hover:bg-gray-50"
                                )}
                                onClick={() => setTypeFilter(typeFilter === 'R' ? null : 'R')}
                            >
                                Rec.
                            </button>
                            <button
                                className={cn(
                                    "flex-1 py-1 text-xs font-bold rounded transition-colors",
                                    typeFilter === 'O' ? "bg-gray-500 text-white" : "text-gray-600 hover:bg-gray-50"
                                )}
                                onClick={() => setTypeFilter(typeFilter === 'O' ? null : 'O')}
                            >
                                Opt.
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto border border-gray-100 rounded-xl bg-gray-50 p-2 space-y-2 max-h-[300px]">
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">No modules found</div>
                ) : (
                    filteredCourses.map((course) => (
                        <div
                            key={course.module}
                            className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                            onClick={() => addCourse(course)}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-gray-800 text-sm">{course.module}</span>
                                <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded font-bold uppercase",
                                    course.type === 'R' ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                                )}>
                                    {course.type === 'R' ? 'Rec' : 'Opt'}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-2">{course.title}</p>
                            <div className="flex justify-between items-center text-[10px] text-gray-400">
                                <span>{course.WeekDay} • {course.TimeBlock}</span>
                                <span className="group-hover:text-blue-600 font-bold transition-colors">+ Add</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
