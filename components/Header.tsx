// 檔案路徑：d-league web/components/Header.tsx

import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react'; 
import { Link, useLocation } from 'react-router-dom'; 

interface NavItem {
    name: string;
    href: string;
    external?: boolean;
    children?: { name: string; href: string }[];
}

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
    const location = useLocation();

    const navItems: NavItem[] = [
        { name: '首頁', href: '/' },
        { name: '賽程與結果', href: '/schedule' }, 
        { name: '積分榜', href: '/standings' },
        { name: '數據中心', href: '/stats' },
        { name: '最新消息', href: '/news' },
        { name: '賽事媒體', href: '/media' },
        // 👇 修改這裡：名稱改為簡單的「盃賽」，保留下拉功能
        { 
            name: '盃賽', 
            href: '#', 
            children: [
                { name: '2026 新春賀歲盃', href: '/cup' },
                // 以後有新比賽加在這裡，例如：
                // { name: '2026 夏季聯賽', href: '/summer' },
            ]
        },
    ];
    
    const handleHomeScroll = (href: string) => {
        if (href === '/' && location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLogoClick = () => {
        setMobileMenuOpen(false);
        handleHomeScroll('/');
    };

    const toggleMobileDropdown = (name: string) => {
        if (mobileDropdownOpen === name) {
            setMobileDropdownOpen(null);
        } else {
            setMobileDropdownOpen(name);
        }
    };

    return (
        <header className="fixed top-0 w-full z-[999] h-16 bg-white border-b border-neutral-200 shadow-sm overflow-x-visible">
            <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center max-w-full">
                {/* Logo Area */}
                <div className="flex items-center space-x-4 shrink-0">
                    <Link 
                        to="/" 
                        className="flex items-center group"
                        onClick={handleLogoClick}
                    > 
                        <img 
                            src="https://cdn.store-assets.com/s/783745/f/16299215.png" 
                            alt="D LEAGUE Logo" 
                            className="h-8 md:h-10 w-auto object-contain" 
                        />
                        
                        <div className="ml-3 leading-tight font-display uppercase">
                            <div className="text-lg md:text-xl font-bold tracking-widest text-brand-black whitespace-nowrap">
                                D LEAGUE
                            </div>
                            <div className="hidden md:block text-[10px] md:text-xs font-medium tracking-widest text-brand-blue whitespace-nowrap">
                                台南夢達七人足球聯賽
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-bold uppercase tracking-wider text-brand-black">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group h-16 flex items-center">
                            {item.children ? (
                                <>
                                    <button className="flex items-center hover:text-brand-blue transition-colors focus:outline-none">
                                        {item.name}
                                        <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                                    </button>
                                    
                                    {/* 下拉選單區塊 */}
                                    <div className="absolute top-16 left-0 w-56 bg-white border border-neutral-100 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                to={child.href}
                                                className="block px-6 py-4 text-sm text-neutral-600 hover:text-brand-blue hover:bg-neutral-50 border-b border-neutral-50 last:border-none transition-colors"
                                                onClick={() => handleHomeScroll(child.href)}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                item.external ? (
                                     <a 
                                        href={item.href} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-brand-blue transition-colors flex items-center"
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                     <Link 
                                        to={item.href} 
                                        className="hover:text-brand-blue transition-colors flex items-center"
                                        onClick={() => handleHomeScroll(item.href)} 
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </div>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4 shrink-0">
                    <button className="lg:hidden p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                         <span className="text-brand-black transition-colors duration-300">
                             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                         </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-[1000] p-6 flex flex-col space-y-2 lg:hidden border-t border-neutral-100 overflow-y-auto shadow-xl">
                    {navItems.map(item => (
                        <div key={item.name} className="border-b border-neutral-100 pb-2">
                            {item.children ? (
                                <div>
                                    <button 
                                        onClick={() => toggleMobileDropdown(item.name)}
                                        className="w-full flex justify-between items-center text-xl font-display font-bold uppercase text-brand-black py-2"
                                    >
                                        {item.name}
                                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileDropdownOpen === item.name ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {mobileDropdownOpen === item.name && (
                                        <div className="flex flex-col space-y-3 pl-4 pb-2 bg-neutral-50/50 rounded-lg mt-1">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.name}
                                                    to={child.href}
                                                    className="text-base font-medium text-neutral-600 hover:text-brand-blue py-2"
                                                    onClick={() => {
                                                        setMobileMenuOpen(false);
                                                        handleHomeScroll(child.href);
                                                    }}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                item.external ? (
                                     <a 
                                        href={item.href} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl font-display font-bold uppercase text-brand-black hover:text-brand-blue flex justify-between items-center py-2"
                                    >
                                        {item.name}
                                    </a>
                                ) : (
                                    <Link 
                                        to={item.href} 
                                        className="text-xl font-display font-bold uppercase text-brand-black hover:text-brand-blue flex justify-between items-center py-2"
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            handleHomeScroll(item.href);
                                        }} 
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;