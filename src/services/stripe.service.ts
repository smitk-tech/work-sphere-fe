import { api } from './api.service';

/**
 * Stripe Service Class
 * Handles all Stripe-related frontend functionality
 */
class StripeService {

    /**
     * Creates a payment intent and returns the client secret
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
}

// Export singleton instance
export const stripeService = new StripeService();
