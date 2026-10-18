import { useEffect, useId, useRef } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function KoruAvatar3D({ stage = 1, weeklyAmount = 100, lowEndMode = false, size = 'md' }) {
  const root = useRef(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0, scale: 1 });
  const current = useRef({ x: 0, y: 0, scale: 1 });
  const rawId = useId();
  const id = rawId.replace(/:/g, '');
  const growth = clamp(Math.max(Number(stage) || 1, Math.ceil((Number(weeklyAmount) || 100) / 200)), 1, 5);
  const dimension = size === 'sm' ? 'h-48 w-48' : 'h-72 w-72';

  useEffect(() => {
    const element = root.current;
    const canTrack = !lowEndMode && window.matchMedia('(hover: hover) and (min-width: 768px)').matches;
    if (!element || !canTrack) return undefined;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.09;
      current.current.y += (target.current.y - current.current.y) * 0.09;
      current.current.scale += (target.current.scale - current.current.scale) * 0.09;
      element.style.setProperty('--koru-transform', `perspective(1200px) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg) scale(${current.current.scale})`);
      frame.current = requestAnimationFrame(tick);
    };
    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const strength = clamp(1 - Math.hypot(dx, dy) / 420, 0, 1);
      target.current = { x: clamp(dx / 20, -16, 16) * strength, y: clamp(-dy / 20, -16, 16) * strength, scale: 1 + strength * 0.025 };
      element.style.setProperty('--spot-x', `${clamp((dx / rect.width + 0.5) * 100, 0, 100)}%`);
      element.style.setProperty('--spot-y', `${clamp((dy / rect.height + 0.5) * 100, 0, 100)}%`);
    };
    element.addEventListener('mousemove', onMove, { passive: true });
    frame.current = requestAnimationFrame(tick);
    return () => { element.removeEventListener('mousemove', onMove); cancelAnimationFrame(frame.current); };
  }, [lowEndMode]);

  const showShield = growth >= 3;
  const showPulse = growth >= 4;
  const showCrown = growth >= 5;
  const leafSpread = 0.82 + growth * 0.045;

  return (
    <div ref={root} aria-label={`Koru growth stage ${growth}`} className={`${dimension} koru-sculpture relative shrink-0 ${lowEndMode ? 'koru-v3-breathe' : ''}`} style={{ transform: 'var(--koru-transform, translate3d(0,0,0))', transformStyle: 'preserve-3d' }}>
      <div className="pointer-events-none absolute inset-[-24%] rounded-full" style={{ background: 'radial-gradient(circle at var(--spot-x,50%) var(--spot-y,38%), rgba(16,185,129,.2), transparent 34%), radial-gradient(circle, rgba(217,119,6,.1), transparent 68%)' }} />

      <div className="absolute inset-0" style={{ transform: 'translateZ(0)', transformStyle: 'preserve-3d' }}>
        <div className="absolute bottom-[11%] left-[22%] h-[13%] w-[56%] rounded-[50%] bg-obsidian/15 blur-xl" />
        <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-obsidian/10" />
      </div>

      <div className="absolute inset-[5%]" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        <div className="koru-axis koru-axis-one absolute left-1/2 top-1/2 h-[82%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-gold/55" />
        <div className="koru-axis koru-axis-two absolute left-1/2 top-1/2 h-[82%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-jade/55" />
        <div className="koru-orbit-arm absolute left-1/2 top-1/2 h-[88%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-obsidian/20" />
        {showPulse && [0, 1, 2].map((pulse) => <span key={pulse} className="koru-ripple absolute left-1/2 top-1/2 rounded-full border border-jade/30" style={{ animationDelay: `${pulse * 550}ms` }} />)}
      </div>

      <div className="absolute inset-[7%]" style={{ transform: 'translateZ(65px)', transformStyle: 'preserve-3d' }}>
        <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-core`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#D1FAE5" /><stop offset=".3" stopColor="#10B981" /><stop offset=".68" stopColor="#065F46" /><stop offset="1" stopColor="#0A2118" /></linearGradient>
            <linearGradient id={`${id}-facet`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#0A2118" /><stop offset=".48" stopColor="#154C38" /><stop offset="1" stopColor="#D97706" /></linearGradient>
            <linearGradient id={`${id}-gold`} x1="0" x2="1"><stop stopColor="#FDE68A" /><stop offset=".5" stopColor="#D97706" /><stop offset="1" stopColor="#92400E" /></linearGradient>
            <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <path d="M117 202 C116 166 118 136 120 93" fill="none" stroke={`url(#${id}-core)`} strokeLinecap="round" strokeWidth="8" />
          <g style={{ transform: `translate(120px 148px) scale(${leafSpread}) translate(-120px -148px)`, transformOrigin: '120px 148px', transition: 'transform 600ms cubic-bezier(.16,1,.3,1)' }}>
            <path d="M113 157 C78 136 51 143 35 176 C65 166 87 171 115 184" fill={`url(#${id}-core)`} stroke="#047857" strokeWidth="2" />
            {growth >= 2 && <path d="M127 157 C162 136 189 143 205 176 C175 166 153 171 125 184" fill={`url(#${id}-core)`} stroke="#047857" strokeWidth="2" />}
            <path d="M111 163 C86 153 65 159 50 174" fill="none" stroke="#A7F3D0" strokeOpacity=".7" strokeWidth="2" />
            {growth >= 2 && <path d="M129 163 C154 153 175 159 190 174" fill="none" stroke="#A7F3D0" strokeOpacity=".7" strokeWidth="2" />}
          </g>
          <polygon points="120,42 158,74 134,132 106,121" fill={`url(#${id}-facet)`} />
          <polygon points="120,42 82,74 106,121 134,132" fill={`url(#${id}-core)`} />
          <polygon points="82,74 72,128 106,121" fill="#0E9F6E" />
          <polygon points="158,74 168,128 134,132" fill="#D97706" opacity=".9" />
          <path d="M120 42 L120 132" stroke="#F6F4EE" strokeOpacity=".35" strokeWidth="2" />
          {showShield && <polygon points="120,22 180,57 169,139 120,169 71,139 60,57" fill="none" stroke={`url(#${id}-gold)`} strokeOpacity=".42" strokeWidth="2" />}
          {showCrown && <path d="M120 19 L130 38 L151 40 L135 53 L139 76 L120 64 L101 76 L105 53 L89 40 L110 38 Z" fill={`url(#${id}-gold)`} filter={`url(#${id}-glow)`} />}
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0" style={{ transform: 'translateZ(95px)' }}>
        <span className={`absolute left-0 top-[12%] rounded-full border border-jade/30 bg-white/90 px-2.5 py-1 font-mono text-[9px] tracking-wide text-obsidian shadow-sm ${lowEndMode ? '' : 'backdrop-blur-md'}`}>KORU // STAGE {growth}/5</span>
        <span className={`absolute bottom-[14%] right-0 rounded-full border border-jade/30 bg-white/90 px-2.5 py-1 font-mono text-[9px] tracking-wide text-obsidian shadow-sm ${lowEndMode ? '' : 'backdrop-blur-md'}`}>₹100 SEED</span>
      </div>
    </div>
  );
}
