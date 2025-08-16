import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    MessageSquare,
    Shield,
    Activity,
    Eye,
    EyeOff,
    Search,
    RefreshCw,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../services/api';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface DashboardStats {
    total_users: number;
    verified_users: number;
    active_users: number;
    total_chat_sessions: number;
}

interface UserData {
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
    is_verified: boolean;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}

const AdminDashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [users, setUsers] = useState<UserData[]>([]);
    const [recentUsers, setRecentUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const { user, logout } = useAuth();

    const usersPerPage = 10;

    const loadDashboardData = async () => {
        try {
            setIsLoading(true);
            const dashboardData = await apiClient.getAdminDashboard();
            setStats(dashboardData.stats);
            setRecentUsers(dashboardData.recent_users);
        } catch (error: any) {
            console.error('Failed to load dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    const loadUsers = async (page = 0) => {
        try {
            setUsersLoading(true);
            const skip = page * usersPerPage;
            const usersData = await apiClient.getAllUsers(skip, usersPerPage);
            setUsers(usersData.users);
            setTotalUsers(usersData.total);
        } catch (error: any) {
            console.error('Failed to load users:', error);
            toast.error('Failed to load users');
        } finally {
            setUsersLoading(false);
        }
    };

    const toggleUserStatus = async (userId: string) => {
        try {
            const response = await apiClient.toggleUserActive(userId);
            toast.success(response.message);
            // Reload users to reflect changes
            loadUsers(currentPage);
            loadDashboardData(); // Refresh stats
        } catch (error: any) {
            console.error('Failed to toggle user status:', error);
            toast.error('Failed to update user status');
        }
    };

    useEffect(() => {
        loadDashboardData();
        loadUsers();
    }, []);

    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Shield className="h-8 w-8 text-primary-600 mr-3" />
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Welcome back, {user?.full_name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                onClick={() => window.open('/dashboard', '_blank')}
                                variant="outline"
                                size="sm"
                            >
                                <MessageSquare size={16} className="mr-2" />
                                Open Chat
                            </Button>
                            <Button
                                onClick={logout}
                                variant="outline"
                                size="sm"
                            >
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        {
                            title: 'Total Users',
                            value: stats?.total_users || 0,
                            icon: Users,
                            color: 'text-blue-600',
                            bg: 'bg-blue-50',
                        },
                        {
                            title: 'Verified Users',
                            value: stats?.verified_users || 0,
                            icon: Shield,
                            color: 'text-green-600',
                            bg: 'bg-green-50',
                        },
                        {
                            title: 'Active Users',
                            value: stats?.active_users || 0,
                            icon: Activity,
                            color: 'text-yellow-600',
                            bg: 'bg-yellow-50',
                        },
                        {
                            title: 'Chat Sessions',
                            value: stats?.total_chat_sessions || 0,
                            icon: MessageSquare,
                            color: 'text-purple-600',
                            bg: 'bg-purple-50',
                        },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            className="card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-center">
                                <div className={`p-3 rounded-lg ${stat.bg}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stat.value.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Users */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="card">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Recent Users
                                </h3>
                                <Button
                                    onClick={loadDashboardData}
                                    size="sm"
                                    variant="outline"
                                >
                                    <RefreshCw size={16} />
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {recentUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {user.full_name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {user.email}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.is_verified
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {user.is_verified ? 'Verified' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Users Management */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="card">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    User Management
                                </h3>
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                    <Button
                                        onClick={() => loadUsers(currentPage)}
                                        size="sm"
                                        variant="outline"
                                        loading={usersLoading}
                                    >
                                        <RefreshCw size={16} />
                                    </Button>
                                </div>
                            </div>

                            {usersLoading ? (
                                <div className="flex justify-center py-8">
                                    <LoadingSpinner />
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        User
                                                    </th>
                                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Status
                                                    </th>
                                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Joined
                                                    </th>
                                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.map((user) => (
                                                    <tr
                                                        key={user.id}
                                                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                    >
                                                        <td className="py-3 px-2">
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                    {user.full_name}
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {user.email}
                                                                </p>
                                                                {user.is_admin && (
                                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 mt-1">
                                                                        Admin
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-2">
                                                            <div className="flex flex-col space-y-1">
                                                                <span
                                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.is_active
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-red-100 text-red-800'
                                                                        }`}
                                                                >
                                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                                </span>
                                                                <span
                                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.is_verified
                                                                            ? 'bg-blue-100 text-blue-800'
                                                                            : 'bg-yellow-100 text-yellow-800'
                                                                        }`}
                                                                >
                                                                    {user.is_verified ? 'Verified' : 'Pending'}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-2">
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {new Date(user.created_at).toLocaleDateString()}
                                                            </p>
                                                        </td>
                                                        <td className="py-3 px-2">
                                                            {!user.is_admin && (
                                                                <Button
                                                                    onClick={() => toggleUserStatus(user.id)}
                                                                    size="sm"
                                                                    variant={user.is_active ? 'outline' : 'primary'}
                                                                    className="flex items-center space-x-1"
                                                                >
                                                                    {user.is_active ? (
                                                                        <>
                                                                            <EyeOff size={14} />
                                                                            <span>Deactivate</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Eye size={14} />
                                                                            <span>Activate</span>
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-between mt-6">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Showing {currentPage * usersPerPage + 1} to{' '}
                                                {Math.min((currentPage + 1) * usersPerPage, totalUsers)} of{' '}
                                                {totalUsers} users
                                            </p>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                                    disabled={currentPage === 0}
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    Previous
                                                </Button>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Page {currentPage + 1} of {totalPages}
                                                </span>
                                                <Button
                                                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                                                    disabled={currentPage === totalPages - 1}
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
