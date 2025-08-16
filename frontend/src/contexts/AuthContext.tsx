import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthContextType, User } from '../types';
import { apiClient } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const userData = await apiClient.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    // Token is invalid, remove it
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await apiClient.login({ email, password });

            // Store tokens
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);

            // Get user data
            const userData = await apiClient.getCurrentUser();
            setUser(userData);

            toast.success('Login successful!');
        } catch (error: any) {
            const message = error.response?.data?.detail || 'Login failed';
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, fullName: string) => {
        try {
            setIsLoading(true);
            const response = await apiClient.signup({
                email,
                password,
                full_name: fullName,
            });

            toast.success(response.message);
        } catch (error: any) {
            const message = error.response?.data?.detail || 'Signup failed';
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        toast.success('Logged out successfully');
    };

    const refreshToken = async () => {
        // TODO: Implement refresh token logic when backend supports it
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue) {
            logout();
            return;
        }

        // For now, just logout if token is expired
        // In a real implementation, you would call a refresh endpoint
        logout();
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        refreshToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
