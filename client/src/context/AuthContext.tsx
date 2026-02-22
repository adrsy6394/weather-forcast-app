import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import authService from '../services/authService';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    updateProfile: (data: any) => Promise<void>;
    deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (data: any) => {
        const response = await authService.login(data);
        setUser(response.user);
    };

    const register = async (data: any) => {
        const response = await authService.register(data);
        setUser(response.user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const updateProfile = async (data: any) => {
        const updatedUser = await authService.updateProfile(data);
        setUser(updatedUser);
    };

    const deleteAccount = async () => {
        await authService.deleteAccount();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout,
            updateProfile,
            deleteAccount
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
