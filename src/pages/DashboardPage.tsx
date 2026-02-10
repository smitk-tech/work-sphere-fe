import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
    return (
        <Dashboard>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Progress</h3>
                    <p className="text-3xl font-black text-gray-900">84%</p>
                    <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Active Tasks</h3>
                    <p className="text-3xl font-black text-gray-900">12</p>
                    <p className="text-sm text-green-600 font-bold mt-2">+2 since yesterday</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Members</h3>
                    <p className="text-3xl font-black text-gray-900">248</p>
                    <p className="text-sm text-gray-500 font-medium mt-2">Active now</p>
                </div>

                {/* Main Welcome Section */}
                <div className="md:col-span-3 bg-gray-900 p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col gap-4 max-w-lg">
                        <h1 className="text-4xl font-black leading-tight italic">Welcome to your Premium Workspace!</h1>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            Manage your SP membership, track your progress, and collaborate with your team all in one place.
                        </p>
                        <button className="mt-4 px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all w-fit shadow-lg active:scale-95">
                            Get Started
                        </button>
                    </div>
                    {/* Abstract Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full"></div>
                </div>
            </div>
        </Dashboard>
    );
};

export default DashboardPage;
