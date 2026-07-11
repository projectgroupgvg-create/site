import { sanctionedBtcAddresses, sanctionedEthAddresses } from '@/data/sanctionedAddresses';

export type WalletType = 'btc' | 'eth' | 'unknown';

export type WalletScreenResult =
  | { kind: 'invalid' }
  | { kind: 'flagged'; type: WalletType }
  | { kind: 'clear'; type: WalletType };

function detectType(address: string): WalletType {
  const a = address.trim();
  if (/^0x[a-fA-F0-9]{40}$/.test(a)) return 'eth';
  if (/^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(a) || /^bc1[a-z0-9]{25,90}$/.test(a)) return 'btc';
  return 'unknown';
}

export function screenWallet(rawAddress: string): WalletScreenResult {
  const address = rawAddress.trim();
  const type = detectType(address);
  if (type === 'unknown' || address.length < 20) return { kind: 'invalid' };

  const list = type === 'eth' ? sanctionedEthAddresses : sanctionedBtcAddresses;
  const normalized = type === 'eth' ? address.toLowerCase() : address;
  const hit = list.some((entry) => (type === 'eth' ? entry.toLowerCase() : entry) === normalized);

  return hit ? { kind: 'flagged', type } : { kind: 'clear', type };
}
