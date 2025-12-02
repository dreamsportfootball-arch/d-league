import React from "react";
import { MapPin, ArrowUpRight, Navigation } from 'lucide-react';

// =========================================
// 1. Origin & Vision Section (品牌起源)
// =========================================
const OriginVisionSection: React.FC = () => {
  return (
    <section className="bg-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-32">
        
        {/* Header Label */}
        <div className="flex items-center justify-between mb-12 md:mb-20">
          <div className="flex items-center space-x-4">
            <div className="w-8 md:w-12 h-[2px] bg-brand-black" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
              The Origin
            </span>
          </div>
          
          {/* Meta */}
          <div className="hidden md:flex items-center space-x-3 text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-300">
             <span>Est. 2025</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-24">
          
          {/* Left: 標題區 */}
          <div className="lg:w-5/12 relative">
            <span className="absolute -top-8 -left-4 md:-top-12 md:-left-8 text-[6rem] md:text-[8rem] leading-none font-display font-black text-neutral-50/80 -z-10 select-none pointer-events-none">
              WHY
            </span>

            <h1 className="font-display font-black text-5xl md:text-7xl text-brand-black leading-[0.9] tracking-tighter uppercase mb-8 relative z-10">
              We Build<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-600">
                The Stage.
              </span>
            </h1>

            <div className="pl-6 border-l-2 border-brand-accent">
                <p className="font-display font-bold text-lg md:text-xl leading-relaxed text-brand-black tracking-wide">
                  不只是一場比賽，
                  <br />
                  而是一個起點。
                </p>
            </div>
          </div>

          {/* Right: 敘事區 */}
          <div className="lg:w-7/12 pt-2 lg:pt-4">
            <div className="prose prose-neutral max-w-none">
              <p className="text-sm md:text-base text-neutral-600 leading-loose font-medium mb-6">
                <span className="font-display font-black text-brand-blue text-lg mr-2 uppercase">D LEAGUE</span>
                我們的理念很簡單：讓更多人<span className="text-brand-black font-bold border-b-2 border-brand-accent/30">願意踢、能夠踢、享受踢</span>
              </p>
              
              <p className="text-sm md:text-base text-neutral-600 leading-loose font-medium mb-6">
                這裡不只是球員的舞台，也是裁判的舞台。整個賽季將由資深裁判帶領資淺裁判，因為我們相信，真正的比賽就是最好的養分
              </p>

              <p className="text-sm md:text-base text-neutral-600 leading-loose font-medium mb-8">
                Dreamsport 其實背後帶著「夢想的港口」的意思，希望能創造一個環境、一個平台。一定不完美，但至少比沒有好。四年前我就想辦聯賽了，只希望這個聯賽能夠順利走下去
              </p>

              <p className="text-sm md:text-base text-brand-black font-bold leading-loose">
                也請大家一起幫忙
              </p>

              <div className="mt-12 flex items-center space-x-3 opacity-80">
                <span className="font-display font-black text-2xl md:text-3xl text-brand-black italic tracking-tighter">
                  DREAM IT.
                </span>
                <span className="font-display font-black text-2xl md:text-3xl text-brand-accent stroke-black italic tracking-tighter">
                  PLAY IT.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =========================================
// 2. Venue Section (比賽場地 - 修正手機照片顯示)
// =========================================
const VenueSection: React.FC = () => {
    return (
        <section className="relative bg-neutral-950 text-white overflow-hidden py-20 md:py-32 border-b border-white/10">
            
            {/* Background Visual */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2000&auto=format&fit=crop" 
                    alt="Stadium Background" 
                    className="w-full h-full object-cover opacity-20 grayscale mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Top/Left: 視覺裝飾區 (手機：顯示在上方) */}
                    <div className="lg:hidden w-full relative mb-1">
                        {/* 手機版照片容器：確保全寬顯示 */}
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group bg-neutral-900 p-2">
                             {/* 大圖照片路徑更新 */}
                             <img 
                                src="/assets/aboutpage/The Home Ground.jpg" 
                                alt="The Home Ground" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1200&auto=format&fit=crop";
                                }}
                             />
                             
                             {/* 覆蓋層 */}
                             <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay"></div>
                             

                        </div>
                    </div>

                    {/* Bottom/Right: 資訊區 - Lg版靠右對齊 */}
                    <div>
                        {/* Label 改為 "台南" */}
                        <div className="flex items-center space-x-3 mb-6">
                            <MapPin className="w-5 h-5 text-brand-accent" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">
                                台南
                            </span>
                        </div>

                        {/* Title 改為 "仁德 文賢國中" */}
                        <h2 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight leading-none mb-6">
                            仁德<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                                文賢國中
                            </span>
                        </h2>

                        {/* Description 更新 */}
                        <div className="space-y-4 mb-10 max-w-md">
                            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-medium">
                                D LEAGUE 25/26 賽季比賽場地。
                                <br/>
                                人工草足球場
                            </p>
                        </div>

                        {/* Actions: 按鈕區 */}
                        <div className="flex flex-col sm:flex-row gap-4">
                             {/* Google Maps Button 連結更新 */}
                             <a 
                                href="https://share.google/rI921QclMDxQ37xFg" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-brand-black font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-colors duration-300 shadow-lg hover:shadow-brand-accent/20"
                             >
                                <Navigation className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                                Google Maps
                             </a>
                             
                             <div className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-neutral-400 font-bold uppercase tracking-widest text-xs cursor-default">
                                Artificial Turf
                             </div>
                        </div>
                    </div>

                    {/* Right: 視覺裝飾區 (電腦版：顯示在右側) */}
                    <div className="hidden lg:block relative">
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group">
                             <img 
                                src="/assets/aboutpage/The Home Ground.jpg" 
                                alt="The Home Ground" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1200&auto=format&fit=crop";
                                }}
                             />
                             
                             {/* 覆蓋層 */}
                             <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay"></div>
                             

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};


// =========================================
// Main Page Component
// =========================================
const AboutPage: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-white pb-0">
        <OriginVisionSection />
        <VenueSection />
        

    </div>
  );
};

export default AboutPage;