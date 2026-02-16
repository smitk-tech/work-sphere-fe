export interface PaymentHistoryItem {
    id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
    description: string;
    type: 'one_time' | 'subscription';
    downloadUrl?: string;
}

export interface PaymentIntentResponse {
    clientSecret: string;
    paymentId: string;
    transactionId: string;
}
