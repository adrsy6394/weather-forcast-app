import Layout from '../components/layout/Layout';
import { User, Moon, Sun, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { unit, toggleUnit } = useWeather();
    const { user, deleteAccount } = useAuth();

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete your account? This action is permanent and will remove all your data.'
        );

        if (confirmDelete) {
            try {
                await deleteAccount();
                navigate('/register');
            } catch (error) {
                console.error('Failed to delete account:', error);
                alert('Failed to delete account. Please try again later.');
            }
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto space-y-8">
                 <div className="mb-6">
                     <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your preferences and account</p>
                </div>

                {/* Profile Section */}
                <section className="glass-card p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                        <User className="mr-2 text-primary-500" size={24} />
                        Profile Information
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">{user?.name || 'Guest User'}</p>
                                <p className="text-sm text-slate-500">{user?.email || 'Sign in to sync settings'}</p>
                            </div>
                        </div>

                         <button 
                            onClick={() => navigate('/profile?edit=true')}
                            className="text-primary-500 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                            Edit Profile
                        </button>
                    </div>
                </section>

                {/* Preferences Section */}
                <section className="glass-card p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                        {theme === 'light' ? <Sun className="mr-2 text-orange-500" size={24} /> : <Moon className="mr-2 text-indigo-400" size={24} />}
                        Preferences
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Theme Mode</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes</p>
                            </div>
                           <ThemeToggle />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Temperature Units</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Select your preferred unit</p>
                            </div>
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                <button 
                                    onClick={() => unit !== 'metric' && toggleUnit()}
                                    className={`px-3 py-1 text-sm font-medium transition-all rounded-md ${unit === 'metric' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                                >
                                    Celsius (°C)
                                </button>
                                <button 
                                    onClick={() => unit !== 'imperial' && toggleUnit()}
                                    className={`px-3 py-1 text-sm font-medium transition-all rounded-md ${unit === 'imperial' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                                >
                                    Fahrenheit (°F)
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Account Actions */}
                <section className="glass-card p-6 rounded-xl border border-red-100 dark:border-red-900/30">
                    <h2 className="text-xl font-bold text-red-500 mb-6 flex items-center">
                        <Shield className="mr-2" size={24} />
                        Danger Zone
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                             <div>
                                <p className="font-medium text-slate-900 dark:text-white">Delete Account</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Permanently remove your account and data</p>
                            </div>
                            <button 
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-sm font-medium transition-colors border border-red-200 dark:border-red-900/50"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Settings;
