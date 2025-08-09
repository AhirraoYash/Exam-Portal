import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// --- ICONS ---
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;

const TestCard = ({ test }) => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [isTestActive, setIsTestActive] = useState(false);
    const [testStatus, setTestStatus] = useState('Upcoming');

    useEffect(() => {
        const checkTestStatus = () => {
            const now = new Date();
            const startTime = new Date(test.startTime);
            const endTime = new Date(test.endTime);

            if (now < startTime) setTestStatus('Upcoming');
            else if (now >= startTime && now <= endTime) setTestStatus('Active');
            else setTestStatus('Expired');
        };
        checkTestStatus();
        const interval = setInterval(checkTestStatus, 1000);
        return () => clearInterval(interval);
    }, [test.startTime, test.endTime]);
    
    useEffect(() => {
        setIsTestActive(testStatus === 'Active');
    }, [testStatus]);

    const handleStartTest = () => {
        if (isTestActive) {
            navigate(`/test/${test.id}`); // Navigate to the specific test URL
        }
    };

    const getButtonClass = () => {
        if (testStatus === 'Active') return 'bg-green-600 hover:bg-green-700';
        if (testStatus === 'Upcoming') return 'bg-blue-600 cursor-not-allowed';
        return 'bg-gray-400 cursor-not-allowed';
    };

    return (
        <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2"
            whileHover={{ scale: 1.03 }}
        >
            <div className={`h-2 ${testStatus === 'Active' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{test.subject}</h3>
                <p className="text-sm text-gray-500 mt-1">Mid-Term Examination</p>
                <div className="mt-6 space-y-3 text-gray-600">
                    <div className="flex items-center"><CalendarIcon /><span>Date: {new Date(test.startTime).toLocaleDateString()}</span></div>
                    <div className="flex items-center"><ClockIcon /><span>Time: {new Date(test.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(test.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                </div>
                <div className="mt-6">
                    <button 
                        onClick={handleStartTest} // Add the click handler
                        disabled={!isTestActive}
                        className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md ${getButtonClass()}`}
                    >
                        {testStatus === 'Active' ? 'Start Test' : testStatus}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default TestCard;