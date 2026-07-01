import type { TaxJurisdiction, LocalizedText } from '@/data/taxJurisdictions';

export type OperationType = 'capitalGains' | 'stakingMining' | 'defi';
export type Locale = keyof LocalizedText;

export type CalcResult =
  | { kind: 'exempt-holding'; taxAmount: 0 }
  | { kind: 'exempt-allowance'; taxAmount: 0 }
  | { kind: 'taxable-exact'; taxAmount: number; rate: number }
  | { kind: 'descriptive' }
  | { kind: 'not-applicable' };

export function pickText(text: LocalizedText | undefined, locale: Locale): string {
  if (!text) return '';
  return text[locale] || text.en || text.uk || '';
}

export function calculateTax({
  jurisdiction,
  operation,
  amount,
  heldOverExemption,
}: {
  jurisdiction: TaxJurisdiction;
  operation: OperationType;
  amount: number;
  heldOverExemption: boolean;
}): CalcResult {
  if (operation === 'defi') return { kind: 'descriptive' };

  if (operation === 'capitalGains') {
    if (
      jurisdiction.capitalGainsHoldingExemptionMonths &&
      heldOverExemption
    ) {
      return { kind: 'exempt-holding', taxAmount: 0 };
    }
    if (!jurisdiction.capitalGainsCalculable || jurisdiction.capitalGainsRate == null) {
      return { kind: 'descriptive' };
    }
    if (
      jurisdiction.capitalGainsAllowance != null &&
      amount < jurisdiction.capitalGainsAllowance
    ) {
      return { kind: 'exempt-allowance', taxAmount: 0 };
    }
    return {
      kind: 'taxable-exact',
      taxAmount: (amount * jurisdiction.capitalGainsRate) / 100,
      rate: jurisdiction.capitalGainsRate,
    };
  }

  // stakingMining
  if (!jurisdiction.stakingMiningCalculable || jurisdiction.stakingMiningRate == null) {
    return { kind: 'descriptive' };
  }
  if (
    jurisdiction.stakingMiningAllowance != null &&
    amount < jurisdiction.stakingMiningAllowance
  ) {
    return { kind: 'exempt-allowance', taxAmount: 0 };
  }
  return {
    kind: 'taxable-exact',
    taxAmount: (amount * jurisdiction.stakingMiningRate) / 100,
    rate: jurisdiction.stakingMiningRate,
  };
}
