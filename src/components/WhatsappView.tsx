import React, { useState, useEffect } from 'react';
import { userService } from '../services/user.service';
import type { User } from '../services/user.service';
import { messageService } from '../services/message.service';
import { Search, Send, User as UserIcon } from 'lucide-react';

const WhatsappView: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAllUsers();
                setUsers(data);
            } catch (err) {
                setError('Failed to load users');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser || !message.trim()) return;

        setIsSending(true);
        try {
            await messageService.sendMessage({
                receiverId: selectedUser.id,
                ciphertext: message.trim()
            });
            setMessage('');
            alert('Message sent anonymously!');
        } catch (err) {
            console.error('Failed to send message:', err);
            alert('Failed to send message');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-160px)] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Sidebar User List */}
            <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Anonymous Chat</h2>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-4 font-medium text-sm">{error}</div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="text-center text-gray-400 p-4 font-medium text-sm">No users found</div>
                    ) : (
                        filteredUsers.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${selectedUser?.id === user.id
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200 translate-x-1'
                                        : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-100'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${selectedUser?.id === user.id ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {user.firstName?.[0] || user.email[0].toUpperCase()}
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <h3 className={`font-bold truncate ${selectedUser?.id === user.id ? 'text-white' : 'text-gray-900'}`}>
                                        {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email}
                                    </h3>
                                    <p className={`text-xs truncate font-medium ${selectedUser?.id === user.id ? 'text-blue-100' : 'text-gray-400'}`}>
                                        {user.email}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedUser ? (
                    <>
                        <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-white/80 backdrop-blur-md">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-100">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-blue-600 font-black text-lg">
                                    {selectedUser.firstName?.[0] || selectedUser.email[0].toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 text-lg">
                                    {selectedUser.firstName ? `${selectedUser.firstName} ${selectedUser.lastName || ''}` : selectedUser.email}
                                </h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Sending memory anonymously
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 p-6 bg-gray-50/30 overflow-y-auto flex flex-col justify-end">
                            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-center max-w-md mx-auto mb-8">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserIcon size={32} />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Anonymous Messaging</h4>
                                <p className="text-sm text-gray-500 font-medium">
                                    Your message will be sent anonymously to {selectedUser.firstName || selectedUser.email}. They won't know it's from you.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-white">
                            <form onSubmit={handleSendMessage} className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Type your anonymous message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                                />
                                <button
                                    type="submit"
                                    disabled={!message.trim() || isSending}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-colors shadow-lg shadow-blue-200 flex items-center gap-3"
                                >
                                    <span>{isSending ? 'Sending...' : 'Send'}</span>
                                    <Send size={20} className={isSending ? 'animate-pulse' : ''} />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/50">
                        <div className="w-24 h-24 bg-white shadow-xl shadow-gray-200/50 rounded-full flex items-center justify-center mb-6 text-blue-600">
                            <Send size={48} className="translate-x-1" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Select a User</h3>
                        <p className="text-gray-500 font-medium max-w-sm">
                            Choose a person from the sidebar to send an anonymous message safely and securely.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhatsappView;