// API Types
export interface User {
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
    is_verified: boolean;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    full_name: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface ChatSession {
    id: string;
    title: string;
    messages: ChatMessage[];
    created_at: string;
    updated_at: string;
}

export interface ChatRequest {
    message: string;
    session_id?: string;
}

export interface ChatResponse {
    response: string;
    session_id: string;
}

export interface ApiResponse<T = any> {
    message: string;
    success: boolean;
    data?: T;
}

// Component Props
export interface FormInputProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
}

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export interface NavItem {
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

// Auth Context
export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, fullName: string) => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<void>;
}

// Chat Context
export interface ChatContextType {
    sessions: ChatSession[];
    currentSession: ChatSession | null;
    isLoading: boolean;
    sendMessage: (message: string, sessionId?: string) => Promise<void>;
    createNewSession: () => void;
    selectSession: (sessionId: string) => void;
    deleteSession: (sessionId: string) => Promise<void>;
    loadSessions: () => Promise<void>;
}
