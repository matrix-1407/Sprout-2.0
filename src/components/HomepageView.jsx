import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import InfiniteTrustTicker from './ui/InfiniteTrustTicker';
import KoruAvatar3D from './ui/KoruAvatar3D';
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

  return <div className="min-h-screen bg-canvas text-obsidian">
    <div className={`mx-auto transition-all duration-300 ${isMobile ? 'max-w-[390px] border-x border-hairline' : 'max-w-7xl'}`}>
      <ScrollReveal lowEndMode={lowEndMode}>
        <main id="overview" aria-label="Sprout landing and hero" className={`relative isolate flex min-h-[calc(100svh-6rem)] items-center overflow-hidden ${isMobile ? 'flex-col gap-8 px-5 pb-12 pt-8' : 'grid grid-cols-1 gap-8 px-8 pb-20 pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(390px,.95fr)] lg:gap-16 lg:px-14 lg:py-20'}`}>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_35%,rgba(16,185,129,.16),transparent_28%),radial-gradient(circle_at_18%_75%,rgba(217,119,6,.08),transparent_30%)]" />
          <section className="relative z-10">
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[.24em] text-gold">01 / Landing</div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-jade/30 bg-white/70 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[.12em] text-forest shadow-sm"><span className="h-2 w-2 animate-pulse rounded-full bg-jade" />{copy.eyebrow}</div>
            <h1 className="max-w-3xl font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-.035em] sm:text-6xl lg:text-[4.65rem]">{copy.headline}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate">{copy.subtitle}</p>
            <div className="mt-9 grid gap-3">
              {goalEntries.map(([key, goal]) => {
                const amount = Number(goal.amount.replace(/[^\d]/g, ''));
                const selected = key === goalKey;
                return <SpotlightCard key={key} className={`p-0 ${selected ? 'border-jade shadow-[0_0_0_3px_rgba(16,185,129,.12)]' : ''}`}><button type="button" onClick={() => chooseGoal(key, amount)} aria-pressed={selected} style={{ backgroundColor: selected ? '#0A2118' : '#FFFFFF', color: selected ? '#FFFFFF' : '#0A2118' }} className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-2xl p-4 text-left transition-transform duration-300 hover:-translate-y-0.5"><span className="min-w-0"><strong className="block">{goal.title}</strong><small style={{ color: selected ? '#A7F3D0' : '#475569' }} className="block truncate">{goal.detail}</small></span><span className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-sm ${selected ? 'border-jade/50 bg-jade/20 text-emerald-100' : 'border-hairline bg-subtle text-obsidian'}`}>{goal.amount}</span></button></SpotlightCard>;
              })}
            </div>
            <button type="button" onClick={() => onContinue({ key: goalKey, ...selectedGoal, weekly })} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-obsidian px-5 font-bold text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(10,33,24,.2)] sm:w-fit">{copy.continue.replace(' →', '')}<ArrowRight size={18} /></button>
            <p className="mt-3 inline-flex rounded-lg bg-amber-100 px-4 py-3 text-sm text-obsidian">⏱ {copy.kycHint}</p>
          </section>

          <section className="relative flex min-w-0 flex-col items-center">
            <div className="koru-hero-stage relative flex w-full items-center justify-center">
              <KoruAvatar3D stage={stage} weeklyAmount={weekly} lowEndMode={lowEndMode || isMobile} size="md" />
            </div>
            <SpotlightCard id="habit-simulator" className="relative z-10 mt-[-1rem] w-full max-w-[470px] p-5 sm:p-7">
              <div className="flex items-end justify-between gap-3"><label htmlFor="weekly" className="text-sm font-semibold">{language === 'en' ? 'Weekly habit' : 'साप्ताहिक आदत'}</label><span className="font-mono text-2xl font-bold tabular-nums">₹{weekly.toLocaleString('en-IN')}</span></div>
              <input id="weekly" aria-label="Weekly habit" className="mt-4 h-12 w-full accent-jade" type="range" min="100" max="1000" step="50" value={weekly} onChange={(event) => setWeekly(Number(event.target.value))} />
              <div className="mt-2 flex justify-between font-mono text-xs text-slate"><span>₹100</span><span>₹1,000</span></div>
              <RollingOdometer principal={contributed} value={illustrativeValue} />
            </SpotlightCard>
          </section>
        </main>
      </ScrollReveal>

      <ScrollReveal delay={100} lowEndMode={lowEndMode}><section id="security" aria-label="Trust and regulatory signals"><InfiniteTrustTicker /></section></ScrollReveal>

      <ScrollReveal delay={100} lowEndMode={lowEndMode}><section id="calculator" className="px-5 py-16 sm:px-8"><div className="mb-8 max-w-2xl"><p className="font-mono text-xs font-bold uppercase tracking-widest text-gold">A clearer starting point</p><h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{language === 'en' ? 'A calmer way to begin.' : 'शुरुआत करने का एक शांत तरीका।'}</h2></div><div className={isMobile ? 'flex flex-col gap-4' : 'grid gap-4 md:grid-cols-3'}><SpotlightCard className="p-6 transition-transform duration-300 hover:-translate-y-1"><p className="font-mono text-xs text-jade">01 / NO JARGON</p><h3 className="mt-4 text-xl font-semibold">Start with ₹100, not a terminal.</h3><p className="mt-3 text-sm leading-6 text-slate">A focused goal replaces intimidating charts and clutter.</p></SpotlightCard><SpotlightCard className="p-6 transition-transform duration-300 hover:-translate-y-1"><p className="font-mono text-xs text-gold">02 / GUIDED KYC</p><h3 className="mt-4 text-xl font-semibold">Know what to keep nearby.</h3><p className="mt-3 text-sm leading-6 text-slate">A readiness checklist makes the regulated handoff feel clear.</p></SpotlightCard><SpotlightCard className="p-6 transition-transform duration-300 hover:-translate-y-1"><p className="font-mono text-xs text-jade">03 / LIGHTWEIGHT FLOW</p><h3 className="mt-4 text-xl font-semibold">Made for everyday connections.</h3><p className="mt-3 text-sm leading-6 text-slate">A focused interface keeps the journey responsive on mobile.</p></SpotlightCard></div></section></ScrollReveal>

      <ScrollReveal delay={150} lowEndMode={lowEndMode}><section id="journey" className="px-5 pb-16 sm:px-8"><div className="rounded-2xl bg-obsidian p-6 text-white sm:p-8"><p className="font-mono text-xs uppercase tracking-widest text-jade">One connected story</p><h2 className="mt-3 font-display text-3xl font-semibold">From first seed to first bloom.</h2><div className={isMobile ? 'mt-6 flex flex-col gap-3' : 'mt-6 grid gap-3 md:grid-cols-3'}>{copy.journey.map((item, index) => <button type="button" key={item} onClick={() => onContinue({ key: index === 0 ? 'emergency' : index === 1 ? 'milestone' : 'wealth', ...copy.goals[index === 0 ? 'emergency' : index === 1 ? 'milestone' : 'wealth'], weekly: index === 0 ? 100 : index === 1 ? 250 : 500 })} className="flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-mono text-sm text-jade">0{index + 1}</span><span className="flex-1 text-sm">{item}</span>{index < 2 ? <ChevronRight size={16} /> : <Check size={16} className="text-jade" />}</button>)}</div></div></section></ScrollReveal>
      <div className="flex justify-center pb-6"><button type="button" onClick={() => onMobilePreviewChange(!mobilePreview)} className="min-h-12 rounded-full border border-hairline bg-surface px-4 text-xs font-semibold">{isMobile ? 'Return to Desktop View' : 'Preview 390px Mobile Flow'}</button></div>
    </div>
  </div>;
}
