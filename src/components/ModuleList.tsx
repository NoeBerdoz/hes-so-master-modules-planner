import React from 'react';
import { useCourseStore } from '../store/useCourseStore';
import { cn } from '../utils/cn';

export const ModuleList: React.FC = () => {
    const { getSelectedCourses } = useCourseStore();
    const selectedCourses = getSelectedCourses();

    const totalECTS = selectedCourses.length * 3;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-sm">MODULE LIST</h3>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full font-bold">{selectedCourses.length}</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Total ECTS:</span>
                <span className={cn(
                    "px-3 py-1 rounded-lg font-bold text-sm",
                    totalECTS >= 90 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                )}>
                    {totalECTS}
                </span>
            </div>
        </div>
    );
};
