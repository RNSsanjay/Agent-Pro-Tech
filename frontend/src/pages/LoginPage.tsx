import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (error) {
            // Error is handled by the auth context
        }
    };

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

                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-gray-600">Sign in to your StructMind account</p>
                </div>

                {/* Form */}
                <motion.div
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <FormInput
                                label="Email address"
                                type="email"
                                value={email}
                                onChange={setEmail}
                                placeholder="Enter your email"
                                required
                                error={errors.email}
                            />
                        </div>

                        <div>
                            <div className="relative">
                                <FormInput
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={setPassword}
                                    placeholder="Enter your password"
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
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link
                                    to="/forgot-password"
                                    className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <div className="text-center">
                            <span className="text-gray-600">Don't have an account? </span>
                            <Link
                                to="/signup"
                                className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </motion.div>

                {/* Admin Notice */}
                <motion.div
                    className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <p className="text-sm text-yellow-800">
                        <strong>Admin Access:</strong> Use <code>StructMind@ai.com</code> with password <code>123ugofree</code>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
