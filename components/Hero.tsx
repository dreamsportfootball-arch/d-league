// 檔案路徑：d-league web/components/Hero.tsx

import React, { useEffect, useState } from 'react';
// 1. ✅ 新增：從 react-router-dom 導入 Link
import { Link } from 'react-router-dom'; 
import { ArrowRight, FileText } from 'lucide-react';

const Hero: React.FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        // 👈 修正 2: 移除 h-[85vh]，改為 min-h-[50vh]
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-brand-black">
            {/* 1. 背景層 */}
            <div className={`absolute inset-0 z-0 transition-transform duration-[20s] ease-out ${loaded ? 'scale-110' : 'scale-100'}`}>
                <img 
                    src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=2000&auto=format&fit=crop" 
                    alt="Stadium Atmosphere"
                    className="w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/20 to-brand-black"></div>
            </div>

            {/* 2. 內容層 */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 mt-12 mb-16 text-center md:text-left">
                {/* 增加 mb-16 以確保 Hero 內容與下一個區塊有足夠間隔 */}
                <div className="max-w-5xl">
                    {/* 標題動畫 */}
                    <h1 className="font-display font-black text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] text-white uppercase leading-[0.9] mb-4 drop-shadow-2xl tracking-tighter">
                        D LEAGUE
                    </h1>
                </div>
                
                <div className={`transition-all duration-1000 delay-300 ease-out transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-white font-bold uppercase tracking-widest mb-6 pl-2 border-l-4 border-brand-accent">
                        台南夢達七人足球聯賽
                    </h2>
                </div>

                <div className={`transition-all duration-1000 delay-500 ease-out transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <p className="font-display text-xl sm:text-3xl md:text-5xl text-brand-accent font-black tracking-widest uppercase mb-8 md:mb-12">
                        SEASON 25/26
                    </p>
                </div>

                {/* 按鈕群組 */}
                <div className={`flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 transition-all duration-1000 delay-700 ease-out transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        
                        {/* Primary Button - 已更改為 Link to="/schedule" */}
                        <Link 
                            to="/schedule" // 2. ✅ 將按鈕替換為 Link，目標是賽程頁面
                            className="group relative px-8 py-4 font-bold uppercase tracking-widest text-brand-black transition-colors duration-300"
                        >
                        {/* 獨立的傾斜背景層 */}
                        <div className="absolute inset-0 bg-brand-accent -skew-x-12 group-hover:bg-white transition-colors duration-300 shadow-lg shadow-brand-accent/20">
                            <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        </div>
                        
                        {/* 文字層 */}
                        <span className="relative z-10 flex items-center">
                            查看賽程 <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                        </Link>

                        {/* Secondary Button */}
                        <a 
                        href="https://drive.google.com/file/d/1rPK2fl0zF6ZqaVQlzEOajk4WHRN42h7B/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-8 py-4 font-bold uppercase tracking-widest text-white hover:text-brand-black transition-colors duration-300"
                        >
                        {/* 獨立的傾斜背景與邊框層 */}
                        <div className="absolute inset-0 border border-white/30 -skew-x-12 backdrop-blur-sm group-hover:bg-white group-hover:border-white transition-all duration-300"></div>

                        {/* 文字層 */}
                        <span className="relative z-10 flex items-center">
                            <FileText className="mr-2 w-5 h-5 opacity-70" /> 賽事規程
                        </span>
                        </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;