import React from 'react';
import { useCourseStore } from '../store/useCourseStore';
import { PROGRAMS } from '../data/programs';
import { GraduationCap, ArrowRight } from 'lucide-react';

export const ProgramSelector: React.FC = () => {
    const setProgram = useCourseStore((state) => state.setProgram);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-200">
                        <GraduationCap size={32} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Select your Master Program</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose your specialization to start planning your courses.
                        Each program has its own specific modules and requirements.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {PROGRAMS.map((program) => (
                        <button
                            key={program.id}
                            onClick={() => setProgram(program.id)}
                            className="group relative bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 text-left"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl" />

                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {program.name}
                            </h3>
                            <p className="text-gray-500 mb-6 leading-relaxed">
                                {program.description}
                            </p>

                            <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                Start Planning <ArrowRight size={16} className="ml-2" />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-12 text-center text-sm text-gray-400">
                    More programs coming soon...
                </div>
            </div>
        </div>
    );
};
