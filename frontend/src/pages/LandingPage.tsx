import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, MessageCircle, Shield, Zap, Users, Star } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Navigation */}
            <nav className="px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Brain className="h-8 w-8 text-primary-600" />
                        <span className="text-2xl font-bold text-gray-900">StructMind</span>
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link to="/login">
                            <Button variant="outline" size="sm">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                    </motion.div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="px-6 py-20">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Meet Your{' '}
                        <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            AI Assistant
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        StructMind is your intelligent companion powered by Google Gemini 1.5 Flash.
                        Get answers, solve problems, and explore ideas with cutting-edge AI technology.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <Link to="/signup">
                            <Button size="lg" className="w-full sm:w-auto">
                                Get Started Free
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Sign In
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-600">
                            Everything you need for intelligent conversations
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MessageCircle,
                                title: 'Smart Conversations',
                                description: 'Engage in natural, context-aware conversations with advanced AI capabilities.',
                            },
                            {
                                icon: Zap,
                                title: 'Lightning Fast',
                                description: 'Get instant responses powered by Google Gemini 1.5 Flash technology.',
                            },
                            {
                                icon: Shield,
                                title: 'Secure & Private',
                                description: 'Your conversations are protected with enterprise-grade security.',
                            },
                            {
                                icon: Users,
                                title: 'Multi-Session',
                                description: 'Organize conversations with multiple chat sessions and history.',
                            },
                            {
                                icon: Star,
                                title: 'Personalized',
                                description: 'Tailored responses that learn and adapt to your communication style.',
                            },
                            {
                                icon: Brain,
                                title: 'Intelligent',
                                description: 'Advanced reasoning and problem-solving capabilities at your fingertips.',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="card text-center hover:shadow-xl transition-shadow duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                            >
                                <feature.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.4 }}
                    >
                        Ready to Get Started?
                    </motion.h2>

                    <motion.p
                        className="text-xl text-primary-100 mb-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.6 }}
                    >
                        Join thousands of users who are already experiencing the future of AI conversation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.8 }}
                    >
                        <Link to="/signup">
                            <Button
                                size="lg"
                                className="bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105"
                            >
                                Start Your Journey
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 bg-gray-900">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Brain className="h-6 w-6 text-primary-400" />
                        <span className="text-xl font-bold text-white">StructMind</span>
                    </div>
                    <p className="text-gray-400">
                        © 2024 StructMind. All rights reserved. Powered by AI innovation.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
