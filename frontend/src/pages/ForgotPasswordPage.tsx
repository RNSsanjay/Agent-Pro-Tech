import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Mail, ArrowLeft } from 'lucide-react';
import { apiClient } from '../services/api';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import toast from 'react-hot-toast';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            setIsLoading(true);
            const response = await apiClient.forgotPassword(email);
            setEmailSent(true);
            toast.success(response.message);
        } catch (error: any) {
            const message = error.response?.data?.detail || 'An error occurred';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-md w-full text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="card">
                        <Mail className="h-16 w-16 text-primary-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
                        <p className="text-gray-600 mb-6">
                            If an account with email <strong>{email}</strong> exists,
                            we've sent you a password reset link.
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                        <div className="space-y-3">
                            <Button onClick={() => setEmailSent(false)} className="w-full">
                                Try Again
                            </Button>
                            <Link to="/login">
                                <Button variant="outline" className="w-full">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-md w-full space-y-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                {/* Header */}
                <div className="text-center">
                    <motion.div
                        className="flex items-center justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
                            <Brain className="h-8 w-8 text-white" />
                        </div>
                    </motion.div>

                    <h2 className="text-3xl font-bold text-gray-900">Forgot password?</h2>
                    <p className="mt-2 text-gray-600">
                        No worries, we'll send you reset instructions.
                    </p>
                </div>

                {/* Form */}
                <motion.div
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <FormInput
                            label="Email address"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            placeholder="Enter your email"
                            required
                            error={error}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send reset instructions'}
                        </Button>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium transition-colors"
                            >
                                <ArrowLeft size={16} className="mr-1" />
                                Back to login
                            </Link>
                        </div>
                    </form>
                </motion.div>

                {/* Additional Help */}
                <motion.div
                    className="text-center text-sm text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <p>
                        Remember your password?{' '}
                        <Link
                            to="/login"
                            className="text-primary-600 hover:text-primary-500 font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;
