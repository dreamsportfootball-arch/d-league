import React, { useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
  className?: string;
  persistKey?: string;
}

const revealedSections = new Set<string>();

const DeferredSection: React.FC<DeferredSectionProps> = ({
  children,
  minHeight = 240,
  rootMargin = '600px 0px',
  className = '',
  persistKey,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(() =>
    persistKey ? revealedSections.has(persistKey) : false,
  );

  useEffect(() => {
    if (visible) return;
    const element = rootRef.current;
    const reveal = () => {
      if (persistKey) revealedSections.add(persistKey);
      setVisible(true);
    };

    if (!element || !('IntersectionObserver' in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        reveal();
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [persistKey, rootMargin, visible]);

  return (
    <div ref={rootRef} className={className} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
};

export default DeferredSection;
