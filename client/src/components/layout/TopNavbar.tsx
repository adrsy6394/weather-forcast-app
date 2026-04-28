import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useWeather } from '../../context/WeatherContext';

interface TopNavbarProps {
    onMenuClick: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const { fetchWeather } = useWeather();
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const [searchQuery, setSearchQuery] = useState('');

    // Auto-search effect removed as per user request to only search on button click
    // useEffect(() => {
    //     if (debouncedSearch.trim()) {
    //         fetchWeather(debouncedSearch);
    //     }
    // }, [debouncedSearch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Immediate search on submit
        if (searchQuery.trim()) {
            fetchWeather(searchQuery);
        }
    };

    return (
        <nav className={`fixed top-0 right-0 left-0 lg:left-64 z-20 transition-all duration-300 ${
            isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}>
            <div className="px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-4 flex-1">
                    <button 
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative w-full max-w-md flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for a city..."
                                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary-500/50 text-slate-900 dark:text-white placeholder-slate-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button 
                            type="submit"
                            className="bg-primary-500 hover:bg-primary-600 text-white p-2.5 rounded-xl transition-colors"
                        >
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                     <div className="hidden sm:block">
                        <ThemeToggle />
                    </div>
                    
                    <button 
                        className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative"
                        onClick={() => alert('Notifications feature coming soon!')}
                    >
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </button>

                    <div 
                        className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 border-2 border-white dark:border-slate-800 shadow-sm cursor-pointer hover:ring-2 hover:ring-primary-500/50 transition-all"
                        onClick={() => navigate('/profile')}
                    >
                        <User size={20} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
