import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ChatContextType, ChatSession, ChatMessage } from '../types';
import { apiClient } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    // Load sessions when user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadSessions();
        } else {
            setSessions([]);
            setCurrentSession(null);
        }
    }, [isAuthenticated]);

    const loadSessions = async () => {
        try {
            setIsLoading(true);
            const sessionsData = await apiClient.getChatSessions();
            setSessions(sessionsData);
        } catch (error: any) {
            console.error('Failed to load chat sessions:', error);
            toast.error('Failed to load chat history');
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (message: string, sessionId?: string) => {
        try {
            setIsLoading(true);

            // Optimistically add user message to current session
            if (currentSession) {
                const userMessage: ChatMessage = {
                    role: 'user',
                    content: message,
                    timestamp: new Date().toISOString(),
                };

                setCurrentSession(prev => prev ? {
                    ...prev,
                    messages: [...prev.messages, userMessage]
                } : null);
            }

            const response = await apiClient.sendMessage({
                message,
                session_id: sessionId,
            });

            // If no session was provided and this is a new chat, load the full session
            if (!sessionId) {
                const newSession = await apiClient.getChatSession(response.session_id);
                setCurrentSession(newSession);
                // Add to sessions list
                setSessions(prev => [newSession, ...prev.filter(s => s.id !== newSession.id)]);
            } else if (currentSession) {
                // Add assistant message to current session
                const assistantMessage: ChatMessage = {
                    role: 'assistant',
                    content: response.response,
                    timestamp: new Date().toISOString(),
                };

                setCurrentSession(prev => prev ? {
                    ...prev,
                    messages: [...prev.messages, assistantMessage],
                    updated_at: new Date().toISOString(),
                } : null);

                // Update session in sessions list
                setSessions(prev => prev.map(session =>
                    session.id === currentSession.id
                        ? { ...session, updated_at: new Date().toISOString() }
                        : session
                ));
            }
        } catch (error: any) {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message');

            // Remove optimistic user message on error
            if (currentSession) {
                setCurrentSession(prev => prev ? {
                    ...prev,
                    messages: prev.messages.slice(0, -1)
                } : null);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const createNewSession = () => {
        setCurrentSession(null);
    };

    const selectSession = async (sessionId: string) => {
        try {
            setIsLoading(true);
            const session = await apiClient.getChatSession(sessionId);
            setCurrentSession(session);
        } catch (error: any) {
            console.error('Failed to load session:', error);
            toast.error('Failed to load chat session');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteSession = async (sessionId: string) => {
        try {
            await apiClient.deleteChatSession(sessionId);
            setSessions(prev => prev.filter(session => session.id !== sessionId));

            if (currentSession?.id === sessionId) {
                setCurrentSession(null);
            }

            toast.success('Chat session deleted');
        } catch (error: any) {
            console.error('Failed to delete session:', error);
            toast.error('Failed to delete chat session');
        }
    };

    const value: ChatContextType = {
        sessions,
        currentSession,
        isLoading,
        sendMessage,
        createNewSession,
        selectSession,
        deleteSession,
        loadSessions,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
