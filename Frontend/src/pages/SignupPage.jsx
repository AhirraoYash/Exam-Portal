// File: frontend/src/pages/SignupPage.jsx
// Description: The user registration page component, styled with Tailwind CSS.

import React, { useState } from 'react';

const SignupPage = () => {
    // State to manage all form inputs in one object
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'student', // Default role
        department: 'Computer Science', // Default department
        prn: '',
        year: 'First Year', // Default year
    });

    // Destructure for easier access in the form, especially for conditional rendering
    const { role } = formData;

    // A single handler to update the state for any form field change
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Placeholder for form submission logic. We will connect this to our API later.
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        // In a real step, we would call our apiService here.
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    {/* Input fields for core user info */}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input name="fullName" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full Name" onChange={onChange} />
                        </div>
                        <div>
                            <input name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" onChange={onChange} />
                        </div>
                        <div>
                            <input name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={onChange} />
                        </div>
                    </div>

                    {/* Dropdowns for Role and Department */}
                    <div className="space-y-4">
                        <div>
                             <label htmlFor="role" className="sr-only">Role</label>
                             <select id="role" name="role" value={role} onChange={onChange} className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="student">I am a Student</option>
                                <option value="teacher">I am a Teacher</option>
                            </select>
                        </div>
                         <div>
                             <label htmlFor="department" className="sr-only">Department</label>
                             <select id="department" name="department" onChange={onChange} className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option>Computer Science</option>
                                <option>Mechanical Engineering</option>
                                <option>Physics</option>
                                <option>Chemistry</option>
                            </select>
                        </div>

                        {/* Conditional fields that only appear if the role is 'student' */}
                        {role === 'student' && (
                            <>
                                <div>
                                    <input name="prn" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="PRN Number" onChange={onChange} />
                                </div>
                                 <div>
                                     <label htmlFor="year" className="sr-only">Year</label>
                                     <select id="year" name="year" onChange={onChange} className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option>First Year</option>
                                        <option>Second Year</option>
                                        <option>Third Year</option>
                                        <option>Fourth Year</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
