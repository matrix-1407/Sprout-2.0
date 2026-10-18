import RollingCurrency from './RollingCurrency';

export default function RollingOdometer({ principal, value }) {
  const gain = Math.max(0, value - principal);
  const total = Math.max(value, 1);
  return <div className="mt-5 rounded-xl bg-canvas p-4">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div><p className="text-xs text-slate">Total Principal Contributed</p><p className="mt-1 text-lg font-bold"><RollingCurrency value={principal} /></p></div>
      <div><p className="text-xs text-slate">Market-Linked Value</p><p className="mt-1 text-lg font-bold text-jade"><RollingCurrency value={value} /></p></div>
    </div>
    <div className="mt-4 h-3 overflow-hidden rounded-full bg-subtle" aria-label="Five year wealth comparison">
      <div className="flex h-full transition-all duration-500"><span className="bg-obsidian" style={{ width: `${(principal / total) * 100}%` }} /><span className="bg-jade" style={{ width: `${(gain / total) * 100}%` }} /></div>
    </div>
    <div className="mt-2 flex justify-between text-[10px] text-slate"><span>Principal</span><span>Illustrative compounding gain</span></div>
  </div>;
}
