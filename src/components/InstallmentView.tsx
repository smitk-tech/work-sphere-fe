import React, { useState } from 'react';
import { CheckCircle2, Loader2, Download, RotateCcw } from 'lucide-react';
import { stripeService } from '../services/stripe.service';
import StripeCheckout from './StripeCheckout';
import Cookies from 'js-cookie';
import type { PaymentHistoryItem } from '../types/payment';
import { PAYMENT_TEXT } from '../const/payment';

const InstallmentView: React.FC = () => {
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [refundingId, setRefundingId] = useState<string | null>(null);

    React.useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setHistoryLoading(true);
            const email = Cookies.get('user_email');
            if (email) {
                const data = await stripeService.getPaymentHistory(email);
                // Filter for subscription payments
                setHistory(data.filter(item => item.type === 'subscription'));
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleRefund = async (subscriptionId: string) => {
        if (!subscriptionId) {
            alert('Refund not available for this transaction (Reference missing)');
            return;
        }
        console.log("from handle refund", subscriptionId);
        if (!window.confirm('Are you sure you want to refund this installment payment?')) return;

        try {
            setRefundingId(subscriptionId);
            await stripeService.refundPayment(subscriptionId);
            alert('Refund initiated successfully!');
            fetchHistory();
        } catch (error) {
            console.error('Refund failed:', error);
            alert('Failed to initiate refund. Please try again.');
        } finally {
            setRefundingId(null);
        }
    };

    const handlePayNow = async () => {
        try {
            setLoading(true);
            const email = Cookies.get('user_email');
            if (!email) {
                console.error('No user email found');
                return;
            }

            const { clientSecret: secret } = await stripeService.createSubscription(5, email);
            setClientSecret(secret);
            setShowCheckout(true);
            // Re-fetch history after successful subscription creation (though it might be incomplete)
            fetchHistory();
        } catch (error) {
            console.error('Subscription failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {showCheckout && clientSecret && (
                <StripeCheckout
                    clientSecret={clientSecret}
                    onCancel={() => setShowCheckout(false)}
                />
            )}
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
                        onClick={handlePayNow}
                        disabled={!agreed || loading}
                        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${agreed ? (loading ? 'bg-blue-400 cursor-wait' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-200 hover:scale-[1.02] active:scale-100') : 'bg-gray-100 text-gray-400 cursor-not-allowed grayscale'
                            }`}
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Pay now'}
                    </button>
                </div>
            </div>

            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Membership Installments</h1>
                <p className="text-gray-500 font-medium">Track and manage your premium subscription payments.</p>
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
                                <th className="px-8 py-4 text-right text-[0.65rem] font-bold text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {historyLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Loader2 className="animate-spin text-blue-600" size={32} />
                                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{PAYMENT_TEXT.HISTORY.LOADING}</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : history.length > 0 ? (
                                history.map((item, index) => (
                                    <tr key={item.id} className="group hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center font-bold text-xs italic">#{String(history.length - index).padStart(2, '0')}</div>
                                                <span className="font-bold text-gray-900">{item.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-medium text-gray-500">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-8 py-6 font-black text-gray-900">
                                            {new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: item.currency.toUpperCase(),
                                            }).format(item.amount)}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-widest ${item.status === 'succeeded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right text-gray-400">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* {item.subscriptionId && ( */}
                                                <button
                                                    onClick={() => handleRefund(item.subscriptionId!)}
                                                    disabled={refundingId === item.subscriptionId}
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group/refund disabled:opacity-50"
                                                    title="Request Refund"
                                                >
                                                    {refundingId === item.subscriptionId ? (
                                                        <Loader2 size={16} className="animate-spin text-red-600" />
                                                    ) : (
                                                        <RotateCcw size={16} className="group-hover/refund:rotate-[-45deg] transition-transform" />
                                                    )}
                                                </button>
                                                {/* )} */}
                                                {item.downloadUrl && (
                                                    <a
                                                        href={item.downloadUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group/download"
                                                        title="Download Invoice"
                                                    >
                                                        <Download size={16} className="group-hover/download:scale-110 transition-transform" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-gray-500 font-medium">
                                        {PAYMENT_TEXT.HISTORY.NO_PAYMENTS}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstallmentView;
