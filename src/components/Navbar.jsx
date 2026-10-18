import { Languages, Monitor, Smartphone, Sprout } from 'lucide-react';

export default function Navbar({ copy, language, surface, mobilePreview, onSurfaceHome, onMobilePreviewChange, onLanguageChange }) {
  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
      <div className="flex min-h-[68px] items-center justify-between gap-4 rounded-2xl border border-hairline bg-white/80 px-4 shadow-[0_8px_32px_rgba(10,33,24,0.08)] backdrop-blur-xl sm:px-5">
        <button type="button" onClick={onSurfaceHome} className="flex min-h-12 shrink-0 items-center gap-3 text-left" aria-label={`${copy.brand} ${copy.regulated}`}>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-[12px] bg-obsidian text-jade">
            <Sprout size={19} aria-hidden="true" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold" />
          </span>
          <span>
            <span className="block font-semibold tracking-tight">{copy.brand}</span>
            <span className="hidden items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate sm:flex">
              <span className="rounded-full border border-jade/30 bg-emerald-50 px-2 py-1 text-[9px] text-forest">SEBI Regulated</span>
            </span>
          </span>
        </button>
        {surface === 'home' && <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {[
            ['#overview', 'Overview'],
            ['#calculator', 'Calculator'],
            ['#security', 'Security'],
            ['#journey', 'Journey'],
          ].map(([href, label]) => <button key={href} type="button" onClick={() => jumpTo(href.slice(1))} className="rounded-full px-3 py-2 text-xs font-semibold text-slate transition-colors hover:bg-subtle hover:text-obsidian">{label}</button>)}
        </nav>}
        <div className="flex items-center gap-2">
          {surface === 'home' && <button type="button" onClick={() => onMobilePreviewChange(!mobilePreview)} aria-label={mobilePreview ? 'Switch to desktop view' : 'Switch to 390px mobile view'} className="flex min-h-12 items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 text-xs font-semibold transition-transform hover:scale-[1.03]">
            {mobilePreview ? <Smartphone size={14} aria-hidden="true" /> : <Monitor size={14} aria-hidden="true" />}<span className="hidden xl:inline">{mobilePreview ? '390px Mobile' : 'Desktop'}</span>
          </button>}
          <button type="button" onClick={onLanguageChange} aria-label="EN ↔ हिंदी" className="flex min-h-12 items-center gap-2 rounded-full border border-hairline bg-surface px-3 text-xs font-semibold transition-transform hover:scale-[1.03]">
            <Languages size={15} aria-hidden="true" /><span className="hidden sm:inline">{language === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}</span><span className="sm:hidden">{language === 'en' ? 'EN' : 'हि'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
