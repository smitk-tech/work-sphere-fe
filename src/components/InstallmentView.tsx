import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';

const InstallmentView: React.FC = () => {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* EMI Payment Window Section */}
            <div className="max-w-xl mx-auto w-full bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <span className="w-fit px-3 py-1 bg-yellow-400 rounded-md text-[0.7rem] font-black uppercase tracking-wider text-gray-900 shadow-sm">
                        SP Membership EMI
                    </span>
                    <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        <span className="bg-yellow-400/30 px-2 py-0.5 rounded">12-Month EMI Plan</span>
                        <span className="text-gray-400 font-medium whitespace-nowrap">is required</span>
                    </h2>
                </div>

                {/* Inner Plan Card */}
                <div className="bg-gray-50/50 rounded-[32px] border border-gray-100 p-6 flex flex-col gap-4 relative group">
                    <div className="flex flex-col gap-1">
                        <span className="w-fit px-2 py-0.5 bg-yellow-400 rounded text-[0.6rem] font-black uppercase text-gray-900">
                            12-Month Subscription
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-blue-600 tracking-tighter">$5</span>
                            <span className="text-gray-400 font-bold text-sm">/per month</span>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-gray-500 leading-relaxed">
                        Spread your annual membership fee across 12 convenient monthly installments. This plan provides identical premium benefits while maintaining your workspace status and eligibility throughout the year.
                    </p>

                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <span className="text-gray-400 font-medium">Valid till</span>
                            <span className="bg-gray-200/50 px-2 py-0.5 rounded">Dec 31 2026</span>
                        </div>
                    </div>
                </div>

                {/* Terms and Consent */}
                <div className="flex flex-col gap-6 px-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="peer sr-only"
                            />
                            <div className="w-5 h-5 border-2 border-gray-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200"></div>
                            <CheckCircle2 size={14} className="absolute top-0.5 left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 leading-snug">
                            I have read and agree to the <span className="text-blue-600 font-bold hover:underline">Terms & Conditions</span> and <span className="text-blue-600 font-bold hover:underline">Privacy Policy</span>
                        </span>
                    </label>
                </div>

                {/* Footer Action */}
                <div className="flex flex-col gap-4 mt-4">
                    <button
                        disabled={!agreed}
                        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${agreed
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-200 hover:scale-[1.02] active:scale-100'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed grayscale'
                            }`}
                    >
                        Pay now
                    </button>
                </div>
            </div>

            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Membership Installments</h1>
                <p className="text-gray-500 font-medium">Track and manage your premium subscription payments.</p>
            </div>

            {/* Installment Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-600 p-6 rounded-[32px] text-white shadow-xl shadow-blue-200">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/20 rounded-xl">
                            <CreditCard size={20} />
                        </div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded-md">Upcoming</span>
                    </div>
                    <p className="text-sm font-medium opacity-80 uppercase tracking-wider mb-1">Next Payment</p>
                    <p className="text-2xl font-black">$249.00</p>
                    <p className="text-[0.7rem] font-bold opacity-60 mt-2 italic">Due on March 15, 2026</p>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-gray-100 rounded-xl text-gray-900">
                            <Clock size={20} />
                        </div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">Status</span>
                    </div>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Remaining</p>
                    <p className="text-2xl font-black text-gray-900">$1,245.00</p>
                    <p className="text-[0.7rem] font-bold text-gray-400 mt-2 uppercase tracking-widest">5 Installments left</p>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-green-100 rounded-xl text-green-600">
                            <CheckCircle2 size={20} />
                        </div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-green-600">Paid</span>
                    </div>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Total Paid</p>
                    <p className="text-2xl font-black text-gray-900">$747.00</p>
                    <p className="text-[0.7rem] font-bold text-green-600 mt-2 uppercase tracking-widest">On-time payment rate: 100%</p>
                </div>

                <div className="bg-gray-900 p-6 rounded-[32px] text-white shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/10 rounded-xl">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                    <p className="text-sm font-medium opacity-60 uppercase tracking-wider mb-1">Quick Action</p>
                    <h3 className="text-lg font-bold leading-tight mb-4">Pay full amount and save 15%</h3>
                    <button className="w-full py-2.5 bg-white text-gray-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">
                        Upgrade Now
                    </button>
                </div>
            </div>

            {/* Payment Schedule Table */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight italic">Payment Schedule</h3>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-100">Download PDF</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-4 text-left text-[0.65rem] font-bold text-gray-400 uppercase tracking-[0.2em]">Installment</th>
                                <th className="px-8 py-4 text-left text-[0.65rem] font-bold text-gray-400 uppercase tracking-[0.2em]">Due Date</th>
                                <th className="px-8 py-4 text-left text-[0.65rem] font-bold text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                                <th className="px-8 py-4 text-left text-[0.65rem] font-bold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="group hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center font-bold text-xs italic">#0{i}</div>
                                            <span className="font-bold text-gray-900">Premium Membership Installment</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-medium text-gray-500">Jan {i}, 2026</td>
                                    <td className="px-8 py-6 font-black text-gray-900">$249.00</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[0.65rem] font-black uppercase tracking-widest">Paid</span>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-blue-50/30">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs italic">#04</div>
                                        <span className="font-bold text-gray-900">Current Month Installment</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm font-black text-blue-600 italic">Mar 15, 2026</td>
                                <td className="px-8 py-6 font-black text-gray-900">$249.00</td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[0.65rem] font-black uppercase tracking-widest shadow-lg shadow-blue-100">Pay Now</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstallmentView;
