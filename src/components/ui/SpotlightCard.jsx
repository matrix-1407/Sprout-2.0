import { useRef } from 'react';

export default function SpotlightCard({ children, className = '', as: Tag = 'div', ...props }) {
  const card = useRef(null);
  const onPointerMove = (event) => {
    if (!card.current || event.pointerType !== 'mouse') return;
    const rect = card.current.getBoundingClientRect();
    card.current.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    card.current.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag ref={card} onPointerMove={onPointerMove} className={`group relative overflow-hidden rounded-2xl border border-hairline bg-surface ${className}`} {...props}>
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(180px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(16,185,129,.38), transparent 68%)' }} />
      <div className="relative">{children}</div>
    </Tag>
  );
}
