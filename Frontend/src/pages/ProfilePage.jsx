import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../Components/Header';

// --- MOCK DATA ---
const studentData = {
    name: 'Shrirup',
    email: 'shrirup@example.com',
    prn: 'PRN123456',
};

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileDetails, setProfileDetails] = useState(studentData);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProfileDetails(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Saving profile details:", profileDetails);
        setIsEditing(false);
        // API call here
    };

    return (
        <div className="flex font-sans">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                {/* Header */}
                <Header studentName={studentData.name} />

                {/* Page Content */}
                <main className="flex-1 mt-20 p-8 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Profile Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-2xl p-6 text-center">
                                    <div className="mx-auto h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                                        {studentData.name.charAt(0)}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800">{studentData.name}</h3>
                                    <p className="text-gray-500">{studentData.email}</p>
                                    <p className="mt-2 text-sm font-semibold text-blue-600">
                                        PRN: {studentData.prn}
                                    </p>
                                </div>
                            </div>

                            {/* Edit Form */}
                            <div className="lg:col-span-2">
                                <form onSubmit={handleSave} className="bg-white rounded-xl shadow-2xl p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(!isEditing)}
                                            className="text-sm font-semibold text-blue-600 hover:underline"
                                        >
                                            {isEditing ? 'Cancel' : 'Edit Profile'}
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={profileDetails.name}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="mt-1 w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={profileDetails.email}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                className="mt-1 w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="prn" className="block text-sm font-medium text-gray-600">
                                                PRN
                                            </label>
                                            <input
                                                type="text"
                                                id="prn"
                                                value={profileDetails.prn}
                                                disabled
                                                className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="mt-6 text-right">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
