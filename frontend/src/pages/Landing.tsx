import React, { useState, useEffect, useRef } from 'react';
import './Landing.css';

// Paradox Animation Component
const ParadoxAnimation = () => {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden">
            {/* Infinite spiraling cubes */}
            <div className="absolute inset-0 paradox-container">
                <div className="paradox-cube-1"></div>
                <div className="paradox-cube-2"></div>
                <div className="paradox-cube-3"></div>
                <div className="paradox-cube-4"></div>
            </div>

            {/* Möbius strip animation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="mobius-strip"></div>
            </div>

            {/* Infinite zoom fractal */}
            <div className="absolute inset-0 fractal-zoom">
                <div className="fractal-layer-1"></div>
                <div className="fractal-layer-2"></div>
                <div className="fractal-layer-3"></div>
                <div className="fractal-layer-4"></div>
            </div>

            {/* Paradox rings */}
            <div className="absolute top-1/4 left-1/4 paradox-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
            </div>
            <div className="absolute bottom-1/4 right-1/4 paradox-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
            </div>
        </div>
    );
};

// Center Portal Component
const CenterPortal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <div className={`fixed inset-0 z-50 transition-all duration-1000 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className={`portal-overlay ${isOpen ? 'portal-open' : ''}`} onClick={onClose}>
                <div className={`portal-content ${isOpen ? 'portal-content-open' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <div className="relative w-full h-full bg-gradient-to-br from-black via-blue-900 to-black overflow-hidden">
                        {/* Portal animation background */}
                        <div className="portal-bg-animation">
                            <div className="portal-particle"></div>
                            <div className="portal-particle"></div>
                            <div className="portal-particle"></div>
                            <div className="portal-particle"></div>
                        </div>

                        <div className="flex items-center justify-center h-full">
                            <div className="text-center space-y-8 portal-inner-content">
                                <h1 className="text-6xl font-bold text-white mb-8 animate-portalText">
                                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        Welcome to the Future
                                    </span>
                                </h1>
                                <p className="text-2xl text-gray-300 mb-12 animate-portalText" style={{ animationDelay: '0.5s' }}>
                                    Experience the next dimension of development
                                </p>
                                <div className="space-y-6 animate-portalText" style={{ animationDelay: '1s' }}>
                                    <button className="portal-button bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-full text-xl font-semibold">
                                        Enter the Portal
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="portal-button border-2 border-blue-400 text-blue-400 px-12 py-4 rounded-full text-xl font-semibold ml-6"
                                    >
                                        Return
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 text-white/70 hover:text-white text-3xl transition-colors"
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Background Animation Component
const BackgroundAnimation = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute w-96 h-96 bg-blue-600/5 rounded-full blur-3xl top-1/4 -left-48 animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute w-96 h-96 bg-blue-600/5 rounded-full blur-3xl bottom-0 right-0 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute w-80 h-80 bg-blue-600/5 rounded-full blur-3xl top-0 right-1/4 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute w-72 h-72 bg-blue-600/5 rounded-full blur-3xl bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '3s' }}></div>

            {/* Grid patterns */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

            {/* Animated dots */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-blue-400/50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-3/4 left-2/3 w-2 h-2 rounded-full bg-blue-400/50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-blue-400/50 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-2/3 left-3/4 w-2 h-2 rounded-full bg-blue-400/50 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/3 left-3/5 w-2 h-2 rounded-full bg-blue-400/50 animate-pulse" style={{ animationDelay: '2.5s' }}></div>

            {/* Shooting stars */}
            <div className="absolute w-[150px] h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent top-1/5 left-1/4 rotate-[30deg] animate-shimmer"></div>
            <div className="absolute w-[100px] h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent top-2/3 right-1/4 -rotate-[45deg] animate-shimmer" style={{ animationDelay: '1s' }}></div>
        </div>
    );
};

