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

export function CivilLawIcon({ className }: IconProps) {
  const g = 'pmGold-civil';
  return (
    <Base id={g} className={className}>
      <path d="M9 4 H19 L24 9 V28 H9 Z" stroke="var(--ink3)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M19 4 V9 H24" stroke="var(--ink3)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12.3 14 H20.7 M12.3 18 H20.7 M12.3 22 H17" stroke="var(--ink3)" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M12 25.8 Q14.5 23.6 17 25.8 T22 25.8" stroke={`url(#${g})`} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="22" cy="25.8" r="1" fill="#c9a227" />
    </Base>
  );
}

export function CommercialLawIcon({ className }: IconProps) {
  const g = 'pmGold-commercial';
  return (
    <Base id={g} className={className}>
      <rect x="5" y="12.5" width="22" height="14.5" rx="2.5" stroke="var(--ink3)" strokeWidth="1.5" />
      <path d="M12 12.5 V9.3 A2.4 2.4 0 0 1 14.4 6.9 H17.6 A2.4 2.4 0 0 1 20 9.3 V12.5" stroke="var(--ink3)" strokeWidth="1.4" />
      <path d="M5 19 H27" stroke="var(--ink3)" strokeWidth="1.1" />
      <rect x="14.2" y="17" width="3.6" height="3.6" rx="0.8" stroke={`url(#${g})`} strokeWidth="1.5" />
      <circle cx="16" cy="18.8" r="0.6" fill="#c9a227" />
    </Base>
  );
}

export function AntitrustLawIcon({ className }: IconProps) {
  const g = 'pmGold-antitrust';
  return (
    <Base id={g} className={className}>
      <circle cx="14" cy="14" r="9.5" stroke="var(--ink3)" strokeWidth="1.5" />
      <path d="M14 14 V4.5" stroke="var(--ink3)" strokeWidth="1.1" />
      <path d="M14 14 L21.7 9.3" stroke="var(--ink3)" strokeWidth="1.1" />
      <path d="M14 14 L14 4.5 A9.5 9.5 0 0 1 21.7 9.3 Z" fill="none" stroke={`url(#${g})`} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M20.7 20.7 L28.5 28.5" stroke="var(--ink3)" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="28.5" cy="28.5" r="1" fill="#c9a227" />
    </Base>
  );
}

export function AdministrativeLawIcon({ className }: IconProps) {
  const g = 'pmGold-administrative';
  return (
    <Base id={g} className={className}>
      <path d="M4 27.5 H28" stroke="var(--ink3)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 27 V15.5 M11.5 27 V15.5 M16 27 V15.5 M20.5 27 V15.5 M25.5 27 V15.5" stroke="var(--ink3)" strokeWidth="1.2" />
      <path d="M3 15.5 L16 6.5 L29 15.5 Z" stroke="var(--ink3)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 6.5 L29 15.5" stroke={`url(#${g})`} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="29" cy="15.5" r="1" fill="#c9a227" />
    </Base>
  );
}

export function LandLawIcon({ className }: IconProps) {
  const g = 'pmGold-land';
  return (
    <Base id={g} className={className}>
      <path d="M4 27 H28" stroke="var(--ink3)" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="7" y="10.5" width="18" height="16.5" stroke="var(--ink3)" strokeWidth="1.4" />
      <path d="M7 17.2 H25 M13.7 10.5 V27 M20.3 10.5 V27" stroke="var(--ink3)" strokeWidth="1" />
      <path d="M16 4 L20 10.5 H12 Z" fill="none" stroke={`url(#${g})`} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="4" r="1" fill="#c9a227" />
    </Base>
  );
}

export function ITLawIcon({ className }: IconProps) {
  const g = 'pmGold-it';
  return (
    <Base id={g} className={className}>
      <rect x="4" y="7" width="24" height="15" rx="1.6" stroke="var(--ink3)" strokeWidth="1.5" />
      <path d="M4 19.5 H28" stroke="var(--ink3)" strokeWidth="1" />
      <path d="M10 27 H22 M13 22 L12 27 M19 22 L20 27" stroke="var(--ink3)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 14.5 L8 12 L11 9.5" stroke={`url(#${g})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M17 9 L15 15" stroke="var(--ink3)" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="21" cy="12" r="1" fill="#c9a227" />
    </Base>
  );
}

export function RegulatoryLawIcon({ className }: IconProps) {
  const g = 'pmGold-regulatory';
  return (
    <Base id={g} className={className}>
      <rect x="8" y="4" width="16" height="24" rx="2" stroke="var(--ink3)" strokeWidth="1.5" />
      <path d="M12 10 H20 M12 14.5 H20 M12 19 H17" stroke="var(--ink3)" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="21" cy="23" r="5" fill="var(--bgc)" stroke={`url(#${g})`} strokeWidth="1.6" />
      <path d="M18.7 23 L20.3 24.6 L23.5 21.2" stroke={`url(#${g})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  );
}

export const PRACTICE_ICONS: Record<PracticeSlug, (props: IconProps) => JSX.Element> = {
  'criminal-defense': CriminalDefenseIcon,
  'civil-law': CivilLawIcon,
  'commercial-law': CommercialLawIcon,
  'administrative-law': AdministrativeLawIcon,
  'land-law': LandLawIcon,
  'it-law': ITLawIcon,
  'transnational-investigations': TransnationalIcon,
  'crypto-fraud': CryptoFraudIcon,
  'aml-compliance': AmlComplianceIcon,
  cybercrime: CybercrimeIcon,
  'blockchain-investigations': BlockchainInvestigationsIcon,
  // New sub-practices reuse their parent's mark — these are never actually
  // rendered today (PracticesGrid only looks up icons for the 5 top-level
  // slugs), but PRACTICE_ICONS' Record type must stay exhaustive over
  // PracticeSlug, so every slug needs an entry.
  'property-rights-protection': CivilLawIcon,
  'marital-property-division': CivilLawIcon,
  'corporate-disputes': CommercialLawIcon,
  'customs-disputes': AdministrativeLawIcon,
  'land-allocation-registration': LandLawIcon,
};
