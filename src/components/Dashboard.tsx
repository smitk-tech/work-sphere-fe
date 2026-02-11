import React, { useState } from 'react';
import { LayoutDashboard, LogOut, User, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import MembershipView from './MembershipView';
import InstallmentView from './InstallmentView';

interface DashboardProps {
    children?: React.ReactNode;
}

type TabType = 'membership' | 'installment' | 'cancel';

const Dashboard: React.FC<DashboardProps> = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('membership');

    const handleLogout = async () => {
        await authService.logout();
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'membership':
                return <MembershipView />;
            case 'installment':
                return <InstallmentView />;
            default:
                return <MembershipView />;
        }
    };

    const navItems = [
        { id: 'membership', label: 'SP membership', icon: LayoutDashboard },
        { id: 'installment', label: 'SP membership Installment', icon: CreditCard },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-sm relative z-20">
                {/* Logo Section */}
                <div className="p-8 border-b border-gray-50 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                            <div className="w-6 h-6 border-2 border-white rounded-lg flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <span className="text-2xl font-black text-gray-900 tracking-tight italic">WorkSphere</span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 space-y-2">
                    <p className="px-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as TabType)}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${activeTab === item.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 translate-x-1'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'} />
                            <span className={`text-[0.95rem] font-bold ${activeTab === item.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                                {item.label}
                            </span>
                            {activeTab === item.id && (
                                <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer actions */}
                <div className="p-6 border-t border-gray-50 flex flex-col gap-2">
                    <button className="flex items-center gap-4 px-5 py-3.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition-all duration-200 group">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <User size={20} className="group-hover:text-blue-600" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-bold text-gray-900">Profile Settings</span>
                            <span className="text-[0.7rem] font-medium text-gray-400">Account management</span>
                        </div>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-5 py-3.5 text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-200 group mt-2"
                    >
                        <div className="w-10 h-10 rounded-xl bg-red-100/50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <LogOut size={20} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Logout</span>
                    </button>
                </div>

                {/* Copyright */}
                <div className="p-8">
                    <p className="text-[0.6rem] font-bold text-gray-300 uppercase tracking-[0.3em]">
                        ©2026 Admin Portal v1.0
                    </p>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-auto bg-gray-50/50">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight italic">
                            {activeTab === 'membership' ? 'Membership Dashboard' : 'Membership Installment Dashboard'}
                        </h2>
                        <span className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest">Overview & Monitoring</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-gray-900">John Doe</span>
                            <span className="text-[0.7rem] font-medium text-blue-600">Premium Member</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-100">
                            <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-blue-600 font-black text-sm">
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-10 max-w-7xl mx-auto w-full">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
