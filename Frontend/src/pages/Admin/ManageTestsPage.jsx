import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

// --- MOCK DATA ---
const existingTests = [
    { id: 'cs-101', subject: 'Computer Science', date: '2025-08-09', questions: 30, status: 'Upcoming' },
    { id: 'math-202', subject: 'Mathematics', date: '2025-08-10', questions: 50, status: 'Upcoming' },
    { id: 'physics-301', subject: 'Physics', date: '2025-08-08', questions: 20, status: 'Completed' },
];

const adminName = "Admin";

// --- ICONS ---
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 9.414V13h-2.5z" />
        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
    </svg>
);

const ManageTestsPage = () => {
    const navigate = useNavigate();

    const handleCreateTest = () => {
        navigate('/admin/create-test'); // Redirect to CreateNewTest.jsx
    };

    const handleUploadQuestions = () => {
        console.log("Opening upload questions modal...");
    };

    return (
        <div className="flex font-sans">
            <AdminSidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <AdminHeader adminName={adminName} />
                <main className="flex-1 mt-20 p-8 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Manage Tests</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleCreateTest}
                                    className="flex items-center rounded-lg bg-blue-600 text-white px-5 py-2 font-semibold transition-transform hover:scale-105 shadow-md"
                                >
                                    <PlusIcon />
                                    Create New Test
                                </button>
                              
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-100 border-b border-gray-200">
    <tr>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Test Subject</th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">No. of Questions</th>
        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
    </tr>
</thead>
<tbody className="divide-y divide-gray-200">
    {existingTests.map((test) => (
        <tr key={test.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-center font-bold text-gray-900">{test.subject}</td>
            <td className="px-6 py-4 text-center text-gray-700">{test.date}</td>
            <td className="px-6 py-4 text-center font-semibold text-gray-700">{test.questions}</td>
            <td className="px-6 py-4 text-center">
                <span className={`px-3 py-1 rounded-full font-semibold text-xs ${
                    test.status === 'Upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-800'
                }`}>
                    {test.status}
                </span>
            </td>
        </tr>
    ))}
</tbody>

                            </table>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default ManageTestsPage;
