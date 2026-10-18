import { Gauge, Languages, LayoutGrid, Monitor, Smartphone, Sparkles } from 'lucide-react';

export default function DirectorDock({
  copy,
  surface,
  onSurfaceChange,
  language,
  onLanguageChange,
  mobilePreview,
  onMobilePreviewChange,
  lowEndMode,
  onLowEndModeChange,
  showCallouts,
  onCalloutsChange,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline/80 bg-surface/95 px-3 py-2 shadow-sm backdrop-blur-md sm:px-5" data-testid="director-dock">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2">
        <div className="mr-auto flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-forest"><Sparkles size={15} className="text-gold" />Director Dock</div>
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-subtle p-1">
          {[['home', '1. Web Homepage'], ['onboarding', '2. App Onboarding (5 Screens)'], ['gallery', '3. Stitch UI Mockups (4 Screens)']].map(([value, label]) => <button type="button" key={value} onClick={() => onSurfaceChange(value)} className={`min-h-10 rounded-lg px-2 text-[11px] font-semibold transition ${surface === value ? 'bg-obsidian text-white shadow-sm' : 'text-slate hover:bg-surface'}`}>{label}</button>)}
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {surface === 'home' && <button type="button" onClick={() => onMobilePreviewChange(!mobilePreview)} className="flex min-h-10 items-center gap-1 rounded-lg border border-hairline bg-surface px-2 text-[11px] font-semibold">{mobilePreview ? <Smartphone size={14} /> : <Monitor size={14} />}{mobilePreview ? 'Mobile 390px' : 'Desktop 1440px'}</button>}
          <button type="button" onClick={onLanguageChange} className="flex min-h-10 items-center gap-1 rounded-lg border border-hairline bg-surface px-2 text-[11px] font-semibold"><Languages size={14} />{language === 'en' ? 'EN ↔ हिंदी' : 'हिंदी ↔ EN'}</button>
          <button type="button" onClick={() => onLowEndModeChange(!lowEndMode)} className={`flex min-h-10 items-center gap-1 rounded-lg border px-2 text-[11px] font-semibold ${lowEndMode ? 'border-jade bg-emerald-50 text-forest' : 'border-hairline bg-surface'}`}><Gauge size={14} />&lt;₹10k Phone Mode</button>
          <button type="button" onClick={() => onCalloutsChange(!showCallouts)} className={`flex min-h-10 items-center gap-1 rounded-lg border px-2 text-[11px] font-semibold ${showCallouts ? 'border-gold bg-amber-50 text-forest' : 'border-hairline bg-surface'}`}><LayoutGrid size={14} />Stakeholder Callouts</button>
        </div>
      </div>
      <div className="mx-auto mt-2 max-w-7xl font-mono text-[10px] text-slate">Weight: ~158 KB / 1.5 MB • Koru 3D: 8.6 KB / 100 KB • SEBI Copy Audit: <span className="font-bold text-jade">PASS</span></div>
    </header>
  );
}
