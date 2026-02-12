import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Loader2, ShieldCheck, X } from 'lucide-react';
import { stripeService } from '../services/stripe.service';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm: React.FC<{ clientSecret: string; onCancel: () => void }> = ({ clientSecret, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        // 1. Create Payment Method from Elements
        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
            elements,
        });

        if (pmError) {
            setMessage(pmError.message ?? "Failed to create payment method.");
            setIsLoading(false);
            return;
        }

        // 2. Call backend to confirm the payment intent with this payment method
        try {
            // We need the paymentIntentId, which is part of the clientSecret (pi_XXX_secret_YYY)
            const paymentIntentId = clientSecret.split('_secret')[0];
            const result = await stripeService.confirmPayment(paymentIntentId, paymentMethod.id);

            if (result.status === 'succeeded' || result.status === 'requires_capture') {
                window.location.href = `${window.location.origin}/dashboard?payment=success`;
            } else if (result.status === 'requires_action' || result.status === 'requires_confirmation') {
                // If 3D secure is required, handle it with stripe.handleNextAction
                // This might be complex, but for now let's assume simple flow or basic error
                setMessage("Additional action required. Redirecting...");
                // In a real app, you'd use stripe.handleNextAction(result.clientSecret)
            } else {
                setMessage(`Payment status: ${result.status}`);
            }
        } catch (err) {
            console.error('Payment confirmation error:', err);
            const errorMessage = err instanceof Error ? err.message : "Payment confirmation failed on backend. Please try again.";
            setMessage(errorMessage);
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />

            {message && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                    <span>{message}</span>
                </div>
            )}

            <div className="flex flex-col gap-3 mt-2">
                <button
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            <span>Pay ₹1,200.00 Now</span>
                            <ShieldCheck size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="w-full py-3 text-gray-400 hover:text-gray-600 font-bold text-xs uppercase tracking-widest transition-colors"
                >
                    Cancel Payment
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 opacity-40">
                <ShieldCheck size={14} />
                <span className="text-[0.6rem] font-bold uppercase tracking-tighter">Securely processed by Stripe</span>
            </div>
        </form>
    );
};

interface StripeCheckoutProps {
    clientSecret: string;
    onCancel: () => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ clientSecret, onCancel }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/10 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-500">
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-blue-600">Checkout</span>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight italic">Premium Membership</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-0">
                    <div className="mb-8 p-4 bg-gray-50 rounded-2xl flex justify-between items-center border border-gray-100">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Amount Due</span>
                        <span className="text-xl font-black text-gray-900">₹1,200.00</span>
                    </div>

                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                            appearance: {
                                theme: 'stripe',
                                variables: {
                                    colorPrimary: '#2563eb',
                                    borderRadius: '16px',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                },
                            },
                        }}
                    >
                        <CheckoutForm clientSecret={clientSecret} onCancel={onCancel} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default StripeCheckout;
