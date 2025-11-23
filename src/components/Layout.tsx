import React from 'react';
import { Sidebar } from './Sidebar';
import { ScheduleGrid } from './ScheduleGrid';
import { ModuleList } from './ModuleList';
import { Printer, RefreshCw } from 'lucide-react';
import { useCourseStore } from '../store/useCourseStore';
import { validateConstraints } from '../utils/validation';

export const Layout: React.FC = () => {
    const selectedCourses = useCourseStore((state) => state.selectedCourses);
    const validation = validateConstraints(selectedCourses);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">MSE</div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 leading-tight">Course Planner</h1>
                        <p className="text-sm text-gray-500">Data Science Engineering</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Compliance</span>
                        <div className="flex items-center gap-2">
                            {validation.isValid ? (
                                <span className="text-green-500 font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Valid Plan
                                </span>
                            ) : (
                                <span className="text-red-500 font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Invalid Plan
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Print">
                            <Printer size={20} />
                        </button>
                        <button
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Reset"
                            onClick={() => {
                                if (confirm('Are you sure you want to reset your plan?')) {
                                    localStorage.removeItem('course-planner-storage');
                                    window.location.reload();
                                }
                            }}
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto shrink-0">
                    <Sidebar validation={validation} />
                </aside>

                {/* Schedule Area */}
                <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 p-6">
                    <div className="flex-1 overflow-y-auto">
                        <ScheduleGrid />
                    </div>
                    {/* Footer / Module List */}
                    <div className="mt-6 shrink-0">
                        <ModuleList />
                    </div>
                </div>
            </main>
        </div>
    );
};
