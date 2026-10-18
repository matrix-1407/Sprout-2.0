import { ArrowDown, ArrowRight, Languages, Sprout } from 'lucide-react';

export default function LandingPage({ copy, language, onEnter, onLanguageChange, exiting = false }) {
  return (
    <main onWheel={(event) => { if (event.deltaY > 0) onEnter(); }} className={`landing-page min-h-[calc(100svh-2rem)] px-5 pb-16 pt-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-10 lg:px-16 ${exiting ? '-translate-y-8 scale-[.985]' : 'translate-y-0 scale-100'}`}>
      <div className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-between">
        <header className="flex items-center justify-between">
          <button type="button" onClick={onEnter} className="flex min-h-12 items-center gap-3 text-left" aria-label={copy.brand}>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-obsidian text-jade">
              <Sprout size={20} aria-hidden="true" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <span className="font-semibold">{copy.brand}</span>
          </button>
          <button type="button" onClick={onLanguageChange} aria-label="Switch landing language" className="flex min-h-12 items-center gap-2 rounded-full border border-hairline bg-white/70 px-4 text-xs font-semibold backdrop-blur-md">
            <Languages size={15} aria-hidden="true" />{language === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}
          </button>
        </header>

        <section className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[.24em] text-gold">A quieter beginning to investing</p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[.98] tracking-[-.045em] sm:text-7xl lg:text-[6.5rem]">
              Start small.<br /><span className="text-jade">Grow with clarity.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate">{copy.subtitle}</p>
            <button type="button" onClick={onEnter} className="mt-9 flex min-h-14 items-center gap-3 rounded-full bg-obsidian px-6 font-bold text-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(10,33,24,.2)]">
              Begin with ₹100 <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="landing-orbit relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,.22),rgba(217,119,6,.08)_44%,transparent_72%)]" />
            <div className="absolute inset-[12%] rounded-full border border-jade/20" />
            <div className="absolute inset-[23%] rounded-full border border-gold/30 [transform:rotateX(68deg)_rotateZ(-24deg)]" />
            <div className="relative flex h-32 w-24 items-end justify-center sm:h-40 sm:w-28">
              <span className="absolute bottom-0 h-32 w-2 rounded-full bg-gradient-to-b from-jade to-forest sm:h-40" />
              <span className="absolute bottom-[40%] left-0 h-20 w-16 -rotate-[25deg] rounded-[100%_0_100%_0] bg-gradient-to-br from-emerald-300 via-jade to-forest sm:h-24 sm:w-20" />
              <span className="absolute bottom-[40%] right-0 h-20 w-16 rotate-[25deg] rounded-[0_100%_0_100%] bg-gradient-to-bl from-gold via-jade to-forest sm:h-24 sm:w-20" />
              <span className="absolute top-0 h-24 w-24 rotate-45 rounded-[8px] bg-gradient-to-br from-emerald-200 via-jade to-obsidian shadow-[12px_16px_20px_rgba(10,33,24,.18)] sm:h-28 sm:w-28" />
            </div>
            <span className="absolute right-0 top-[18%] rounded-full border border-jade/30 bg-white/80 px-3 py-2 font-mono text-[10px] text-forest">KORU / 01</span>
          </div>
        </section>

        <button type="button" onClick={onEnter} className="flex min-h-12 items-center gap-2 self-center font-mono text-[10px] uppercase tracking-[.18em] text-slate">
          Explore the connected journey <ArrowDown size={14} aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
