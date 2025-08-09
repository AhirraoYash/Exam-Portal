import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

// --- MOCK DATA ---
const initialPendingStudents = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', prn: 'PRN12345' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', prn: 'PRN67890' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', prn: 'PRN11223' },
    { id: 4, name: 'Mary Williams', email: 'mary.w@example.com', prn: 'PRN44556' },
    { id: 5, name: 'David Brown', email: 'david.b@example.com', prn: 'PRN77889' },
];

const adminName = "Admin";

// --- ICONS ---
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

const StudentApprovalCard = ({ student, onApprove, onReject }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
        className="bg-white rounded-2xl shadow-lg flex items-center justify-between p-6 border border-gray-200"
    >
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                {student.name.charAt(0)}
            </div>
            <div>
                <p className="font-bold text-gray-800">{student.name}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
                <p className="text-sm text-gray-500 font-mono">{student.prn}</p>
            </div>
        </div>
        <div className="flex gap-3">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onReject(student.id)}
                className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
            >
                <XIcon />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onApprove(student.id)}
                className="p-3 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
            >
                <CheckIcon />
            </motion.button>
        </div>
    </motion.div>
);

const StudentApprovalsPage = () => {
    const [pendingStudents, setPendingStudents] = useState(initialPendingStudents);

    const handleApprove = (studentId) => {
        console.log(`Approving student with ID: ${studentId}`);
        setPendingStudents(prev => prev.filter(student => student.id !== studentId));
        // Add backend API call logic here
    };

    const handleReject = (studentId) => {
        console.log(`Rejecting student with ID: ${studentId}`);
        setPendingStudents(prev => prev.filter(student => student.id !== studentId));
        // Add backend API call logic here
    };

    return (
        <div className="bg-gray-50 font-sans flex">
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
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">Student Approval Requests</h2>
                                <p className="text-gray-500 mt-1">Review and manage new student sign-ups.</p>
                            </div>
                            <div className="bg-yellow-100 text-yellow-800 font-bold text-lg px-4 py-2 rounded-full">
                                {pendingStudents.length} Pending
                            </div>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {pendingStudents.length > 0 ? (
                                    pendingStudents.map((student) => (
                                        <StudentApprovalCard 
                                            key={student.id} 
                                            student={student} 
                                            onApprove={handleApprove} 
                                            onReject={handleReject} 
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 text-lg">No pending approvals.</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default StudentApprovalsPage;