const Landing: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showArchitecture, setShowArchitecture] = useState(false);
    const [showProject, setShowProject] = useState(false);
    const [promptText, setPromptText] = useState('e-commerce platform with user auth');
    const [portalOpen, setPortalOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMouseMoving, setIsMouseMoving] = useState(false);

    // Refs for each section
    const mainRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // Mouse movement tracking for cursor animations
    useEffect(() => {
        let mouseTimeout: number;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsMouseMoving(true);

            // Update custom cursor position
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }

            // Apply magnetic effect to interactive elements
            const interactiveElements = document.querySelectorAll('.magnetic-element');
            interactiveElements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                const distanceX = e.clientX - elementCenterX;
                const distanceY = e.clientY - elementCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                const maxDistance = 100; // Magnetic effect radius

                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = (distanceX * strength) * 0.3;
                    const moveY = (distanceY * strength) * 0.3;

                    (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.1})`;
                } else {
                    (element as HTMLElement).style.transform = 'translate(0px, 0px) scale(1)';
                }
            });

            // Apply card tilt effect to marvel cards
            const marvelCards = document.querySelectorAll('.marvel-card');
            marvelCards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                const rotateX = (e.clientY - cardCenterY) / rect.height * -10; // Max 10 degrees
                const rotateY = (e.clientX - cardCenterX) / rect.width * 10; // Max 10 degrees

                (card as HTMLElement).style.setProperty('--rotate-x', `${rotateX}deg`);
                (card as HTMLElement).style.setProperty('--rotate-y', `${rotateY}deg`);
            });

            clearTimeout(mouseTimeout);
            mouseTimeout = window.setTimeout(() => {
                setIsMouseMoving(false);
            }, 100);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('cursor-hover')) {
                if (cursorRef.current) {
                    cursorRef.current.classList.add('cursor-enlarged');
                }
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('cursor-hover')) {
                if (cursorRef.current) {
                    cursorRef.current.classList.remove('cursor-enlarged');
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
            clearTimeout(mouseTimeout);
        };
    }, []);

    // Handle scroll effect for navbar and section transitions - Enhanced
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setScrollY(currentScrollY);

                    if (currentScrollY > 50) {
                        setScrolled(true);
                    } else {
                        setScrolled(false);
                    }

                    // Calculate which section is currently in view
                    const sections = [heroRef, featuresRef, aboutRef, ctaRef];
                    const viewportHeight = window.innerHeight;

                    let activeSectionIndex = 0;
                    sections.forEach((ref, index) => {
                        if (ref.current) {
                            const rect = ref.current.getBoundingClientRect();
                            const sectionTop = rect.top + currentScrollY;
                            const sectionHeight = rect.height;

                            // Check if section is in the center of viewport
                            if (sectionTop <= currentScrollY + viewportHeight / 2 &&
                                sectionTop + sectionHeight > currentScrollY + viewportHeight / 2) {
                                activeSectionIndex = index;
                            }
                        }
                    });

                    setCurrentSection(activeSectionIndex);

                    // Apply section transition effects
                    sections.forEach((ref) => {
                        if (ref.current) {
                            const rect = ref.current.getBoundingClientRect();
                            const sectionCenter = rect.top + rect.height / 2;
                            const viewportCenter = viewportHeight / 2;
                            const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
                            const maxDistance = viewportHeight;

                            // Calculate scale and opacity based on distance from viewport center
                            const proximity = Math.max(0, 1 - (distanceFromCenter / maxDistance));
                            const scale = 0.8 + (proximity * 0.2); // Scale from 0.8 to 1.0
                            const opacity = 0.3 + (proximity * 0.7); // Opacity from 0.3 to 1.0
                            const translateY = (1 - proximity) * 50; // Slight vertical offset

                            // Apply transforms with smooth transitions
                            ref.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
                            ref.current.style.opacity = opacity.toString();
                            ref.current.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
                        }
                    });

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Remove duplicate scroll handler
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowArchitecture(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Simulate project generation after architecture is shown
    useEffect(() => {
        if (showArchitecture) {
            const timer = setTimeout(() => {
                setShowProject(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showArchitecture]);

    // Smooth scroll to section
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-x-hidden relative cursor-none">
            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className="custom-cursor fixed pointer-events-none z-[100] mix-blend-difference"
                style={{
                    background: `radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)`,
                    transform: `translate(-50%, -50%) scale(${isMouseMoving ? 1.2 : 1})`,
                }}
            />

            {/* Cursor Trail Particles */}
            <div className="cursor-trail fixed pointer-events-none z-[99]"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}>
                <div className="trail-particle"></div>
                <div className="trail-particle" style={{ animationDelay: '0.1s' }}></div>
                <div className="trail-particle" style={{ animationDelay: '0.2s' }}></div>
            </div>

            <ParadoxAnimation />
            <BackgroundAnimation />
            <CenterPortal isOpen={portalOpen} onClose={() => setPortalOpen(false)} />

            {/* Center Portal Trigger Square - Optimized */}
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer portal-trigger"
                onClick={() => setPortalOpen(true)}
                style={{
                    opacity: scrollY > 50 ? Math.max(0, Math.min(1, (scrollY - 50) / 200)) : 0,
                    transform: `translate(-50%, -50%) rotate(${scrollY * 0.2}deg) scale(${Math.min(1 + scrollY * 0.0005, 1.3)})`
                }}
            >
                <div className="portal-square">
                    <div className="portal-square-inner">
                        <div className="portal-square-content">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={mainRef} className="main-content-wrapper">
                {/* Navigation Header */}
                <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 shadow-lg backdrop-blur-md py-3' : 'bg-transparent py-6'}`}>
                    <div className="container mx-auto px-6 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:rotate-12 hover:scale-110 magnetic-element cursor-hover">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <h1 className="text-2xl font-bold text-white magnetic-element cursor-hover">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                                    StructMind
                                </span>
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            <button
                                onClick={() => scrollToSection('features')}
                                className="text-gray-300 hover:text-blue-400 transition-colors relative group py-2 magnetic-element cursor-hover"
                            >
                                Features
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="text-gray-300 hover:text-blue-400 transition-colors relative group py-2 magnetic-element cursor-hover"
                            >
                                About
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection('cta')}
                                className="text-gray-300 hover:text-blue-400 transition-colors relative group py-2 magnetic-element cursor-hover"
                            >
                                Get Started
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg magnetic-element cursor-hover">
                                Sign In
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-300 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div className={`md:hidden absolute w-full bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
                        <div className="container mx-auto px-6 flex flex-col space-y-4">
                            <button
                                onClick={() => scrollToSection('features')}
                                className="text-gray-300 hover:text-blue-400 transition-colors py-2 w-full text-left"
                            >
                                Features
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="text-gray-300 hover:text-blue-400 transition-colors py-2 w-full text-left"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection('cta')}
                                className="text-gray-300 hover:text-blue-400 transition-colors py-2 w-full text-left"
                            >
                                Get Started
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all w-full">
                                Sign In
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="container mx-auto px-6">
                    <div ref={heroRef} className="min-h-screen flex flex-col justify-center items-center pt-24 pb-16 section-wrapper">
                        <div className="text-center mb-16 relative">
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                            <div className="relative animate-magicAppear magnetic-element" style={{ animationDelay: '0.3s' }}>
                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 relative cursor-hover"
                                    style={{
                                        transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg) rotateX(${(mousePosition.y - window.innerHeight / 2) * -0.01}deg)`
                                    }}>
                                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent relative inline-block animate-gradient">
                                        Struct<span className="text-white">Mind</span>
                                    </span>
                                </h1>
                                <p className="text-lg text-blue-400/80 mb-6 animate-slideInUp cursor-hover" style={{ animationDelay: '0.6s' }}>
                                    Prompt → Architecture → Project
                                </p>
                            </div>

                            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto animate-slideInUp magnetic-element cursor-hover" style={{ animationDelay: '0.9s' }}>
                                <span className="text-blue-400 font-semibold">AI-powered architecture creation</span> platform.
                                Transform your ideas into structured project architectures with intelligent prompts and automated generation.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center animate-slideInUp" style={{ animationDelay: '1.2s' }}>
                                <button onClick={() => scrollToSection('cta')} className="group relative blue-glow bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg overflow-hidden magnetic-element cursor-hover">
                                    <span className="relative z-10">Get Started</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                </button>
                                <button className="group relative border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold transition-all overflow-hidden magnetic-element cursor-hover">
                                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Learn More</span>
                                    <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </button>
                            </div>

                            {/* Bouncing arrow indicator */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDelay: '2s' }}>
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </div>

                        <div className="w-full max-w-5xl mx-auto relative animate-fadeIn" style={{ animationDelay: '1.5s' }}>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent blur-lg"></div>
                            <div className="relative bg-gray-800/30 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm shadow-xl marvel-card">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <div className="flex-1 text-center">
                                        <span className="text-sm text-gray-400">StructMind Terminal</span>
                                    </div>
                                </div>

                                {/* Interactive Terminal Prompt */}
                                <div className="font-mono text-sm text-gray-300 space-y-2 relative">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-blue-400">structmind $</span>
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                value={promptText}
                                                onChange={(e) => setPromptText(e.target.value)}
                                                className="w-full bg-gray-800/50 border border-gray-700 rounded px-3 py-1 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="Enter your architecture prompt..."
                                            />
                                            <button
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300"
                                                onClick={() => {
                                                    setShowArchitecture(false);
                                                    setShowProject(false);
                                                    setTimeout(() => setShowArchitecture(true), 1000);
                                                }}
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-gray-400">Analyzing requirements...</p>
                                    <p className="text-gray-400">Generating architecture blueprint...</p>

                                    {/* Architecture Output */}
                                    <div className={`transition-all duration-500 ${showArchitecture ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="py-2 space-y-1">
                                            <p className="text-green-400">✓ Architecture generated successfully!</p>
                                            <div className="bg-gray-900/50 rounded-lg p-3 mt-2 border border-gray-700">
                                                <div className="flex items-center mb-2">
                                                    <div className="w-4 h-4 bg-blue-500/30 rounded-sm flex items-center justify-center mr-2">
                                                        <span className="text-blue-300 text-xs">F</span>
                                                    </div>
                                                    <span className="text-blue-300 text-xs">Frontend: React with TypeScript + Redux</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <div className="w-4 h-4 bg-blue-500/30 rounded-sm flex items-center justify-center mr-2">
                                                        <span className="text-blue-300 text-xs">B</span>
                                                    </div>
                                                    <span className="text-blue-300 text-xs">Backend: Node.js + Express + REST API</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <div className="w-4 h-4 bg-blue-500/30 rounded-sm flex items-center justify-center mr-2">
                                                        <span className="text-blue-300 text-xs">D</span>
                                                    </div>
                                                    <span className="text-blue-300 text-xs">Database: MongoDB (products) + Redis (cache)</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <div className="w-4 h-4 bg-blue-500/30 rounded-sm flex items-center justify-center mr-2">
                                                        <span className="text-blue-300 text-xs">A</span>
                                                    </div>
                                                    <span className="text-blue-300 text-xs">Auth: JWT + OAuth2 (Google/Facebook)</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-4 h-4 bg-blue-500/30 rounded-sm flex items-center justify-center mr-2">
                                                        <span className="text-blue-300 text-xs">D</span>
                                                    </div>
                                                    <span className="text-blue-300 text-xs">Deployment: Docker + Kubernetes</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Project Generation */}
                                        <div className="mt-4">
                                            <p><span className="text-blue-400">structmind $</span> generate-project --from-architecture</p>
                                            <p className="text-gray-400">Creating project scaffold...</p>

                                            <div className={`transition-all duration-500 ${showProject ? 'opacity-100' : 'opacity-0'}`}>
                                                <div className="py-2">
                                                    <p className="text-green-400">✓ Project scaffold created!</p>
                                                    <div className="bg-gray-900/50 rounded-lg p-3 mt-2 border border-gray-700 font-mono text-xs">
                                                        <p className="text-gray-400">├── frontend/</p>
                                                        <p className="text-gray-400">│   ├── src/</p>
                                                        <p className="text-gray-400">│   │   ├── components/</p>
                                                        <p className="text-gray-400">│   │   ├── pages/</p>
                                                        <p className="text-gray-400">│   │   ├── store/</p>
                                                        <p className="text-gray-400">│   │   └── services/</p>
                                                        <p className="text-gray-400">├── backend/</p>
                                                        <p className="text-gray-400">│   ├── controllers/</p>
                                                        <p className="text-gray-400">│   ├── models/</p>
                                                        <p className="text-gray-400">│   ├── routes/</p>
                                                        <p className="text-gray-400">│   └── middleware/</p>
                                                        <p className="text-gray-400">└── k8s/</p>
                                                    </div>
                                                    <div className="mt-3 flex justify-end">
                                                        <button className="text-blue-400 hover:text-blue-300 text-xs flex items-center">
                                                            Download project
                                                            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className={`${showArchitecture ? 'hidden' : 'block'}`}>
                                        <span className="text-blue-400">structmind $</span> <span className="animate-pulse">|</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div ref={featuresRef} id="features" className="py-20 scroll-mt-24 section-wrapper">
                        <div className="text-center mb-16">
                            <div className="relative inline-block animate-magicAppear magnetic-element cursor-hover">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 blur-xl rounded-full"></div>
                                <h2 className="text-4xl font-bold text-white mb-4 relative parallax-text"
                                    style={{
                                        transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.005}deg) rotateX(${(mousePosition.y - window.innerHeight / 2) * -0.005}deg)`
                                    }}>
                                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-gradient">
                                        Powerful Features
                                    </span>
                                </h2>
                            </div>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-4 animate-slideInUp magnetic-element cursor-hover">
                                Streamline your development workflow with our intelligent architecture tools
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {/* Feature 1 - Architecture Creation */}
                            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 marvel-card storybook-transition magnetic-element cursor-hover">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg blue-glow magnetic-element cursor-hover">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors cursor-hover">Prompt to Architecture</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors cursor-hover">
                                    Simply describe your project vision and let our AI generate comprehensive
                                    architecture blueprints instantly. Support for modern frameworks and best practices.
                                </p>

                                {/* Example Prompt Chat Bubble */}
                                <div className="mt-4 chat-bubble opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-hover">
                                    <p className="text-blue-300 text-sm mb-1">Example Prompt:</p>
                                    <p className="text-white text-sm font-mono">"I need a scalable e-commerce platform with user authentication, product catalog, and payment processing."</p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700/50">
                                    <span className="text-blue-400 group-hover:text-white inline-flex items-center transition-colors">
                                        Try it now
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>                        {/* Feature 2 - Project Creation */}
                            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 marvel-card storybook-transition">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg blue-glow">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">Smart Project Creation</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    Generate complete project structures with code scaffolding,
                                    configuration files, and best practices automatically. Instant productivity.
                                </p>

                                {/* Code block demo */}
                                <div className="mt-4 code-block opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden max-h-0 group-hover:max-h-[200px] transition-all">
                                    <pre className="text-sm text-gray-300 p-2 rounded bg-gray-800/80">
                                        <code>
                                            {`import React from 'react';
import { useAuth } from './hooks/useAuth';
// Generated component
const ProductList = () => {
  const { user } = useAuth();
  return (
    <div>Products List</div>
  );
};`}
                                        </code>
                                    </pre>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700/50">
                                    <span className="text-blue-400 group-hover:text-white inline-flex items-center transition-colors">
                                        Generate projects
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Feature 3 - Future Updates */}
                            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 marvel-card storybook-transition">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg blue-glow">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">Future-Ready</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    Continuous updates with new frameworks, patterns, and architectural
                                    approaches as technology evolves. Stay ahead of the curve.
                                </p>

                                {/* Timeline visualization */}
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden max-h-0 group-hover:max-h-[120px] transition-all">
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                                            <div className="animate-shimmer shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 w-2/3"></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>Q1 2023</span>
                                            <span className="text-blue-400">Now</span>
                                            <span>Q4 2024</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-between text-xs">
                                        <span className="text-green-400 bg-green-900/30 px-2 py-1 rounded-full">React + GraphQL</span>
                                        <span className="text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full">AI Integration</span>
                                        <span className="text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full">Web Assembly</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700/50">
                                    <span className="text-blue-400 group-hover:text-white inline-flex items-center transition-colors">
                                        Roadmap
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Feature 4 - Intelligent Analysis */}
                            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 marvel-card storybook-transition">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg blue-glow">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">Intelligent Analysis</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    Get detailed insights into your architecture's performance, scalability,
                                    and security posture with our AI-powered analysis tools.
                                </p>

                                {/* Analytics visualization */}
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden max-h-0 group-hover:max-h-[120px] transition-all">
                                    <div className="flex items-end gap-1 h-20">
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[20%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[40%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[30%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[70%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[50%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[60%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[80%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[90%] rounded-t transition-all"></div>
                                        <div className="bg-blue-400/50 hover:bg-blue-400/70 w-1/12 h-[100%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[75%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[65%] rounded-t transition-all"></div>
                                        <div className="bg-blue-900/50 hover:bg-blue-700/50 w-1/12 h-[55%] rounded-t transition-all"></div>
                                    </div>
                                    <div className="mt-2 text-xs text-center text-blue-400">
                                        Performance metrics highlight optimization opportunities
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700/50">
                                    <span className="text-blue-400 group-hover:text-white inline-flex items-center transition-colors">
                                        Analyze your project
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Feature 5 - Team Collaboration */}
                            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 marvel-card storybook-transition">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg blue-glow">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">Team Collaboration</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    Share architecture designs with your team, collaborate on changes,
                                    and maintain consistent development practices across projects.
                                </p>

                                {/* Team visualization */}
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden max-h-0 group-hover:max-h-[120px] transition-all">
                                    <div className="flex justify-center space-x-2">
                                        <div className="relative w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-2 border-blue-400 animate-pulse">
                                            <span className="text-white text-xs">PM</span>
                                            <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border border-gray-800"></span>
                                        </div>
                                        <div className="relative w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center border-2 border-purple-400">
                                            <span className="text-white text-xs">UX</span>
                                            <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border border-gray-800"></span>
                                        </div>
                                        <div className="relative w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-indigo-400">
                                            <span className="text-white text-xs">BE</span>
                                            <span className="absolute -top-1 -right-1 bg-yellow-500 w-3 h-3 rounded-full border border-gray-800"></span>
                                        </div>
                                        <div className="relative w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center border-2 border-cyan-400">
                                            <span className="text-white text-xs">FE</span>
                                            <span className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border border-gray-800"></span>
                                        </div>
                                        <div className="relative w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-400">
                                            <span className="text-white text-xs">QA</span>
                                            <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border border-gray-800"></span>
                                        </div>
                                    </div>
                                    <div className="text-center text-xs text-blue-400 mt-4">
                                        <span className="bg-blue-900/30 px-2 py-1 rounded-full">Real-time collaboration</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700/50">
                                    <span className="text-blue-400 group-hover:text-white inline-flex items-center transition-colors">
                                        Collaborate
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Feature 6 - Export & Integration */}
                            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 marvel-card storybook-transition">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg blue-glow">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">Export & Integration</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    Export your architecture to various formats and integrate with popular
                                    development tools and CI/CD pipelines for seamless workflows.
                                </p>

                                {/* Export formats */}
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden max-h-0 group-hover:max-h-[120px] transition-all">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-center transition-colors">
                                            <div className="text-blue-400 text-xs mb-1">.json</div>
                                            <div className="text-[10px] text-gray-400">Config</div>
                                        </div>
                                        <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-center transition-colors">
                                            <div className="text-blue-400 text-xs mb-1">.yaml</div>
                                            <div className="text-[10px] text-gray-400">K8s</div>
                                        </div>
                                        <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-center transition-colors">
                                            <div className="text-blue-400 text-xs mb-1">.tf</div>
                                            <div className="text-[10px] text-gray-400">Terraform</div>
                                        </div>
                                        <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-center transition-colors">
                                            <div className="text-blue-400 text-xs mb-1">.svg</div>
                                            <div className="text-[10px] text-gray-400">Diagram</div>
                                        </div>
                                        <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-center transition-colors">
                                            <div className="text-blue-400 text-xs mb-1">.md</div>
                                            <div className="text-[10px] text-gray-400">Docs</div>
                                        </div>
                                        <div className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-center transition-colors">
                                            <div className="text-blue-400 text-xs mb-1">.zip</div>
                                            <div className="text-[10px] text-gray-400">Project</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700/50">
                                    <span className="text-blue-400 group-hover:text-white inline-flex items-center transition-colors">
                                        Export options
                                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div ref={aboutRef} id="about" className="py-20 scroll-mt-24 section-wrapper">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <div className="relative bg-gray-800/30 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
                                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-transparent blur-lg opacity-70"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center mb-4">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                            <span className="text-sm text-gray-400">StructMind Architecture Visualization</span>
                                        </div>
                                        <div className="space-y-3 font-mono text-sm">
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-blue-500/30 rounded flex items-center justify-center mr-3">
                                                    <span className="text-blue-300 text-xs">F</span>
                                                </div>
                                                <span className="text-blue-300">Frontend</span>
                                                <div className="flex-1 border-b border-dashed border-blue-500/30 mx-3"></div>
                                                <span className="text-gray-400">React + TypeScript</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-blue-500/30 rounded flex items-center justify-center mr-3">
                                                    <span className="text-blue-300 text-xs">B</span>
                                                </div>
                                                <span className="text-blue-300">Backend</span>
                                                <div className="flex-1 border-b border-dashed border-blue-500/30 mx-3"></div>
                                                <span className="text-gray-400">Python + FastAPI</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-blue-500/30 rounded flex items-center justify-center mr-3">
                                                    <span className="text-blue-300 text-xs">D</span>
                                                </div>
                                                <span className="text-blue-300">Database</span>
                                                <div className="flex-1 border-b border-dashed border-blue-500/30 mx-3"></div>
                                                <span className="text-gray-400">PostgreSQL</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-blue-500/30 rounded flex items-center justify-center mr-3">
                                                    <span className="text-blue-300 text-xs">A</span>
                                                </div>
                                                <span className="text-blue-300">Auth</span>
                                                <div className="flex-1 border-b border-dashed border-blue-500/30 mx-3"></div>
                                                <span className="text-gray-400">JWT + OAuth</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-6 h-6 bg-blue-500/30 rounded flex items-center justify-center mr-3">
                                                    <span className="text-blue-300 text-xs">D</span>
                                                </div>
                                                <span className="text-blue-300">Deployment</span>
                                                <div className="flex-1 border-b border-dashed border-blue-500/30 mx-3"></div>
                                                <span className="text-gray-400">Docker + K8s</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <h2 className="text-4xl font-bold text-white mb-6">
                                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                        About StructMind
                                    </span>
                                </h2>
                                <p className="text-xl text-gray-300 mb-6">
                                    StructMind is revolutionizing how developers design and build software architectures
                                    with the power of AI and automation.
                                </p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-1 mr-3">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400">Build complex architectures in minutes, not days</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-1 mr-3">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400">Enforce best practices and consistent design patterns</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-1 mr-3">
                                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400">Scale from small projects to enterprise solutions</p>
                                    </div>
                                </div>
                                <button className="inline-flex items-center text-blue-400 hover:text-white transition-colors group">
                                    Learn more about our mission
                                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action Section */}
                    <div ref={ctaRef} id="cta" className="py-20 scroll-mt-24 section-wrapper">
                        <div className="relative bg-gradient-to-br from-blue-900/30 via-black/50 to-blue-800/30 rounded-2xl p-10 md:p-16 text-center border border-blue-500/20 overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Ready to Build Something <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Amazing?</span>
                                </h2>
                                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                                    Join thousands of developers who are revolutionizing their workflow with StructMind.
                                    Start creating powerful architectures with AI today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <button className="relative group overflow-hidden bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all">
                                        <span className="relative z-10">Start Creating Now</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                    </button>
                                    <button className="relative group overflow-hidden border-2 border-blue-500 text-blue-400 px-10 py-4 rounded-lg text-lg font-semibold transition-all">
                                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Documentation</span>
                                        <span className="absolute inset-0 bg-blue-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-black/70 backdrop-blur-md mt-16 py-12">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                            <div>
                                <div className="flex items-center space-x-2 mb-6">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">S</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">StructMind</h3>
                                </div>
                                <p className="text-gray-400 mb-6">
                                    Revolutionizing architecture design with AI-powered tools for developers.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Features</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Pricing</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Documentation</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Releases</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Careers</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
                                <ul className="space-y-4">
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Community</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Help Center</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Partners</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Status</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
                            <p className="text-gray-400 mb-4 md:mb-0">
                                © 2025 StructMind. All rights reserved.
                            </p>
                            <div className="flex justify-center space-x-6">
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
