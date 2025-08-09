import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../Components/Header';
import TestCard from '../components/TestCard';

// --- MOCK DATA ---
// The 'id' now matches the keys in the MCQTestPage's data object.
const availableTests = [
    {
        id: 'cs-101', 
        subject: 'Computer Science',
        // This test is now active for one hour
        startTime: '2025-08-09T19:44:00',
        endTime: '2025-08-09T21:18:00'
    },
    {
        id: 'math-202',
        subject: 'Mathematics',
        startTime: '2025-08-10T14:00:00',
        endTime: '2025-08-10T15:30:00'
    },
    {
        id: 'physics-301',
        subject: 'Physics',
        startTime: '2025-08-08T09:00:00',
        endTime: '2025-08-08T10:00:00'
    },
];

const studentName = "Shrirup";

const StudentDashboard = () => {
    return (
        <div className="font-sans">
            <Sidebar />
            <div className="ml-64">
                <Header studentName={studentName} />
                <main className="mt-20 p-10 h-[calc(100vh-5rem)] overflow-y-auto flex flex-col items-center">
                    <div className="w-full max-w-7xl">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Upcoming Tests
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {availableTests.map(test => (
                                <TestCard key={test.id} test={test} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;
