// 檔案路徑：d-league web/components/Header.tsx

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; 

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems: { name: string; href: string; external?: boolean }[] = [
        { name: '首頁', href: '/' },
        { name: '賽程與結果', href: '/schedule' }, 
        { name: '積分榜', href: '/standings' },
        { name: '數據中心', href: '/stats' },
        { name: '最新消息', href: '/news' },
        { name: '賽事媒體', href: '/media' },
    ];
    
    // ✅ 修正 1: 處理捲動到頂部的核心邏輯 (只在已經在首頁時作用)
    const handleHomeScroll = (href: string) => {
        if (href === '/' && location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 處理 Logo 點擊的函數 (包含關閉選單和捲動)
    const handleLogoClick = () => {
        setMobileMenuOpen(false);
        handleHomeScroll('/');
    };


    return (
        <header className="fixed top-0 w-full z-[999] h-16 bg-white border-b border-neutral-200 shadow-sm overflow-x-hidden">
            <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center max-w-full overflow-hidden">
                {/* Logo Area */}
                <div className="flex items-center space-x-4 shrink-0">
                    <Link 
                        to="/" 
                        className="flex items-center group"
                        onClick={handleLogoClick} // 適用於 Logo
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
                        item.external ? (
                             <a 
                                key={item.name} 
                                href={item.href} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-brand-blue transition-colors flex items-center"
                            >
                                {item.name}
                            </a>
                        ) : (
                             <Link 
                                key={item.name} 
                                to={item.href} 
                                className="hover:text-brand-blue transition-colors flex items-center"
                                // ✅ 修正 2: 桌面導航 - 點擊時加入捲動邏輯
                                onClick={() => handleHomeScroll(item.href)} 
                            >
                                {item.name}
                            </Link>
                        )
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
                <div className="fixed inset-0 top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-[1000] p-6 flex flex-col space-y-6 lg:hidden border-t border-neutral-100 overflow-y-auto shadow-xl">
                    {navItems.map(item => (
                        item.external ? (
                             <a 
                                key={item.name} 
                                href={item.href} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl font-display font-bold uppercase text-brand-black hover:text-brand-blue border-b border-neutral-100 pb-4 flex justify-between items-center"
                            >
                                {item.name}
                            </a>
                        ) : (
                            <Link 
                                key={item.name} 
                                to={item.href} 
                                className="text-xl font-display font-bold uppercase text-brand-black hover:text-brand-blue border-b border-neutral-100 pb-4 flex justify-between items-center"
                                // ✅ 修正 3: 手機導航 - 點擊時，先關閉選單，然後加入捲動邏輯
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    handleHomeScroll(item.href);
                                }} 
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;