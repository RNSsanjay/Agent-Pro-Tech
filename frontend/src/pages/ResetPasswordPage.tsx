import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { apiClient } from '../services/api';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import toast from 'react-hot-toast';

const ResetPasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'form' | 'success' | 'invalid_token'>('form');
    const navigate = useNavigate();

    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatus('invalid_token');
        }
    }, [token]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: string, value: string) => {
        if (field === 'password') {
            setPassword(value);
        } else {
            setConfirmPassword(value);
        }

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !token) return;

        try {
            setIsLoading(true);
            const response = await apiClient.resetPassword(token, password);
            setStatus('success');
            toast.success(response.message);
        } catch (error: any) {
            const message = error.response?.data?.detail || 'Password reset failed';
            toast.error(message);
            if (error.response?.status === 400) {
                setStatus('invalid_token');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'invalid_token') {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-md w-full text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="card">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Invalid Reset Link
                        </h2>
                        <p className="text-gray-600 mb-6">
                            This password reset link is invalid or has expired.
                            Please request a new password reset.
                        </p>
                        <div className="space-y-3">
                            <Button onClick={() => navigate('/forgot-password')} className="w-full">
                                Request New Reset Link
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/login')}
                                className="w-full"
                            >
                                Back to Login
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-md w-full text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="card">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Password Reset Successful!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Your password has been successfully reset. You can now log in with your new password.
                        </p>
                        <Button onClick={() => navigate('/login')} className="w-full">
                            Continue to Login
                        </Button>
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

                    <h2 className="text-3xl font-bold text-gray-900">Reset your password</h2>
                    <p className="mt-2 text-gray-600">Choose a new password for your account</p>
                </div>

                {/* Form */}
                <motion.div
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <FormInput
                                label="New Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(value) => handleChange('password', value)}
                                placeholder="Enter new password"
                                required
                                error={errors.password}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="relative">
                            <FormInput
                                label="Confirm New Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(value) => handleChange('confirmPassword', value)}
                                placeholder="Confirm new password"
                                required
                                error={errors.confirmPassword}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Password Requirements */}
                        <div className="text-sm text-gray-600">
                            <p className="font-medium mb-2">Password must contain:</p>
                            <ul className="space-y-1">
                                <li className={`flex items-center ${password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                                    <CheckCircle size={16} className="mr-2" />
                                    At least 6 characters
                                </li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating password...' : 'Update password'}
                        </Button>
                    </form>
                </motion.div>

                {/* Back to Login */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Button
                        variant="outline"
                        onClick={() => navigate('/login')}
                        className="w-full"
                    >
                        Back to Login
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;
