export interface PaymentHistoryItem {
    id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
    description: string;
}

export interface PaymentIntentResponse {
    clientSecret: string;
    paymentId: string;
    transactionId: string;
}
