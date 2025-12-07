// 檔案路徑：d-league web/components/PhotoCarousel.tsx

import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

// 圖片資料來源
const carouselImages = [
    { 
        id: 1, 
        src: '/d-league/assets/carousel/slide-1.jpg' 
    },
    { 
        id: 2, 
        src: '/d-league/assets/carousel/slide-2.jpg' 
    },
    { 
        id: 3, 
        src: '/d-league/assets/carousel/slide-3.jpg' 
    },
    { 
        id: 4, 
        src: '/d-league/assets/carousel/slide-4.jpg' 
    },
    { 
        id: 5, 
        src: '/d-league/assets/carousel/slide-5.jpg' 
    },
];

const PhotoCarousel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0); 

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    };
    
    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
    };

    // 自動輪播邏輯
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide(); 
        }, 5000); 
        
        return () => clearInterval(interval); 
    }, []);

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };
    
    // 觸控處理函式
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        const swipeThreshold = 50; 

        if (touchStartX === 0) return; 

        if (swipeDistance > swipeThreshold) {
            prevSlide(); 
        } else if (swipeDistance < -swipeThreshold) {
            nextSlide(); 
        }
        setTouchStartX(0); 
    };

    return (
        <section className="py-12 md:py-20 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
            
            {/* 背景裝飾大字 */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[10rem] font-display font-black text-neutral-100 uppercase opacity-40 pointer-events-none whitespace-nowrap select-none">
                MOMENTS
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                
                <div className="flex flex-col items-center mb-8 md:mb-12">
                    <div className="flex items-center space-x-2 mb-2">
                        <Camera className="w-4 h-4 text-brand-blue" />
                        <span className="text-brand-blue font-black tracking-[0.3em] text-[10px] uppercase">Official Gallery</span>
                    </div>
                    <h2 className="font-display font-black text-3xl md:text-4xl uppercase text-brand-black tracking-tight text-center">
                        賽事 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-500">精選圖集</span>
                    </h2>
                    <div className="w-12 h-1 bg-brand-blue mt-4 rounded-full"></div>
                </div>

                {/* 輪播主體框 */}
                <div className="relative w-full max-w-5xl mx-auto">
                    
                    <div 
                        className="
                            aspect-[16/10] md:aspect-[16/7] 
                            relative overflow-hidden 
                            group
                            bg-neutral-200 rounded-lg shadow-2xl
                        "
                        onTouchStart={handleTouchStart} 
                        onTouchEnd={handleTouchEnd}     
                    >
                        {carouselImages.map((image, index) => (
                            <div 
                                key={image.id}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                    index === activeIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                                }`}
                            >
                                <img 
                                    src={image.src} 
                                    alt={`賽事精選圖片 ${image.id}`} 
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    // 這會讓瀏覽器在背景就預先下載這些圖片，
                                    // 當輪播切換時，圖片已經準備好了，不會有任何延遲或卡頓。
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200&auto=format&fit=crop';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>

                    {/* 導航點 (Dots) */}
                    <div className="flex justify-center space-x-3 mt-8">
                        {carouselImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`
                                    h-1.5 rounded-full transition-all duration-500 ease-out
                                    ${index === activeIndex 
                                        ? 'w-8 bg-brand-blue shadow-lg shadow-brand-blue/30' 
                                        : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                                    }
                                `}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhotoCarousel;