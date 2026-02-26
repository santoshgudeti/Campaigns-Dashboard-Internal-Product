import { useState } from 'react';

interface NavbarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = ['Campaigns', 'Analytics', 'Settings'];

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            CampaignHub
                        </span>
                    </div>

                    {/* Desktop Tabs */}
                    <div className="hidden md:flex items-center gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                id={`nav-tab-${tab.toLowerCase()}`}
                                onClick={() => onTabChange(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab
                                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                                        : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
                                    }`}
                                role="tab"
                                aria-selected={activeTab === tab}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        id="mobile-menu-toggle"
                        className="md:hidden p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-surface-50 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden pb-4 animate-fade-in">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    onTabChange(tab);
                                    setMobileOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
