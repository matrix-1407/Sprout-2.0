const items = [
  '🌱 14,280 first-time investors started with ₹100 this week',
  '🏛️ SEBI Regulated • AMFI Registered (ARN-294810)',
  '⚡ 60-Second Paperless DigiLocker KYC',
  '🔒 256-Bit Bank-Grade Encryption • UPI AutoPay Ready',
  '🇮🇳 Available in English & हिंदी',
];

export default function InfiniteTrustTicker() {
  return <div className="overflow-hidden border-y border-hairline bg-surface py-3" aria-label="Community and trust milestones"><div className="trust-marquee flex w-max gap-8 whitespace-nowrap font-mono text-xs text-slate">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`} className="inline-flex items-center">{item}</span>)}</div></div>;
}
