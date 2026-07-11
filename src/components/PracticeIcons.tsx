import type { PracticeSlug } from '@/data/practices';

/**
 * "Veined Permanence — The Six Marks"
 * A family of six miniature line-marks, one per practice area, unified by a single
 * visual language: thin grey-taupe (var(--ink3)) structural strokes and exactly one
 * gold accent per mark — the same "single citation" logic used across the site's
 * marble motif. Each mark's geometry is a distilled, non-literal reference to its
 * practice area (a weighted scale, a crossed meridian, a broken link, a shield with
 * one clean stroke of judgment, a lock with a traced breach, a node lattice with one
 * highlighted path).
 */

type IconProps = { className?: string };

function Base({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2be7c" />
          <stop offset="50%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#a87f1e" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

export function CriminalDefenseIcon({ className }: IconProps) {
  const g = 'pmGold-criminal';
  return (
    <Base id={g} className={className}>
      <path d="M16 4 V26" stroke="var(--ink3)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10.5 26 H21.5" stroke="var(--ink3)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 8.6 H26 M6 8.6 L5.3 9.3 M26 8.6 L26.7 9.9" stroke="var(--ink3)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 8.6 L2.3 14.5 M6 8.6 L9.7 14.5 M2.3 14.5 A3.7 2.6 0 0 0 9.7 14.5" stroke="var(--ink3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 9.9 L22.3 15.8 M26 9.9 L29.7 15.8 M22.3 15.8 A3.7 2.6 0 0 0 29.7 15.8" stroke={`url(#${g})`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="26" cy="9.9" r="1" fill="#c9a227" />
    </Base>
  );
}

export function TransnationalIcon({ className }: IconProps) {
  const g = 'pmGold-transnational';
  return (
    <Base id={g} className={className}>
      <circle cx="16" cy="16" r="10" stroke="var(--ink3)" strokeWidth="1.5" />
      <path d="M16 6 C11.2 6 11.2 26 16 26" stroke="var(--ink3)" strokeWidth="1.1" />
      <path d="M16 6 C20.8 6 20.8 26 16 26" stroke="var(--ink3)" strokeWidth="1.1" />
      <path d="M6.3 13.5 H25.7 M6.3 18.5 H25.7" stroke="var(--ink3)" strokeWidth="1.1" />
      <path d="M4.5 23.5 Q15 6 27.5 9" stroke={`url(#${g})`} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="27.5" cy="9" r="1.4" fill="#c9a227" />
      <circle cx="4.5" cy="23.5" r="1" fill="var(--ink3)" />
    </Base>
  );
}

export function CryptoFraudIcon({ className }: IconProps) {
  const g = 'pmGold-crypto';
  return (
    <Base id={g} className={className}>
      <rect x="3" y="14" width="13" height="7" rx="3.5" stroke="var(--ink3)" strokeWidth="1.5" />
      <rect x="13" y="8" width="7" height="15" rx="3.5" stroke="var(--ink3)" strokeWidth="1.5" />
      <path d="M13.5 15.5 L16.8 17.2 L14.3 19.3 L18 21.2" stroke={`url(#${g})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="21.2" r="1" fill="#c9a227" />
    </Base>
  );
}

export function AmlComplianceIcon({ className }: IconProps) {
  const g = 'pmGold-aml';
  return (
    <Base id={g} className={className}>
      <path d="M16 4.2 L25.5 7.8 V15.5 C25.5 22 21.4 26.3 16 28.4 C10.6 26.3 6.5 22 6.5 15.5 V7.8 Z" stroke="var(--ink3)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 16 L14.6 19.8 L21.5 11.8" stroke={`url(#${g})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  );
}

export function CybercrimeIcon({ className }: IconProps) {
  const g = 'pmGold-cyber';
  return (
    <Base id={g} className={className}>
      <rect x="8.5" y="15" width="15" height="12" rx="2.6" stroke="var(--ink3)" strokeWidth="1.6" />
      <path d="M12 15 V11.3 A4 4 0 0 1 20 11.3 V15" stroke="var(--ink3)" strokeWidth="1.6" />
      <circle cx="16" cy="20" r="1.6" stroke="var(--ink3)" strokeWidth="1.3" />
      <path d="M16 21.6 L15.2 25 H16.8 Z" stroke="var(--ink3)" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M23.5 19.5 H27.3 M27.3 19.5 V15.7 H30" stroke={`url(#${g})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="15.7" r="1.2" fill="#c9a227" />
    </Base>
  );
}

export function BlockchainInvestigationsIcon({ className }: IconProps) {
  const g = 'pmGold-blockchain';
  return (
    <Base id={g} className={className}>
      <line x1="7.5" y1="10.5" x2="16" y2="16" stroke="var(--ink3)" strokeWidth="1.1" />
      <line x1="24" y1="8.5" x2="16" y2="16" stroke="var(--ink3)" strokeWidth="1.1" />
      <line x1="6.5" y1="24" x2="16" y2="16" stroke="var(--ink3)" strokeWidth="1.1" />
      <line x1="16" y1="16" x2="25" y2="23" stroke={`url(#${g})`} strokeWidth="1.7" />
      <circle cx="7.5" cy="10.5" r="1.7" stroke="var(--ink3)" strokeWidth="1.3" fill="var(--bgc)" />
      <circle cx="24" cy="8.5" r="1.7" stroke="var(--ink3)" strokeWidth="1.3" fill="var(--bgc)" />
      <circle cx="6.5" cy="24" r="1.7" stroke="var(--ink3)" strokeWidth="1.3" fill="var(--bgc)" />
      <circle cx="16" cy="16" r="1.9" stroke="var(--ink3)" strokeWidth="1.3" fill="var(--bgc)" />
      <circle cx="25" cy="23" r="1.9" fill="#c9a227" />
    </Base>
  );
}

export const PRACTICE_ICONS: Record<PracticeSlug, (props: IconProps) => JSX.Element> = {
  'criminal-defense': CriminalDefenseIcon,
  'transnational-investigations': TransnationalIcon,
  'crypto-fraud': CryptoFraudIcon,
  'aml-compliance': AmlComplianceIcon,
  cybercrime: CybercrimeIcon,
  'blockchain-investigations': BlockchainInvestigationsIcon,
};
