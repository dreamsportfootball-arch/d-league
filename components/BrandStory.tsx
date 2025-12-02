// 檔案路徑：components/BrandStory.tsx

import React from 'react';

const BrandStory: React.FC = () => (
  <section className="py-8 md:py-16 bg-white relative overflow-hidden">
    {/* Decorative BG Text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
        <span className="text-[15rem] leading-none font-display font-black text-neutral-50 uppercase opacity-60">
            DREAM
        </span>
    </div>

    <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
       <span className="text-brand-blue font-black tracking-[0.2em] uppercase text-xs mb-6 block">Our Philosophy</span>
       <h2 className="font-display font-black text-4xl md:text-6xl text-brand-black mb-10 leading-tight">
            不只是一場比賽<br/>
            <span className="text-neutral-300">而是一個起點</span>
       </h2>
       <div className="space-y-6 text-lg md:text-xl text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto">
          <p>
            我們致力建立一個
            <span className="whitespace-nowrap">能讓更多人能夠踢、願意踢、</span>
            <span className="whitespace-nowrap">享受踢的草根聯賽</span>
          </p>
       </div>
       <div className="mt-16 flex justify-center items-center space-x-3">
          <span className="font-display font-black text-4xl md:text-5xl text-brand-black">DREAM IT.</span>
          <span className="font-display font-black text-4xl md:text-5xl text-brand-accent stroke-black">PLAY IT.</span>
       </div>
    </div>
  </section>
);

export default BrandStory;