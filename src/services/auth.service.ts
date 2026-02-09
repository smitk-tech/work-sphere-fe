import { api } from './api.service';
import { API } from '../config/api';

/**
 * Auth Service
 * Handles authentication-related API calls
 */

export interface SignupPayload {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    number?: string;
    address?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    role?: string;
}

export interface SignupResponse {
    message: string;
    data: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        role?: string;
    };
}

export const authService = {
    /**
     * Register a new user
     */
    signup: async (payload: SignupPayload): Promise<SignupResponse> => {
        const response = await api.post<SignupResponse>(API.ENDPOINTS.AUTH.SIGNUP, payload);
        return response.data;
    },

    /**
     * Login user
     */
    login: async (email: string, password: string) => {
        return await api.post(API.ENDPOINTS.AUTH.LOGIN, { email, password });
    },

    /**
     * Logout user
     */
    logout: async () => {
        return await api.post(API.ENDPOINTS.AUTH.LOGOUT);
    },

    /**
     * Forgot password
     */
    forgotPassword: async (email: string) => {
        return await api.post(API.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    },

    /**
     * Reset password
     */
    resetPassword: async (token: string, newPassword: string) => {
        return await api.post(API.ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
    },
};
