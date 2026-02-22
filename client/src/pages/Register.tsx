import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CloudSun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            {/* Background Animations */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px] animate-blob" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
            </div>

            <div className="w-full max-w-md relative z-10 glass-card p-8 rounded-2xl animate-fade-in-up">
                <div className="text-center mb-8">
                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4 text-blue-400">
                        <CloudSun size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-slate-400">Join us to track weather globally</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            icon={<User className="w-5 h-5" />}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            icon={<Mail className="w-5 h-5" />}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                         <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock className="w-5 h-5" />}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock className="w-5 h-5" />}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-6">
                         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/30 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center text-slate-400">
                    <p>Already have an account? <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
