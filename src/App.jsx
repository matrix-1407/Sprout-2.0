import { useState } from 'react';
import DirectorDock from './components/DirectorDock';
import HomepageView from './components/HomepageView';
import OnboardingFlow from './components/OnboardingFlow';
import StickyComplianceBar from './components/StickyComplianceBar';
import StitchGallery from './components/StitchGallery';
import { sproutCopy } from './config/sproutStore';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [surface, setSurface] = useState('home');
  const [mobilePreview, setMobilePreview] = useState(false);
  const [lowEndMode, setLowEndMode] = useState(false);
  const [showCallouts, setShowCallouts] = useState(false);
  const [goal, setGoal] = useState({ key: 'emergency', title: sproutCopy.en.goals.emergency.title, amount: sproutCopy.en.goals.emergency.amount, detail: sproutCopy.en.goals.emergency.detail, weekly: 100 });
  const copy = sproutCopy[language];
  const toggleLanguage = () => setLanguage((value) => (value === 'en' ? 'hi' : 'en'));

  const handleContinue = (selectedGoal) => {
    setGoal({ ...selectedGoal, title: sproutCopy[language].goals[selectedGoal.key].title, detail: sproutCopy[language].goals[selectedGoal.key].detail, amount: sproutCopy[language].goals[selectedGoal.key].amount });
    setSurface('onboarding');
  };

  const handleSurface = (nextSurface) => setSurface(nextSurface);
  const launchInteractive = () => setSurface('home');

  return (
    <div lang={language} className={showCallouts ? 'xray-mode' : ''}>
      <DirectorDock copy={copy} surface={surface} onSurfaceChange={handleSurface} language={language} onLanguageChange={toggleLanguage} mobilePreview={mobilePreview} onMobilePreviewChange={setMobilePreview} lowEndMode={lowEndMode} onLowEndModeChange={setLowEndMode} showCallouts={showCallouts} onCalloutsChange={setShowCallouts} />
      {surface === 'home' && <HomepageView copy={copy} language={language} onLanguageChange={setLanguage} onContinue={handleContinue} lowEndMode={lowEndMode} mobilePreview={mobilePreview} onMobilePreviewChange={setMobilePreview} />}
      {surface === 'onboarding' && <OnboardingFlow copy={copy} language={language} goal={goal} onBackHome={() => setSurface('home')} onLanguageChange={toggleLanguage} lowEndMode={lowEndMode} />}
      {surface === 'gallery' && <StitchGallery onLaunch={launchInteractive} />}
      {showCallouts && <aside className="border-b border-gold bg-amber-50 px-4 py-3 text-xs text-obsidian sm:px-8" data-testid="stakeholder-callouts"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2"><p className="font-mono font-bold uppercase tracking-widest text-gold">Stakeholder X-Ray</p><span><strong>CEO:</strong> calm craft</span><span><strong>Marketing:</strong> bloom referral</span><span><strong>Compliance:</strong> audited footer</span><span><strong>Dev:</strong> low-end mode</span><span><strong>Support:</strong> recovery states</span></div></aside>}
      <StickyComplianceBar copy={copy} language={language} />
    </div>
  );
}
