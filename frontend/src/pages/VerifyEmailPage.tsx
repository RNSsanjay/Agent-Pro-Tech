import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { apiClient } from '../services/api';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const VerifyEmailPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setStatus('error');
                setMessage('Invalid verification link. No token provided.');
                return;
            }

            try {
                const response = await apiClient.verifyEmail(token);
                setStatus('success');
                setMessage(response.message);
            } catch (error: any) {
                setStatus('error');
                setMessage(error.response?.data?.detail || 'Email verification failed');
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-md w-full text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <div className="card">
                    {status === 'loading' && (
                        <>
                            <LoadingSpinner size="lg" />
                            <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                                Verifying your email...
                            </h2>
                            <p className="text-gray-600">Please wait while we verify your account.</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Email verified successfully!
                            </h2>
                            <p className="text-gray-600 mb-6">{message}</p>
                            <Button onClick={() => navigate('/login')} className="w-full">
                                Continue to Login
                            </Button>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Verification failed
                            </h2>
                            <p className="text-gray-600 mb-6">{message}</p>
                            <div className="space-y-3">
                                <Button onClick={() => navigate('/signup')} className="w-full">
                                    Sign up again
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => navigate('/login')}
                                    className="w-full"
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmailPage;
