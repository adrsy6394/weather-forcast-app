import api from './api';
import type { SearchHistoryItem } from '../types';

const historyService = {
    getHistory: async (): Promise<SearchHistoryItem[]> => {
        try {
            console.log('[HistoryService] Fetching history...');
            const response = await api.get<SearchHistoryItem[]>('/history');
            console.log('[HistoryService] Fetch success:', response.data.length, 'items');
            return response.data;
        } catch (error) {
            console.error('[HistoryService] Fetch error:', error);
            throw error;
        }
    },

    addToHistory: async (data: { city: string, temperature: number, condition: string }): Promise<SearchHistoryItem> => {
        try {
            console.log('[HistoryService] Adding to history:', data);
            const response = await api.post<SearchHistoryItem>('/history', data);
            console.log('[HistoryService] Add success:', response.data);
            return response.data;
        } catch (error) {
            console.error('[HistoryService] Add error:', error);
            throw error;
        }
    },

    deleteHistory: async (id: string): Promise<void> => {
        await api.delete(`/history/${id}`);
    }
};

export default historyService;
