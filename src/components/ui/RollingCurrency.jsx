import { useEffect, useRef, useState } from 'react';

const formatINR = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;

export default function RollingCurrency({ value = 100, duration = 450, className = '' }) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const start = previous.current;
    const end = Number(value) || 0;
    const startedAt = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - ((1 - progress) ** 3);
      setDisplay(start + (end - start) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else previous.current = end;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span className={`currency font-mono tabular-nums ${className}`}>{formatINR(display)}</span>;
}
