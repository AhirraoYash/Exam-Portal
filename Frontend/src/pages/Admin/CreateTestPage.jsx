import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

const adminName = "Admin";

// --- ICONS ---
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" /></svg>;
const CancelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 9.414V13h-2.5z" /><path d="M9 13h2v5a1 1 0 11-2 0v-5z" /></svg>;


const CreateTestPage = () => {
    const [testDetails, setTestDetails] = useState({
        subject: '',
        marksPerQuestion: '',
        date: '',
        startTime: '',
        endTime: '',
    });
    const [questionFile, setQuestionFile] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setTestDetails(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        setQuestionFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Creating test with details:", testDetails);
        console.log("Uploaded question file:", questionFile);
        // Add backend API call logic here to save the new test and upload the file
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
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Create a New Test</h2>

                        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Test Subject & Marks */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Test Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={testDetails.subject}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., Computer Science"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="marksPerQuestion" className="block text-sm font-medium text-gray-700 mb-1">Marks Per Question</label>
                                        <input
                                            type="number"
                                            id="marksPerQuestion"
                                            value={testDetails.marksPerQuestion}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="e.g., 2"
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Date */}
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={testDetails.date}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Time Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                        <input
                                            type="time"
                                            id="startTime"
                                            value={testDetails.startTime}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                        <input
                                            type="time"
                                            id="endTime"
                                            value={testDetails.endTime}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Questions (Excel File)</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="flex text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".xlsx, .xls" required />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">XLSX, XLS up to 10MB</p>
                                            {questionFile && <p className="text-sm text-green-600 font-semibold mt-2">{questionFile.name}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        className="flex items-center rounded-lg bg-gray-200 text-gray-700 px-5 py-2 font-semibold transition-colors hover:bg-gray-300"
                                    >
                                        <CancelIcon />
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center rounded-lg bg-blue-600 text-white px-5 py-2 font-semibold transition-transform hover:scale-105 shadow-md"
                                    >
                                        <SaveIcon />
                                        Create Test
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default CreateTestPage;
