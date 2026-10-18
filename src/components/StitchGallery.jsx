import { ArrowRight, ExternalLink } from 'lucide-react';

const screens = [
  { title: 'English Desktop Prototype', path: '/stitch-screens/english-desktop.png', alt: 'English desktop Stitch reference' },
  { title: 'Hindi Devanagari Desktop Prototype', path: '/stitch-screens/hindi-desktop.png', alt: 'Hindi desktop Stitch reference' },
  { title: 'English Mobile Onboarding', path: '/stitch-screens/english-mobile.png', alt: 'English mobile Stitch reference' },
  { title: 'Hindi Mobile Onboarding', path: '/stitch-screens/hindi-mobile.png', alt: 'Hindi mobile Stitch reference' },
];

export default function StitchGallery({ onLaunch }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <div className="mb-8 max-w-2xl"><p className="font-mono text-xs font-bold uppercase tracking-widest text-gold">Stitch comparison archive</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Reference screens, now connected.</h1><p className="mt-3 text-slate">Compare the approved static directions with the unified interactive journey.</p></div>
      <div className="grid gap-6 md:grid-cols-2">
        {screens.map((screen) => <article key={screen.path} className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-sm"><div className="flex h-72 items-center justify-center overflow-hidden bg-subtle p-3"><img src={screen.path} alt={screen.alt} className="h-full w-full object-contain" /></div><div className="flex items-center justify-between gap-4 p-5"><h2 className="font-semibold">{screen.title}</h2><button type="button" onClick={onLaunch} className="flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-obsidian px-3 text-xs font-bold text-white">Launch Interactive Live Version <ArrowRight size={15} /></button></div></article>)}
      </div>
      <p className="mt-8 flex items-center gap-2 text-xs text-slate"><ExternalLink size={14} />Static artifacts are served from <code>public/stitch-screens/</code>.</p>
    </main>
  );
}
