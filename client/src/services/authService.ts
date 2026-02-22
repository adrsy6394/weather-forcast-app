import api from './api';
import type { User } from '../types';

interface AuthResponse {
    token: string;
    user: User;
}

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

const authService = {
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post<any>('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            // The backend returns a flat object with user details AND token
            // We need to extract user details excluding token if we want strict separation, 
            // or just store the whole thing. 
            // But our User type likely doesn't have 'token'.
            // Let's construct the user object.
            const user = {
                _id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role
            };
            localStorage.setItem('user', JSON.stringify(user));
            return {
                token: response.data.token,
                user: user
            };
        }
        return response.data;
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<any>('/auth/register', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
             const user = {
                _id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role
            };
            localStorage.setItem('user', JSON.stringify(user));
             return {
                token: response.data.token,
                user: user
            };
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (!userStr || userStr === 'undefined') return null;
        try {
            return JSON.parse(userStr) as User;
        } catch (error) {
            console.error('Failed to parse user from localStorage', error);
            localStorage.removeItem('user');
            return null;
        }
    },

    updateProfile: async (data: Partial<User> & { password?: string }): Promise<User> => {
        const response = await api.put<any>('/auth/me', data);
        const user = {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
            bio: response.data.bio,
            location: response.data.location
        };
        localStorage.setItem('user', JSON.stringify(user));
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return user;
    },

    deleteAccount: async (): Promise<void> => {
        await api.delete('/auth/me');
        authService.logout();
    }
};

export default authService;
