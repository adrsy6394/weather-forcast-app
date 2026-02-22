import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex text-slate-900 dark:text-white transition-colors duration-300">
            <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-64">
                <TopNavbar onMenuClick={toggleMobileMenu} />

                <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-24">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
