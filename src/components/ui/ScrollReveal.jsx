import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, delay = 0, lowEndMode = false, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(lowEndMode);

  useEffect(() => {
    if (lowEndMode || !ref.current || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [lowEndMode]);

  return <div ref={ref} className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-8 scale-[.98] opacity-0'} ${className}`} style={{ transitionDelay: lowEndMode ? '0ms' : `${delay}ms` }}>{children}</div>;
}
