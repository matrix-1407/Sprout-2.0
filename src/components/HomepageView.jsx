import { ArrowRight, Check, ChevronRight, Sprout } from 'lucide-react';
import { useMemo, useState } from 'react';
import InfiniteTrustTicker from './ui/InfiniteTrustTicker';
import KoruTerrarium3D from './ui/KoruTerrarium3D';
import RollingOdometer from './ui/RollingOdometer';
import ScrollReveal from './ui/ScrollReveal';
import SpotlightCard from './ui/SpotlightCard';

export default function HomepageView({ copy, language, onContinue, lowEndMode, mobilePreview, onMobilePreviewChange }) {
  const [goalKey, setGoalKey] = useState('emergency');
  const [weekly, setWeekly] = useState(100);
  const goalEntries = Object.entries(copy.goals);
  const selectedGoal = copy.goals[goalKey];
  const contributed = weekly * 52 * 5;
  const illustrativeValue = Math.round(contributed * 1.325);
  const stage = useMemo(() => (weekly >= 850 ? 5 : weekly >= 600 ? 4 : weekly >= 350 ? 3 : weekly >= 200 ? 2 : 1), [weekly]);
  const isMobile = mobilePreview;
  const chooseGoal = (key, amount) => { setGoalKey(key); setWeekly(amount); };

  return <div className="min-h-screen bg-canvas pb-0 text-obsidian">
    <header className="border-b border-hairline/80 bg-canvas px-4 py-5 sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian text-jade"><Sprout size={21} /></div><div><div className="flex flex-wrap items-center gap-2 font-semibold tracking-tight">{copy.brand}<span className="rounded-full bg-subtle px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-slate">{copy.regulated}</span></div><p className="mt-1 text-xs text-slate">{copy.community}</p></div></div>
    </header>

    <div className={`mx-auto transition-all duration-300 ${isMobile ? 'max-w-[390px] border-x border-hairline' : 'max-w-7xl'}`}>
      <ScrollReveal lowEndMode={lowEndMode}><main className={isMobile ? 'flex flex-col gap-6 p-5' : 'grid grid-cols-1 items-center gap-12 p-8 lg:grid-cols-12 lg:p-14'}>
        <section className={isMobile ? 'flex flex-col' : 'lg:col-span-7'}>
          <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[.14em] text-gold"><span className="h-2 w-2 animate-pulse rounded-full bg-jade" />{copy.eyebrow}</div>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{copy.headline}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate">{copy.subtitle}</p>
          <div className="mt-8 grid gap-3">
            {goalEntries.map(([key, goal]) => {
              const amount = Number(goal.amount.replace(/[^\d]/g, ''));
              const selected = key === goalKey;
              return <SpotlightCard key={key} className="p-0"><button type="button" onClick={() => chooseGoal(key, amount)} style={{ backgroundColor: selected ? '#0A2118' : '#FFFFFF', color: selected ? '#FFFFFF' : '#0A2118' }} className="flex min-h-[56px] w-full items-center justify-between rounded-2xl p-4 text-left"><span><strong className="block">{goal.title}</strong><small style={{ color: selected ? '#A7F3D0' : '#475569' }}>{goal.detail}</small></span><span className={`rounded-full border px-3 py-1 font-mono text-sm ${selected ? 'border-[#10B981]/40 bg-[#10B981]/20 text-[#6EE7B7]' : 'border-hairline bg-subtle'}`}>{goal.amount}</span></button></SpotlightCard>;
            })}
          </div>
          <button type="button" onClick={() => onContinue({ key: goalKey, ...selectedGoal, weekly })} className="mt-5 flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-obsidian px-5 font-bold text-white transition hover:shadow-[0_0_0_4px_rgba(16,185,129,.16)]">{copy.continue.replace(' →', '')}<ArrowRight size={18} /></button>
          <p className="mt-3 rounded-lg bg-amber-100 px-4 py-3 text-sm text-obsidian">⏱ {copy.kycHint}</p>
        </section>
        <section className={isMobile ? 'flex flex-col' : 'lg:col-span-5'}>
          <SpotlightCard className={isMobile ? 'p-4' : 'p-5 sm:p-7'}><KoruTerrarium3D stage={stage} weeklyAmount={weekly} lowEndMode={lowEndMode || isMobile} /><div className="mt-6"><div className="flex items-end justify-between gap-3"><label htmlFor="weekly" className="text-sm font-semibold">{language === 'en' ? 'Weekly habit' : 'साप्ताहिक आदत'}</label><span className="font-mono text-2xl font-bold tabular-nums">₹{weekly.toLocaleString('en-IN')}</span></div><input id="weekly" aria-label="Weekly habit" className="mt-4 h-12 w-full accent-jade" type="range" min="100" max="1000" step="50" value={weekly} onChange={(event) => setWeekly(Number(event.target.value))} /><div className="mt-2 flex justify-between font-mono text-xs text-slate"><span>₹100</span><span>₹1,000</span></div></div><RollingOdometer principal={contributed} value={illustrativeValue} /></SpotlightCard>
        </section>
      </main></ScrollReveal>

      <ScrollReveal delay={100} lowEndMode={lowEndMode}><section><InfiniteTrustTicker /></section></ScrollReveal>

      <ScrollReveal delay={100} lowEndMode={lowEndMode}><section className="px-5 py-16 sm:px-8"><div className="mb-8 max-w-2xl"><p className="font-mono text-xs font-bold uppercase tracking-widest text-gold">Why 65% feel stuck</p><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{language === 'en' ? 'A calmer way to begin.' : 'शुरुआत करने का एक शांत तरीका।'}</h2></div><div className={isMobile ? 'flex flex-col gap-4' : 'grid gap-4 md:grid-cols-3'}><SpotlightCard className="p-6"><p className="font-mono text-xs text-jade">01 / NO JARGON</p><h3 className="mt-4 text-xl font-semibold">Start with ₹100, not a terminal.</h3><p className="mt-3 text-sm leading-6 text-slate">A focused goal replaces intimidating charts and clutter.</p></SpotlightCard><SpotlightCard className="p-6"><p className="font-mono text-xs text-gold">02 / GUIDED KYC</p><h3 className="mt-4 text-xl font-semibold">Know what to keep nearby.</h3><p className="mt-3 text-sm leading-6 text-slate">A readiness checklist makes the regulated handoff feel clear.</p></SpotlightCard><SpotlightCard className="p-6"><p className="font-mono text-xs text-jade">03 / PERFORMANCE</p><h3 className="mt-4 text-xl font-semibold">158 KB, built for 4G.</h3><p className="mt-3 text-sm leading-6 text-slate">A lightweight experience for budget Android devices.</p><div className="mt-5 h-2 rounded-full bg-subtle"><div className="h-full w-[11%] rounded-full bg-jade" /></div><p className="mt-2 font-mono text-xs text-slate">89% lighter than the 1.5 MB limit</p></SpotlightCard></div></section></ScrollReveal>

      <ScrollReveal delay={150} lowEndMode={lowEndMode}><section className="px-5 pb-16 sm:px-8"><div className="rounded-2xl bg-obsidian p-6 text-white sm:p-8"><p className="font-mono text-xs uppercase tracking-widest text-jade">One connected story</p><h2 className="mt-3 font-display text-3xl font-semibold">From first seed to first bloom.</h2><div className={isMobile ? 'mt-6 flex flex-col gap-3' : 'mt-6 grid gap-3 md:grid-cols-3'}>{copy.journey.map((item, index) => <button type="button" key={item} onClick={() => onContinue({ key: index === 0 ? 'emergency' : index === 1 ? 'milestone' : 'wealth', ...copy.goals[index === 0 ? 'emergency' : index === 1 ? 'milestone' : 'wealth'], weekly: index === 0 ? 100 : index === 1 ? 250 : 500 })} className="flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-mono text-sm text-jade">0{index + 1}</span><span className="flex-1 text-sm">{item}</span>{index < 2 ? <ChevronRight size={16} /> : <Check size={16} className="text-jade" />}</button>)}</div></div></section></ScrollReveal>
      <div className="flex justify-center pb-6"><button type="button" onClick={() => onMobilePreviewChange(!mobilePreview)} className="min-h-12 rounded-full border border-hairline bg-surface px-4 text-xs font-semibold">{isMobile ? 'Return to Desktop View' : 'Preview 390px Mobile Flow'}</button></div>
    </div>
  </div>;
}
