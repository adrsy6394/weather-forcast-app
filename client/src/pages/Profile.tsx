import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { User, Mail, MapPin, Calendar, Edit2, Save, X, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        location: user?.location || '',
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('edit') === 'true') {
            setIsEditing(true);
        }
    }, [location]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                bio: user.bio || '',
                location: user.location || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateProfile(formData);
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            // Remove edit param from URL
            navigate('/profile', { replace: true });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Profile</h1>
                    <p className="text-slate-500 dark:text-slate-400">View and manage your account details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
                            <div className="w-32 h-32 bg-gradient-to-tr from-primary-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg mb-6 ring-4 ring-white dark:ring-slate-800">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{user.name}</h2>
                            <p className="text-primary-500 font-medium mb-4">{user.role || 'User'}</p>
                            
                            <div className="w-full space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <Mail size={18} className="text-primary-500" />
                                    <span className="text-sm truncate w-full">{user.email}</span>
                                </div>
                                {user.location && (
                                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                        <MapPin size={18} className="text-primary-500" />
                                        <span className="text-sm">{user.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <Calendar size={18} className="text-primary-500" />
                                    <span className="text-sm">Joined Feb 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details/Edit Form */}
                    <div className="lg:col-span-2">
                        <div className="glass-card p-8 rounded-2xl h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    {isEditing ? <Edit2 size={20} className="text-primary-500" /> : <User size={20} className="text-primary-500" />}
                                    {isEditing ? 'Edit Profile' : 'Profile Details'}
                                </h3>
                                {!isEditing && (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-500/20 rounded-xl transition-all font-medium text-sm"
                                    >
                                        <Edit2 size={16} />
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-sm">
                                    {success}
                                </div>
                            )}

                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-slate-900 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    type="text"
                                                    name="location"
                                                    placeholder="City, Country"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
                                            <textarea
                                                name="bio"
                                                rows={4}
                                                value={formData.bio}
                                                onChange={handleChange}
                                                placeholder="Tell us about yourself..."
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-slate-900 dark:text-white resize-none"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={20} />}
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                                        >
                                            <X size={20} />
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                                            <p className="text-lg font-medium text-slate-900 dark:text-white">{user.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                                            <p className="text-lg font-medium text-slate-900 dark:text-white">{user.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</p>
                                            <p className="text-lg font-medium text-slate-900 dark:text-white">{user.location || 'Not set'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Role</p>
                                            <p className="text-lg font-medium text-slate-900 dark:text-white capitalize">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <BookOpen size={14} className="text-primary-500" />
                                            Biography
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                                            {user.bio || "You haven't added a bio yet. Click 'Edit Profile' to tell us more about yourself!"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
