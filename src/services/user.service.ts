import { api } from './api.service';

export interface User {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    role: string | null;
    publicKey: string | null;
}

export const userService = {
    getAllUsers: async () => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },
    updatePublicKey: async (email: string, publicKey: string) => {
        const response = await api.post('/users/key', { email, publicKey });
        return response.data;
    }
};
