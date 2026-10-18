import { useState } from 'react';
import { ArrowRight, Check, Globe2, Sprout } from 'lucide-react';
import KoruAvatar3D from './components/ui/KoruAvatar3D';
import RollingCurrency from './components/ui/RollingCurrency';
import SpotlightCard from './components/ui/SpotlightCard';
import { sproutCopy } from './config/sproutStore';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [weekly, setWeekly] = useState(100);
  const copy = sproutCopy[language];
  const contributed = weekly * 52 * 5;
  const illustrativeValue = Math.round(contributed * 1.325);

  return (
    <div lang={language} className="min-h-screen bg-canvas pb-24 text-obsidian">
      <header className="sticky top-0 z-10 border-b border-hairline/80 bg-canvas/90 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-obsidian text-jade"><Sprout size={20} /></div>
            <div>
              <div className="flex flex-wrap items-center gap-2 font-semibold tracking-tight">{copy.brand}<span className="rounded-full bg-subtle px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-slate">{copy.regulated}</span></div>
              <p className="hidden text-xs text-slate sm:block">{copy.community}</p>
            </div>
          </div>
          <button type="button" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} className="flex min-h-12 items-center gap-2 rounded-full border border-hairline bg-surface px-4 text-sm font-semibold" aria-label="Switch language">
            <Globe2 size={16} /> {language === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:py-20">
        <section className="flex flex-col justify-center">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[.14em] text-gold">{copy.eyebrow}</p>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">{copy.headline}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate">{copy.subtitle}</p>
          <div className="mt-8 grid gap-3">
            {Object.entries(copy.goals).map(([key, goal], index) => (
              <button key={key} type="button" className={`flex min-h-14 items-center justify-between rounded-xl border p-4 text-left transition ${index === 0 ? 'border-obsidian bg-obsidian text-white' : 'border-hairline bg-surface hover:border-jade'}`}>
                <span><strong className="block">{goal.title}</strong><small className={index === 0 ? 'text-white/70' : 'text-slate'}>{goal.detail}</small></span>
                <span className="font-mono text-sm">{goal.amount}</span>
              </button>
            ))}
          </div>
          <button type="button" className="mt-5 flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-obsidian px-5 font-bold text-white shadow-lg shadow-obsidian/10">{copy.continue}<ArrowRight size={18} /></button>
          <p className="mt-3 rounded-lg bg-amber-100 px-4 py-3 text-sm text-obsidian">{copy.kycHint}</p>
        </section>

        <SpotlightCard className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div><p className="font-mono text-xs uppercase tracking-widest text-slate">KORU / {copy.stages[0]}</p><h2 className="mt-2 font-display text-2xl font-semibold">A habit, made tangible.</h2></div>
            <KoruAvatar3D stage={1} size="sm" />
          </div>
          <div className="mt-8">
            <div className="flex items-end justify-between"><label htmlFor="weekly" className="text-sm font-semibold">Weekly habit</label><RollingCurrency value={weekly} className="text-2xl font-bold" /></div>
            <input id="weekly" className="mt-4 w-full accent-jade" type="range" min="100" max="1000" step="50" value={weekly} onChange={(event) => setWeekly(Number(event.target.value))} />
            <div className="mt-2 flex justify-between font-mono text-xs text-slate"><span>₹100</span><span>₹1,000</span></div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 rounded-xl bg-canvas p-4">
            <div><p className="text-xs text-slate">{copy.totalContributed}</p><p className="mt-2 text-lg font-bold"><RollingCurrency value={contributed} /></p></div>
            <div><p className="text-xs text-slate">{copy.estimatedValue}</p><p className="mt-2 text-lg font-bold text-jade"><RollingCurrency value={illustrativeValue} /></p></div>
          </div>
          <div className="mt-6 grid gap-2 border-t border-hairline pt-5 text-xs text-slate sm:grid-cols-3">
            {copy.journey.map((item) => <div key={item} className="flex items-center gap-2"><Check size={14} className="shrink-0 text-jade" />{item}</div>)}
          </div>
        </SpotlightCard>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-20 bg-obsidian px-4 py-3 text-[12.5px] text-[#E7E5DC] sm:px-8"><div className="mx-auto max-w-7xl">{copy.disclaimer}</div></footer>
    </div>
  );
}
