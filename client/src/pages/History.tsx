import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Trash2, Clock, Search, ExternalLink } from 'lucide-react';
import type { SearchHistoryItem } from '../types';
import historyService from '../services/historyService';
import { useWeather } from '../context/WeatherContext';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const [history, setHistory] = useState<SearchHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { fetchWeather } = useWeather();
    const navigate = useNavigate();

    const loadHistory = async () => {
        try {
            const data = await historyService.getHistory();
            if (Array.isArray(data)) {
                setHistory(data);
            } else {
                console.error('Expected history array, got:', data);
                setHistory([]);
            }
        } catch (error) {
            console.error('Failed to load history', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await historyService.deleteHistory(id);
            setHistory(history.filter(item => item._id !== id));
        } catch (error) {
            console.error('Failed to delete history item', error);
        }
    };

    const handleSearch = (city: string) => {
        fetchWeather(city);
        navigate('/dashboard');
    };

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString(undefined, {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                 <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Search History</h1>
                        <p className="text-slate-500 dark:text-slate-400">Manage your recent weather searches</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    </div>
                ) : history.length === 0 ? (
                    <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-slate-400 w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No history yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Your recent searches will appear here</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((item) => (
                            <div 
                                key={item._id} 
                                onClick={() => handleSearch(item.city)}
                                className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-primary-500">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white capitalize">{item.city}</h4>
                                        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                                            <span>{item.temperature}°</span>
                                            <span>•</span>
                                            <span>{item.condition}</span>
                                            <span>•</span>
                                            <span>{formatDate(item.searchedAt)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button 
                                        className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded-lg transition-colors"
                                        title="View Details"
                                    >
                                        <ExternalLink size={18} />
                                    </button>
                                    <button 
                                        onClick={(e) => handleDelete(item._id, e)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default History;
