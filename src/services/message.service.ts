import { api } from './api.service';
import Cookies from 'js-cookie';

export interface SendMessageDto {
    receiverId: string;
    ciphertext: string;
    senderEmail?: string;
}

export const messageService = {
    sendMessage: async (data: Omit<SendMessageDto, 'senderEmail'>) => {
        const senderEmail = Cookies.get('user_email');
        if (!senderEmail) throw new Error('Authentication error: No user email cookie found');
        
        const response = await api.post('/messages/send', { ...data, senderEmail });
        return response.data;
    }
};
