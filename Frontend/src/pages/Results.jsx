import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../Components/Header';

// --- MOCK DATA ---
const completedTests = [
    { id: 'physics-301', subject: 'Physics', date: '2025-08-08', score: 75, total: 100 },
    { id: 'algo-101', subject: 'Algorithms', date: '2025-07-22', score: 90, total: 100 },
    { id: 'db-201', subject: 'Database Systems', date: '2025-07-15', score: 82, total: 100 },
];

const studentName = "Shrirup";

const ResultsPage = () => {
    return (
        <div className="font-sans">
            {/* Sidebar */}
            <Sidebar />

            {/* Main section shifted for sidebar */}
            <div className="ml-64">
                {/* Fixed Header */}
                <Header studentName={studentName} />

                {/* Main Content with space for fixed header */}
                <main className="mt-20 p-10 h-[calc(100vh-5rem)] overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Test Results</h2>

                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                            <table className="min-w-full text-left">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Date Completed</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Marks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {completedTests.map((test) => {
                                        const percentage = (test.score / test.total) * 100;
                                        let scoreColor = 'text-green-600';
                                        if (percentage < 50) scoreColor = 'text-red-600';
                                        else if (percentage < 75) scoreColor = 'text-orange-500';

                                        return (
                                            <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-bold text-gray-900">{test.subject}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-gray-700">{test.date}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`font-extrabold ${scoreColor}`}>
                                                        {test.score} / {test.total} ({percentage}%)
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default ResultsPage;
