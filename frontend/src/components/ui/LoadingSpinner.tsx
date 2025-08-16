import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-primary-500 ${sizeClasses[size]}`}></div>
        </motion.div>
    );
};

export const LoadingPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-4">
                    <LoadingSpinner size="lg" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🧠 StructMind</h2>
                <p className="text-gray-600">Loading your intelligent assistant...</p>
            </motion.div>
        </div>
    );
};

export default LoadingSpinner;
