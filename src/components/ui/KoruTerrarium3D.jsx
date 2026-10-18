import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function KoruTerrarium3D({ stage = 1, weeklyAmount = 100, lowEndMode = false, compact = false }) {
  const root = useRef(null);
  const frame = useRef(0);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const level = clamp(Math.max(stage, Math.ceil(weeklyAmount / 200)), 1, 5);

  useEffect(() => {
    const element = root.current;
    const canTrack = !lowEndMode && !compact && window.innerWidth >= 768 && window.matchMedia('(hover: hover)').matches;
    if (!element || !canTrack) return undefined;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;
      element.style.setProperty('--tilt', `perspective(1100px) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg)`);
      frame.current = requestAnimationFrame(tick);
    };
    const move = (event) => {
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      const strength = clamp(1 - Math.hypot(dx, dy) / 420, 0, 1);
      target.current = { x: clamp(dx / 20, -18, 18) * strength, y: clamp(-dy / 20, -18, 18) * strength };
      element.style.setProperty('--spot-x', `${clamp((dx / rect.width + .5) * 100, 0, 100)}%`);
      element.style.setProperty('--spot-y', `${clamp((dy / rect.height + .5) * 100, 0, 100)}%`);
    };
    element.addEventListener('mousemove', move, { passive: true });
    frame.current = requestAnimationFrame(tick);
    return () => { element.removeEventListener('mousemove', move); cancelAnimationFrame(frame.current); };
  }, [compact, lowEndMode]);

  return <div ref={root} className={`${compact ? 'h-32' : 'h-60'} relative w-full overflow-hidden rounded-2xl bg-obsidian shadow-xl ${lowEndMode || compact ? 'koru-float' : ''}`} style={{ transform: 'var(--tilt, translate3d(0,0,0))', transformStyle: 'preserve-3d' }}>
    <div className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(circle at var(--spot-x,50%) var(--spot-y,35%), rgba(217,119,6,.35), transparent 32%), radial-gradient(circle at 50% 100%, rgba(16,185,129,.2), transparent 50%)' }} />
    <div className="absolute inset-x-5 bottom-4 h-12 rounded-full border border-jade/20 opacity-60" style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '12px 12px', transform: 'translateZ(0)' }} />
    {level >= 3 && <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50" style={{ transform: 'translate(-50%,-50%) translateZ(25px)' }} />}
    <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2" style={{ transform: 'translate(-50%,-50%) translateZ(55px)' }}>
      <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden="true">
        <path d="M78 137 C78 108 79 80 80 57" fill="none" stroke="#10B981" strokeLinecap="round" strokeWidth="8" />
        <polygon points="80,20 108,45 90,82 70,72" fill="#D97706" />
        <polygon points="80,20 52,45 70,72 90,82" fill="#F59E0B" />
        <path d={`M74 88 C${42 - level * 2} ${75 - level * 2} ${25 - level * 3} ${85 - level * 2} ${22 - level * 3} 110`} fill="none" stroke="#34D399" strokeLinecap="round" strokeWidth="9" />
        <path d={`M86 88 C${118 + level * 2} ${75 - level * 2} ${135 + level * 3} ${85 - level * 2} ${138 + level * 3} 110`} fill="none" stroke="#10B981" strokeLinecap="round" strokeWidth="9" />
        {level >= 5 && <polygon points="80,10 85,19 96,20 88,27 90,38 80,32 70,38 72,27 64,20 75,19" fill="#FBBF24" />}
      </svg>
    </div>
    <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/10 px-2 py-1 font-mono text-[10px] text-white">KORU 3D • STAGE {level}/5</div>
    <div className="absolute bottom-3 right-3 rounded-full border border-jade/30 bg-forest/70 px-2 py-1 font-mono text-[10px] text-jade">{lowEndMode ? '60FPS MODE' : '3D TILT ACTIVE'}</div>
  </div>;
}
