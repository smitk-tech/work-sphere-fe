import React from 'react';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

interface DashboardProps {
    children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authService.logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-100 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                            <div className="w-5 h-5 border-2 border-white rounded-md flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">WorkSphere</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl shadow-md transition-all duration-200">
                        <LayoutDashboard size={20} />
                        <span className="font-semibold text-[0.95rem]">SP membership</span>
                    </button>
                </nav>

                {/* Footer actions */}
                <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
                    <button className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 group">
                        <User size={18} className="group-hover:text-gray-900" />
                        <span className="text-sm font-medium group-hover:text-gray-900">Profile</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>

                {/* Copyright */}
                <div className="p-6">
                    <p className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest">
                        @2026 Copyrights.
                    </p>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-auto bg-gray-50/50">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm/10">
                    <h2 className="text-lg font-bold text-gray-800">SP Membership Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                            JD
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
