import { useState } from 'react';
import HomepageView from './components/HomepageView';
import OnboardingFlow from './components/OnboardingFlow';
import { sproutCopy } from './config/sproutStore';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [view, setView] = useState('home');
  const [goal, setGoal] = useState({ key: 'emergency', title: sproutCopy.en.goals.emergency.title, amount: sproutCopy.en.goals.emergency.amount, detail: sproutCopy.en.goals.emergency.detail, weekly: 100 });
  const copy = sproutCopy[language];
  const setAppLanguage = (nextLanguage) => setLanguage(typeof nextLanguage === 'string' ? nextLanguage : (language === 'en' ? 'hi' : 'en'));

  const handleContinue = (selectedGoal) => {
    setGoal({ ...selectedGoal, title: sproutCopy[language].goals[selectedGoal.key].title, detail: sproutCopy[language].goals[selectedGoal.key].detail, amount: sproutCopy[language].goals[selectedGoal.key].amount });
    setView('onboarding');
  };

  return view === 'home'
    ? <HomepageView copy={copy} language={language} onLanguageChange={setAppLanguage} onContinue={handleContinue} />
    : <OnboardingFlow copy={copy} language={language} goal={goal} onBackHome={() => setView('home')} onLanguageChange={() => setAppLanguage()} />;
}
