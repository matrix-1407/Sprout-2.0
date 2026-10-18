import { useEffect, useRef } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function KoruAvatar3D({ stage = 1, lowEndMode = false, size = 'md' }) {
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0, scale: 1 });
  const current = useRef({ x: 0, y: 0, scale: 1 });
  const root = useRef(null);
  const stageValue = clamp(Number(stage) || 1, 1, 5);
  const dimension = size === 'sm' ? 'h-24 w-24' : 'h-36 w-36';

  useEffect(() => {
    const element = root.current;
    const canTrack = !lowEndMode && window.innerWidth >= 768 && window.matchMedia('(hover: hover)').matches;
    if (!element || !canTrack) return undefined;

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      current.current.scale += (target.current.scale - current.current.scale) * 0.12;
      element.style.setProperty('--koru-transform', `perspective(900px) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg) scale3d(${current.current.scale},${current.current.scale},1)`);
      frame.current = requestAnimationFrame(animate);
    };
    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const strength = clamp(1 - distance / 340, 0, 1);
      target.current = { x: clamp(dx / 18, -10, 10) * strength, y: clamp(-dy / 18, -10, 10) * strength, scale: 1 + strength * 0.035 };
      element.style.setProperty('--spot-x', `${clamp((dx / rect.width + 0.5) * 100, 0, 100)}%`);
      element.style.setProperty('--spot-y', `${clamp((dy / rect.height + 0.5) * 100, 0, 100)}%`);
    };
    element.addEventListener('mousemove', onMove, { passive: true });
    frame.current = requestAnimationFrame(animate);
    return () => {
      element.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame.current);
    };
  }, [lowEndMode]);

  return (
    <div ref={root} aria-label={`Koru growth stage ${stageValue}`} className={`${dimension} relative shrink-0 overflow-hidden rounded-2xl bg-obsidian p-3 shadow-lg ${lowEndMode ? 'koru-float' : ''}`} style={{ transform: 'var(--koru-transform, translate3d(0, 0, 0))', transition: 'transform 180ms ease-out', transformStyle: 'preserve-3d' }}>
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: 'radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 35%), rgba(217,119,6,.42), transparent 38%)' }} />
      <svg className="relative h-full w-full" viewBox="0 0 144 144" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="jadeFacet" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#5EE7B7" /><stop offset="1" stopColor="#087F5B" /></linearGradient>
          <linearGradient id="goldFacet" x1="0" x2="1"><stop stopColor="#FBBF24" /><stop offset="1" stopColor="#B45309" /></linearGradient>
        </defs>
        <ellipse cx="72" cy="124" rx="47" ry="9" fill="#06150F" />
        {stageValue >= 3 && <polygon points="72,27 105,45 98,78 72,92 46,78 39,45" fill="none" stroke="#D97706" strokeOpacity=".7" strokeWidth="2" />}
        {stageValue >= 4 && [0, 1, 2].map((ring) => <circle key={ring} cx="72" cy="74" r={28 + ring * 9} fill="none" stroke="#10B981" strokeOpacity={0.36 - ring * 0.08} strokeWidth="1.5" />)}
        <path d="M68 111 C68 96 70 86 72 72" fill="none" stroke="#10B981" strokeLinecap="round" strokeWidth="7" />
        <polygon points="72,31 92,47 79,73 65,67" fill="url(#goldFacet)" />
        <polygon points="72,31 52,47 65,67 79,73" fill="#F59E0B" />
        <polygon points="52,47 47,77 65,67" fill="url(#jadeFacet)" />
        <polygon points="92,47 97,77 79,73" fill="#0E9F6E" />
        <polygon points="47,77 72,93 65,67" fill="#087F5B" />
        <polygon points="97,77 72,93 79,73" fill="#34D399" />
        {stageValue >= 2 && <path d="M68 93 C53 90 45 101 47 111 C55 105 62 105 70 107" fill="none" stroke="#10B981" strokeLinecap="round" strokeWidth="4" />}
        {stageValue >= 5 && <><path d="M70 76 C48 61 35 66 29 80 C46 79 57 84 70 92" fill="url(#jadeFacet)" /><path d="M74 76 C96 61 109 66 115 80 C98 79 87 84 74 92" fill="#10B981" /><polygon points="72,20 77,28 87,29 79,36 81,46 72,41 63,46 65,36 57,29 67,28" fill="url(#goldFacet)" /></>}
      </svg>
    </div>
  );
}
