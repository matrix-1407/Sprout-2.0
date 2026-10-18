import { useEffect, useState } from 'react';
import HomepageView from './components/HomepageView';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import OnboardingFlow from './components/OnboardingFlow';
import StickyComplianceBar from './components/StickyComplianceBar';
import { sproutCopy } from './config/sproutStore';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [surface, setSurface] = useState('home');
  const [entry, setEntry] = useState(true);
  const [landingExiting, setLandingExiting] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [lowEndMode, setLowEndMode] = useState(false);
  const [deviceLowEnd, setDeviceLowEnd] = useState(false);
  const [goal, setGoal] = useState({ key: 'emergency', title: sproutCopy.en.goals.emergency.title, amount: sproutCopy.en.goals.emergency.amount, detail: sproutCopy.en.goals.emergency.detail, weekly: 100 });
  const copy = sproutCopy[language];
  const toggleLanguage = () => setLanguage((value) => (value === 'en' ? 'hi' : 'en'));

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (min-width: 768px)');
    const update = () => setDeviceLowEnd(!query.matches);
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (surface === 'home' && !entry) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [surface]);

  const continueToApp = (selectedGoal) => {
    setGoal({ ...selectedGoal, title: sproutCopy[language].goals[selectedGoal.key].title, detail: sproutCopy[language].goals[selectedGoal.key].detail, amount: sproutCopy[language].goals[selectedGoal.key].amount });
    setSurface('onboarding');
  };

  const optimizedMode = lowEndMode || deviceLowEnd;
  const enterExperience = () => {
    if (landingExiting) return;
    setLandingExiting(true);
    window.setTimeout(() => {
      setEntry(false);
      window.requestAnimationFrame(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }, 650);
  };

  return <div lang={language} className="min-h-screen overflow-x-hidden bg-canvas text-obsidian">
    {entry && <div className={`fixed inset-0 z-[60] overflow-hidden bg-canvas transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${landingExiting ? 'pointer-events-none opacity-0' : 'opacity-100'}`}><LandingPage copy={copy} language={language} onEnter={enterExperience} onLanguageChange={toggleLanguage} exiting={landingExiting} /></div>}
    <Navbar copy={copy} language={language} surface={surface} mobilePreview={mobilePreview} onSurfaceHome={() => { setEntry(false); setSurface('home'); }} onMobilePreviewChange={setMobilePreview} onLanguageChange={toggleLanguage} />
    {surface === 'home' && <HomepageView copy={copy} language={language} onContinue={continueToApp} lowEndMode={optimizedMode} mobilePreview={mobilePreview} onMobilePreviewChange={setMobilePreview} />}
    {surface === 'onboarding' && <OnboardingFlow copy={copy} language={language} goal={goal} onBackHome={() => setSurface('home')} onLanguageChange={toggleLanguage} lowEndMode={optimizedMode} />}
    <StickyComplianceBar copy={copy} language={language} />
  </div>;
}
