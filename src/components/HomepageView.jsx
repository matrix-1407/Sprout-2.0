import { ArrowRight, Check, Globe2, Layout, Sprout } from 'lucide-react';
import { useMemo, useState } from 'react';
import KoruAvatar3D from './ui/KoruAvatar3D';
import RollingCurrency from './ui/RollingCurrency';
import SpotlightCard from './ui/SpotlightCard';

export default function HomepageView({ copy, language, onLanguageChange, onContinue, lowEndMode, mobilePreview, onMobilePreviewChange }) {
  const [goalKey, setGoalKey] = useState('emergency');
  const [weekly, setWeekly] = useState(100);
  const goalEntries = Object.entries(copy.goals);
  const selectedGoal = copy.goals[goalKey];
  const contributed = weekly * 52 * 5;
  const illustrativeValue = Math.round(contributed * 1.325);
  const stage = useMemo(() => (weekly >= 850 ? 5 : weekly >= 600 ? 4 : weekly >= 350 ? 3 : weekly >= 200 ? 2 : 1), [weekly]);

  const chooseGoal = (key, amount) => {
    setGoalKey(key);
    setWeekly(amount);
  };

  return (
    <div className="min-h-screen bg-canvas pb-24 text-obsidian">
      <header className="sticky top-0 z-20 border-b border-hairline/80 bg-canvas/95 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-obsidian text-jade"><Sprout size={20} /></div>
            <div>
              <div className="flex flex-wrap items-center gap-2 font-semibold tracking-tight">{copy.brand}<span className="rounded-full bg-subtle px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-slate">{copy.regulated}</span></div>
              <p className="hidden text-xs text-slate sm:block">{copy.community}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onMobilePreviewChange(!mobilePreview)} className="hidden min-h-12 items-center gap-2 rounded-full border border-hairline bg-surface px-3 text-xs font-semibold md:flex"><Layout size={15} />{mobilePreview ? 'Desktop' : '390px Preview'}</button>
            <button type="button" onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')} className="flex min-h-12 items-center gap-2 rounded-full border border-hairline bg-surface px-4 text-sm font-semibold" aria-label="Switch language"><Globe2 size={16} />{language === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}</button>
          </div>
        </div>
        <div className="mx-auto mt-3 flex max-w-7xl items-center gap-2 rounded-lg bg-subtle px-3 py-2 text-xs text-slate sm:hidden"><span className="h-2 w-2 animate-pulse rounded-full bg-jade" />{copy.community}</div>
      </header>

      <div className={`mx-auto transition-all duration-300 ${mobilePreview ? 'max-w-[390px] border-x border-hairline bg-canvas shadow-2xl' : 'max-w-7xl'}`}>
        <main className="grid gap-8 px-4 py-10 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:py-16">
          <section className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[.14em] text-gold"><span className="h-2 w-2 animate-pulse rounded-full bg-jade" />{copy.eyebrow}</div>
            <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{copy.headline}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate">{copy.subtitle}</p>
            <div className="mt-8 grid gap-3">
              {goalEntries.map(([key, goal]) => {
                const amount = Number(goal.amount.replace(/[^\d]/g, ''));
                const selected = key === goalKey;
                return <SpotlightCard key={key} className={`p-0 ${selected ? 'border-obsidian bg-obsidian text-white' : ''}`}><button type="button" onClick={() => chooseGoal(key, amount)} className="flex min-h-14 w-full items-center justify-between p-4 text-left"><span><strong className="block">{goal.title}</strong><small className={selected ? 'text-white/70' : 'text-slate'}>{goal.detail}</small></span><span className="font-mono text-sm">{goal.amount}</span></button></SpotlightCard>;
              })}
            </div>
            <button type="button" onClick={() => onContinue({ key: goalKey, ...selectedGoal, weekly })} className="mt-5 flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-obsidian px-5 font-bold text-white shadow-lg shadow-obsidian/10">{copy.continue.replace('₹100', `₹${weekly}`)}<ArrowRight size={18} /></button>
            <p className="mt-3 rounded-lg bg-amber-100 px-4 py-3 text-sm text-obsidian">⏱ {copy.kycHint}</p>
          </section>

          <SpotlightCard className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-widest text-slate">KORU / {copy.stages[stage - 1]}</p><h2 className="mt-2 font-display text-2xl font-semibold">{language === 'en' ? 'A habit, made tangible.' : 'एक आदत, जिसे महसूस किया जा सके।'}</h2></div><KoruAvatar3D stage={stage} size="sm" lowEndMode={lowEndMode} /></div>
            <div className="mt-8"><div className="flex items-end justify-between"><label htmlFor="weekly" className="text-sm font-semibold">{language === 'en' ? 'Weekly habit' : 'साप्ताहिक आदत'}</label><RollingCurrency value={weekly} className="text-2xl font-bold" /></div><input id="weekly" aria-label="Weekly habit" className="mt-4 h-12 w-full accent-jade" type="range" min="100" max="1000" step="50" value={weekly} onChange={(event) => setWeekly(Number(event.target.value))} /><div className="mt-2 flex justify-between font-mono text-xs text-slate"><span>₹100</span><span>₹1,000</span></div></div>
            <div className="mt-7 grid grid-cols-2 gap-3 rounded-xl bg-canvas p-4"><div><p className="text-xs text-slate">{copy.totalContributed}</p><p className="mt-2 text-lg font-bold"><RollingCurrency value={contributed} /></p></div><div><p className="text-xs text-slate">{copy.estimatedValue}</p><p className="mt-2 text-lg font-bold text-jade"><RollingCurrency value={illustrativeValue} /></p></div></div>
            <div className="mt-6 grid gap-2 border-t border-hairline pt-5 text-xs text-slate sm:grid-cols-3">{copy.journey.map((item) => <div key={item} className="flex items-center gap-2"><Check size={14} className="shrink-0 text-jade" />{item}</div>)}</div>
          </SpotlightCard>
        </main>
        <section className="px-4 pb-12 sm:px-8"><div className="rounded-2xl bg-obsidian p-5 text-white sm:p-7"><p className="font-mono text-xs uppercase tracking-widest text-jade">{language === 'en' ? 'One connected story' : 'एक जुड़ी हुई कहानी'}</p><div className="mt-5 grid gap-4 sm:grid-cols-3">{copy.journey.map((item, index) => <div key={item} className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-sm text-jade">0{index + 1}</span><span className="text-sm">{item}</span></div>)}</div></div></section>
      </div>
    </div>
  );
}
