export default function StickyComplianceBar({ copy, language }) {
  return (
    <aside
      lang={language}
      className="sticky bottom-0 z-40 w-full border-t border-forest bg-obsidian px-4 py-3 text-[#F6F4EE] shadow-[0_-8px_24px_rgba(10,33,24,.12)] sm:px-8"
      style={{ fontSize: '12.5px', lineHeight: 1.45 }}
      data-testid="sticky-compliance-bar"
    >
      <div className="mx-auto max-w-7xl">{copy.disclaimer}</div>
    </aside>
  );
}
