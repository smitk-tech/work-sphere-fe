export const PAYMENT_TEXT = {
    HISTORY: {
        TITLE: 'Membership Installments',
        SUBTITLE: 'Track and manage your premium subscription payments.',
        LOADING: 'Loading Payment History...',
        NO_PAYMENTS: 'No payments found',
        TABLE_HEADERS: {
            INSTALLMENT: 'Installment',
            DUE_DATE: 'Due Date',
            AMOUNT: 'Amount',
            STATUS: 'Status',
        },
        STATUS: {
            PAID: 'Paid',
            PENDING: 'Pending',
            FAILED: 'Failed',
        },
        ACTIONS: {
            PAY_NOW: 'Pay Now',
        }
    },
    EMI_PLAN: {
        TITLE: 'SP Membership EMI',
        SUBTITLE: '12-Month EMI Plan',
        REQUIRED: 'is required',
        PRICE: '$5',
        PERIOD: '/per month',
        DESCRIPTION: 'Spread your annual membership fee across 12 convenient monthly installments. This plan provides identical premium benefits while maintaining your workspace status and eligibility throughout the year.',
        VALID_TILL: 'Valid till',
        AGREEMENT: 'I have read and agree to the',
        TERMS: 'Terms & Conditions',
        PRIVACY: 'Privacy Policy',
    }
} as const;
