const items = [
  '🌱 Start a first investing habit with ₹100',
  '🏛️ Designed around regulated investing',
  '⚡ Guided DigiLocker KYC flow',
  '🔒 Clear steps from goal to UPI contribution',
  '🇮🇳 Available in English & हिंदी',
];

export default function InfiniteTrustTicker() {
  return <div className="overflow-hidden border-y border-hairline bg-surface py-3" aria-label="Community and trust milestones"><div className="animate-marquee gap-8 whitespace-nowrap font-mono text-xs text-slate">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`} className="inline-flex items-center">{item}</span>)}</div></div>;
}
