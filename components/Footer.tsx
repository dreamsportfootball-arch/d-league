// 檔案路徑：components/Footer.tsx

import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom'; 

// 封裝小組件：社群按鈕
const SocialButton: React.FC<{ icon: React.ReactNode, href: string, label: string }> = ({ icon, href, label }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-brand-accent hover:text-brand-black hover:border-brand-accent transition-all duration-300 transform hover:-translate-y-1"
    >
        {icon}
    </a>
);

// 封裝小組件：合作夥伴 Logo
const PartnerLogo: React.FC<{ src: string; className?: string }> = ({ src, className }) => (
    <div className="h-8 w-auto flex items-center justify-center group/logo transition-all duration-300">
        <img 
            src={src} 
            alt="Partner" 
            className={`max-h-full w-auto object-contain transition-all duration-300 group-hover/logo:scale-105 ${className || ''}`} 
        />
    </div>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-neutral-950 text-white pt-12 md:pt-20 pb-2 md:pb-5 border-t border-neutral-900 relative">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-8 md:mb-20">
                    
                    {/* 1. 品牌核心區 */}
                    <div className="md:col-span-5 flex flex-col items-start">
                        <div className="mb-1 md:mb-2"> 
                            <span className="font-display font-black text-2xl uppercase text-white tracking-widest border-l-4 border-brand-accent pl-3">
                                D LEAGUE
                            </span>
                        </div>

                        <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-wider mb-4 leading-tight text-white [-webkit-text-stroke:.5px_currentColor] md:[-webkit-text-stroke:0px]">
                            台南夢達七人足球聯賽
                        </h2>
                        
                        <p className="text-neutral-500 max-w-sm mb-6 leading-relaxed font-medium text-sm">
                            我們致力建立一個
                            <span className="whitespace-nowrap">能讓更多人能夠踢、願意踢、</span>
                            <span className="whitespace-nowrap">享受踢的草根聯賽</span>
                        </p>
                        
                        <div className="flex items-center space-x-4">
                            <SocialButton icon={<Instagram className="w-5 h-5"/>} href="https://www.instagram.com/d.league_tw/" label="Instagram" />
                            <SocialButton icon={<Youtube className="w-5 h-5"/>} href="https://www.youtube.com/@DreamSportFootball" label="Youtube" />
                            <SocialButton icon={<Facebook className="w-5 h-5"/>} href="https://www.facebook.com/profile.php?id=61576222172219" label="Facebook" />
                        </div>
                    </div>

                    {/* 2. 聯賽資訊區 */}
                    <div className="md:col-span-3">
                        <h4 className="font-display font-bold text-lg uppercase mb-8 tracking-widest text-white border-l-4 border-brand-accent pl-3">聯賽資訊</h4>
                        <ul className="space-y-4 text-neutral-500 font-medium text-sm">
                             
                             <li>
                                {/* 👇 關鍵修改：將路徑改為 /about */}
                                <Link to="/about" className="hover:text-brand-accent transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 transition-all duration-300 bg-brand-accent h-0.5 mr-0 group-hover:mr-2"></span>
                                    關於 D LEAGUE
                                </Link>
                             </li>
                             <li>
                                {/* 🎯 關鍵修改：將路徑改為 /#teams (首頁定位點) */}
                                <Link to="/#teams" className="hover:text-brand-accent transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 transition-all duration-300 bg-brand-accent h-0.5 mr-0 group-hover:mr-2"></span>
                                    參賽球隊
                                </Link>
                             </li>
                             <li>
                                <Link to="/schedule" className="hover:text-brand-accent transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 transition-all duration-300 bg-brand-accent h-0.5 mr-0 group-hover:mr-2"></span>
                                    賽程與結果
                                </Link>
                             </li>

                             <li>
                                <a 
                                    href="https://drive.google.com/file/d/1rPK2fl0zF6ZqaVQlzEOajk4WHRN42h7B/view" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-accent transition-colors flex items-center group"
                                >
                                    <span className="w-0 group-hover:w-2 transition-all duration-300 bg-brand-accent h-0.5 mr-0 group-hover:mr-2"></span>
                                    賽事規程 
                                </a>
                            </li>

                            <li>
                                <a href="#" className="hover:text-brand-accent transition-colors flex items-center group">
                                    <span className="w-0 group-hover:w-2 transition-all duration-300 bg-brand-accent h-0.5 mr-0 group-hover:mr-2"></span>
                                    過往賽事
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 3. 官方合作夥伴區 */}
                    <div className="md:col-span-4">
                        <h4 className="font-display font-bold text-lg uppercase mb-8 tracking-widest text-white border-l-4 border-brand-accent pl-3">官方合作夥伴</h4>
                        
                         <div className="flex flex-wrap gap-8 items-center justify-start max-w-sm">
                            <PartnerLogo className="filter brightness-0 invert" src="https://cdn.store-assets.com/s/783745/f/15686789.png" />
                            <PartnerLogo className="filter brightness-0 invert" src="https://cdn.store-assets.com/s/783745/f/15684766.png" />
                            <PartnerLogo className="filter brightness-0 invert" src="https://cdn.store-assets.com/s/783745/f/15684770.png" />
                            <PartnerLogo src="https://cdn.store-assets.com/s/783745/f/15684768.png" />
                         </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;