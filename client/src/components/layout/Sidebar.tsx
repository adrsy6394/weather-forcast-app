import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, History, Settings, LogOut, CloudSun, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SidebarItem = ({ icon, label, path, active }: { icon: React.ReactNode, label: string, path: string, active: boolean }) => (
    <Link
        to={path}
        className={clsx(
            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            active
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-primary-600 dark:hover:text-primary-400"
        )}
    >
        <div className={clsx("transition-transform group-hover:scale-110", active && "scale-110")}>
            {icon}
        </div>
        <span className="font-medium">{label}</span>
    </Link>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { logout } = useAuth();
    
    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <CloudSun size={20} />, label: 'Forecast', path: '/forecast' },
        { icon: <Map size={20} />, label: 'Map View', path: '/map' },
        { icon: <History size={20} />, label: 'History', path: '/history' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-20">
                <div className="p-6 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <CloudSun className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                        WeatherIO
                    </span>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-6">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                            active={location.pathname === item.path}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button 
                        onClick={logout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

             {/* Mobile Sidebar Overlay */}
             {isOpen && (
                <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden" onClick={onClose}>
                    <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 p-4 shadow-xl transition-transform duration-300" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-8">
                             <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <CloudSun className="text-white w-5 h-5" />
                                </div>
                                <span className="font-bold text-lg text-slate-900 dark:text-white">WeatherIO</span>
                            </div>
                            <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        
                         <nav className="space-y-2">
                            {navItems.map((item) => (
                                <SidebarItem
                                    key={item.path}
                                    icon={item.icon}
                                    label={item.label}
                                    path={item.path}
                                    active={location.pathname === item.path}
                                />
                            ))}
                              <button 
                                onClick={logout}
                                className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-4"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
