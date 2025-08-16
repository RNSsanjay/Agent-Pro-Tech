import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { AuthResponse, LoginRequest, SignupRequest, User, ChatRequest, ChatResponse, ChatSession } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor to add auth token
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor to handle token refresh
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = localStorage.getItem('refresh_token');
                        if (refreshToken) {
                            // TODO: Implement token refresh endpoint
                            // For now, just logout
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            window.location.href = '/login';
                        }
                    } catch (refreshError) {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        window.location.href = '/login';
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    // Auth endpoints
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response: AxiosResponse<AuthResponse> = await this.client.post('/auth/login', data);
        return response.data;
    }

    async signup(data: SignupRequest): Promise<{ message: string; success: boolean }> {
        const response = await this.client.post('/auth/signup', data);
        return response.data;
    }

    async verifyEmail(token: string): Promise<{ message: string; success: boolean }> {
        const response = await this.client.post('/auth/verify-email', { token });
        return response.data;
    }

    async forgotPassword(email: string): Promise<{ message: string; success: boolean }> {
        const response = await this.client.post('/auth/forgot-password', { email });
        return response.data;
    }

    async resetPassword(token: string, new_password: string): Promise<{ message: string; success: boolean }> {
        const response = await this.client.post('/auth/reset-password', { token, new_password });
        return response.data;
    }

    async getCurrentUser(): Promise<User> {
        const response: AxiosResponse<User> = await this.client.get('/auth/me');
        return response.data;
    }

    // Chat endpoints
    async sendMessage(data: ChatRequest): Promise<ChatResponse> {
        const response: AxiosResponse<ChatResponse> = await this.client.post('/chat/', data);
        return response.data;
    }

    async getChatSessions(): Promise<ChatSession[]> {
        const response: AxiosResponse<ChatSession[]> = await this.client.get('/chat/sessions');
        return response.data;
    }

    async getChatSession(sessionId: string): Promise<ChatSession> {
        const response: AxiosResponse<ChatSession> = await this.client.get(`/chat/sessions/${sessionId}`);
        return response.data;
    }

    async deleteChatSession(sessionId: string): Promise<{ message: string }> {
        const response = await this.client.delete(`/chat/sessions/${sessionId}`);
        return response.data;
    }

    // Admin endpoints
    async getAdminDashboard(): Promise<any> {
        const response = await this.client.get('/admin/dashboard');
        return response.data;
    }

    async getAllUsers(skip = 0, limit = 50): Promise<any> {
        const response = await this.client.get(`/admin/users?skip=${skip}&limit=${limit}`);
        return response.data;
    }

    async toggleUserActive(userId: string): Promise<{ message: string }> {
        const response = await this.client.put(`/admin/users/${userId}/toggle-active`);
        return response.data;
    }
}

export const apiClient = new ApiClient();
