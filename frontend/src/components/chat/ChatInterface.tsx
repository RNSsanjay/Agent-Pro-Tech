import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Plus, MessageCircle, Trash2, User, Bot } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const ChatInterface: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const {
        sessions,
        currentSession,
        isLoading,
        sendMessage,
        createNewSession,
        selectSession,
        deleteSession
    } = useChat();

    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentSession?.messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim() || isSending) return;

        const messageToSend = message.trim();
        setMessage('');
        setIsSending(true);

        try {
            await sendMessage(messageToSend, currentSession?.id);
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <Button
                        onClick={createNewSession}
                        className="w-full flex items-center justify-center space-x-2"
                    >
                        <Plus size={20} />
                        <span>New Chat</span>
                    </Button>
                </div>

                {/* Sessions List */}
                <div className="flex-1 overflow-y-auto">
                    {sessions.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No chat sessions yet</p>
                            <p className="text-sm">Start a new conversation!</p>
                        </div>
                    ) : (
                        <div className="p-2 space-y-2">
                            {sessions.map((session) => (
                                <motion.div
                                    key={session.id}
                                    className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${currentSession?.id === session.id
                                            ? 'bg-primary-50 border border-primary-200 dark:bg-primary-900/20'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    onClick={() => selectSession(session.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {session.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {new Date(session.updated_at).toLocaleDateString()}
                                            </p>
                                            {session.messages.length > 0 && (
                                                <p className="text-xs text-gray-400 truncate mt-1">
                                                    {session.messages[session.messages.length - 1]?.content}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteSession(session.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {currentSession?.title || 'StructMind AI Assistant'}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Powered by Google Gemini 1.5 Flash
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <User size={16} />
                            <span>{user?.full_name}</span>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {!currentSession && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <motion.div
                                    className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                >
                                    <Bot className="h-10 w-10 text-white" />
                                </motion.div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Welcome to StructMind
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                                    Your intelligent AI assistant is ready to help. Start a conversation below!
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                                    {[
                                        "What can you help me with?",
                                        "Explain quantum computing",
                                        "Write a creative story",
                                        "Help me with coding"
                                    ].map((suggestion, index) => (
                                        <motion.button
                                            key={suggestion}
                                            className="p-3 text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 transition-colors text-sm"
                                            onClick={() => setMessage(suggestion)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {suggestion}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentSession?.messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={`flex items-start space-x-3 max-w-4xl ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user'
                                        ? 'bg-primary-500'
                                        : 'bg-gradient-to-r from-secondary-400 to-secondary-600'
                                    }`}>
                                    {msg.role === 'user' ? (
                                        <User size={16} className="text-white" />
                                    ) : (
                                        <Bot size={16} className="text-white" />
                                    )}
                                </div>
                                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`px-4 py-2 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-primary-500 text-white rounded-br-md'
                                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-md'
                                        }`}>
                                        <div className="whitespace-pre-wrap text-sm">
                                            {msg.content}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {formatTimestamp(msg.timestamp)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {(isLoading || isSending) && (
                        <motion.div
                            className="flex justify-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="flex items-start space-x-3 max-w-4xl">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-secondary-400 to-secondary-600 flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                    <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                        <div className="flex-1">
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                rows={1}
                                style={{
                                    minHeight: '48px',
                                    maxHeight: '120px',
                                    height: 'auto',
                                }}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = target.scrollHeight + 'px';
                                }}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!message.trim() || isSending}
                            className="p-3 rounded-2xl"
                        >
                            <Send size={20} />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
