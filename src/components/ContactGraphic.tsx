// Large-scale decorative backdrop for the Contact section — an oversized,
// low-opacity variant of the same "global network" mark used at icon size
// for Transnational Investigations (globe + meridians + radiating
// connections), so the section reads as intentional rather than empty
// without competing with the form/contact list on top of it. Same "one gold
// citation" rule as the rest of the icon system: every stroke is muted ink,
// except a single accent node.
export default function ContactGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 900"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="contactGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2be7c" />
          <stop offset="50%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#a87f1e" />
        </linearGradient>
      </defs>

      <circle cx="450" cy="450" r="280" stroke="var(--ink3)" strokeWidth="1" />
      <path d="M450 170 C340 170 340 730 450 730" stroke="var(--ink3)" strokeWidth="0.75" />
      <path d="M450 170 C560 170 560 730 450 730" stroke="var(--ink3)" strokeWidth="0.75" />
      <path d="M180 370 H720" stroke="var(--ink3)" strokeWidth="0.75" />
      <path d="M180 530 H720" stroke="var(--ink3)" strokeWidth="0.75" />

      <path d="M450 450 L120 250" stroke="var(--ink3)" strokeWidth="1" />
      <path d="M450 450 L760 190" stroke="var(--ink3)" strokeWidth="1" />
      <path d="M450 450 L150 640" stroke="var(--ink3)" strokeWidth="1" />
      <path d="M450 450 L710 700" stroke="url(#contactGold)" strokeWidth="1.4" />

      <circle cx="450" cy="450" r="5" stroke="var(--ink3)" strokeWidth="1.2" fill="var(--bgc)" />
      <circle cx="120" cy="250" r="4" stroke="var(--ink3)" strokeWidth="1" fill="var(--bgc)" />
      <circle cx="760" cy="190" r="4" stroke="var(--ink3)" strokeWidth="1" fill="var(--bgc)" />
      <circle cx="150" cy="640" r="4" stroke="var(--ink3)" strokeWidth="1" fill="var(--bgc)" />
      <circle cx="710" cy="700" r="5.5" fill="#c9a227" />
    </svg>
  );
}
