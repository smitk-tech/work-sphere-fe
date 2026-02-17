import { api } from './api.service';
import type { PaymentHistoryItem } from '../types/payment';

/**
 * Stripe Service Class
 * Handles all Stripe-related frontend functionality
 */
class StripeService {

    /**
     * Fetches payment history for the current user or specific customer ID
     */
    async getPaymentHistory(email?: string): Promise<PaymentHistoryItem[]> {
        console.log("email from get payment history", email);
        try {
            const url = email
                ? `/payment/history?email=${email}`
                : '/payment/history';

            const response = await api.get<PaymentHistoryItem[]>(url);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch payment history:', error);
            throw error;
        }
    }

    /**
     * Creates a payment intent and returns the client secret
     * @deprecated Use initiatePayment instead for authenticated payments
     */
    async createSubscription(amount: number, userEmail: string) {
        try {
            const response = await api.post<{ subscriptionId: string; clientSecret: string }>('/payment/create-subscription', {
                amount,
                userEmail
            });
            return response.data;
        } catch (error) {
            console.error('Failed to create subscription:', error);
            throw error;
        }
    }

    /**
     * Creates a payment intent and returns the client secret
     * @deprecated Use initiatePayment instead for authenticated payments
     */
    async createPaymentIntent() {
        try {
            const response = await api.post<{ clientSecret: string }>('/stripe/create-payment-intent', { amount: 1200 }); // Default amount for now
            return response.data.clientSecret;
        } catch (error) {
            console.error('Failed to create payment intent:', error);
            throw error;
        }
    }

    /**
     * Confirms the payment on the backend after Stripe process
     */
    async confirmPayment(paymentIntentId: string, paymentMethodId: string) {
        try {
            const response = await api.post<{ status: string; id: string }>('/stripe/confirm-payment', {
                paymentIntentId,
                paymentMethodId
            });
            return response.data;
        } catch (error) {
            console.error('Failed to confirm payment:', error);
            throw error;
        }
    }

    /**
     * Refunds a payment
     */
    async refundPayment(paymentIntentId: string) {
        try {
            const response = await api.post<{ status: string }>('/payment/refund', {
                paymentIntentId
            });
            return response.data;
        } catch (error) {
            console.error('Failed to refund payment:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const stripeService = new StripeService();
