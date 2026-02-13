import React from 'react';
import { Sprout, Menu } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-green-200 dark:border-green-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <Sprout className="h-8 w-8 text-green-600 dark:text-green-400" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                                AgriSmart AI
                            </span>
                        </div>
                        {/* Simple Nav for prototype */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="#" className="hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                                <a href="#analyze" className="hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Analyze Soil</a>
                                <a href="#recommend" className="hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Get Recommendation</a>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button className="p-2 text-slate-600 dark:text-slate-300">
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                {children}
            </main>
            <footer className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-green-100 dark:border-green-900 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>© 2026 AgriSmart AI. Empowering farmers with intelligence.</p>
            </footer>
        </div>
    );
};

export default Layout;
