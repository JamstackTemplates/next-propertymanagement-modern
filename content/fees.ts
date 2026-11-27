import type { PlanId } from './plans.ts';

export type FeeCategory = 'monthly' | 'leasing' | 'occasional' | 'never';

export type FeeAmount =
  | {
      kind: 'percent';
      /** Percentage between 0 and 100. */
      value: number;
      /** Rent basis the percentage applies to. */
      of: 'collected-rent' | 'first-month-rent';
      /** Optional minimum fee in USD. */
      minimumUsd?: number;
    }
  | {
      kind: 'flat';
      /** Flat fee in USD (0 or greater). */
      usd: number;
    }
  | { kind: 'included' }
  | { kind: 'not-offered' };

export interface FeeItem {
  /** URL-safe unique identifier. */
  id: string;
  /** Human-readable line item name. */
  name: string;
  /** Grouping in the fee ledger; 'never' renders on "Never on your bill". */
  category: FeeCategory;
  /** Amount per management plan ID. */
  amounts: Record<PlanId, FeeAmount>;
  /** Short clarifying note shown in the ledger. */
  note: string;
}

/**
 * Itemised fee schedule (USD).
 * Owners most often edit the management percentages, leasing minimum and renewal fees here.
 * Home fee plates, letterbox doors, the ledger, estimator and example owner statement all read from this list.
 */
export const fees: readonly FeeItem[] = [
  {
    id: 'management-fee',
    name: 'Monthly management',
    category: 'monthly',
    amounts: {
      'lease-up': { kind: 'not-offered' },
      'full-management': { kind: 'percent', value: 8, of: 'collected-rent' },
      'small-building': { kind: 'percent', value: 7, of: 'collected-rent' },
    },
    note: 'Charged only on rent actually received',
  },
  {
    id: 'leasing-fee',
    name: 'Tenant placement',
    category: 'leasing',
    amounts: {
      'lease-up': { kind: 'percent', value: 75, of: 'first-month-rent', minimumUsd: 1000 },
      'full-management': { kind: 'percent', value: 50, of: 'first-month-rent' },
      'small-building': { kind: 'percent', value: 50, of: 'first-month-rent' },
    },
    note: 'Charged once when a lease is signed',
  },
  {
    id: 'lease-renewal',
    name: 'Lease renewal',
    category: 'occasional',
    amounts: {
      'lease-up': { kind: 'not-offered' },
      'full-management': { kind: 'flat', usd: 250 },
      'small-building': { kind: 'flat', usd: 200 },
    },
    note: 'Includes a market rent review',
  },
  {
    id: 'annual-inspection',
    name: 'Annual condition inspection',
    category: 'occasional',
    amounts: {
      'lease-up': { kind: 'not-offered' },
      'full-management': { kind: 'included' },
      'small-building': { kind: 'included' },
    },
    note: 'Dated photos sent with the report',
  },
  {
    id: 'extra-inspection',
    name: 'Additional inspection on request',
    category: 'occasional',
    amounts: {
      'lease-up': { kind: 'flat', usd: 125 },
      'full-management': { kind: 'flat', usd: 95 },
      'small-building': { kind: 'flat', usd: 95 },
    },
    note: '',
  },
  {
    id: 'move-out-report',
    name: 'Move-out condition report',
    category: 'occasional',
    amounts: {
      'lease-up': { kind: 'not-offered' },
      'full-management': { kind: 'included' },
      'small-building': { kind: 'included' },
    },
    note: 'Room-by-room photos',
  },
  {
    id: 'maintenance-coordination',
    name: 'Repair coordination',
    category: 'monthly',
    amounts: {
      'lease-up': { kind: 'not-offered' },
      'full-management': { kind: 'included' },
      'small-building': { kind: 'included' },
    },
    note: 'Contractor invoices passed on at cost, no markup',
  },
  {
    id: 'setup-fee',
    name: 'Account setup',
    category: 'never',
    amounts: {
      'lease-up': { kind: 'flat', usd: 0 },
      'full-management': { kind: 'flat', usd: 0 },
      'small-building': { kind: 'flat', usd: 0 },
    },
    note: 'No onboarding or account creation charge',
  },
  {
    id: 'vacancy-fee',
    name: 'Fees while vacant',
    category: 'never',
    amounts: {
      'lease-up': { kind: 'flat', usd: 0 },
      'full-management': { kind: 'flat', usd: 0 },
      'small-building': { kind: 'flat', usd: 0 },
    },
    note: 'Zero monthly management fee when no rent is collected',
  },
  {
    id: 'repair-markup',
    name: 'Markup on repairs',
    category: 'never',
    amounts: {
      'lease-up': { kind: 'flat', usd: 0 },
      'full-management': { kind: 'flat', usd: 0 },
      'small-building': { kind: 'flat', usd: 0 },
    },
    note: 'You pay the licensed contractor’s exact invoice',
  },
  {
    id: 'exit-fee',
    name: 'Leaving us (30 days’ notice)',
    category: 'never',
    amounts: {
      'lease-up': { kind: 'flat', usd: 0 },
      'full-management': { kind: 'flat', usd: 0 },
      'small-building': { kind: 'flat', usd: 0 },
    },
    note: 'No cancellation penalty or file-handover fee',
  },
];

export const ESTIMATOR_MIN_RENT = 500;
export const ESTIMATOR_MAX_RENT = 15_000;
export const DEFAULT_EXAMPLE_RENT = 2400;

export function roundCents(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatUsd(amount: number, { whole = false } = {}): string {
  const rounded = roundCents(amount);
  const hasCents = !whole && Math.round(rounded * 100) % 100 !== 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: whole ? 0 : hasCents ? 2 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(rounded);
}

export function formatUsdCompact(amount: number): string {
  const rounded = roundCents(amount);
  const isWhole = Math.round(rounded * 100) % 100 === 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

export function getFeeById(id: string): FeeItem {
  const found = fees.find(item => item.id === id);
  if (!found) throw new Error(`fees: unknown fee id "${id}"`);
  return found;
}

/** Headline Full Management percentage read by Home copy, metadata and example statement. */
export function getHeadlineManagementPercent(): number {
  const management = getFeeById('management-fee').amounts['full-management'];
  if (management.kind !== 'percent') {
    throw new Error('fees: management-fee for full-management must be a percentage');
  }
  return management.value;
}

/** Format a FeeAmount for display in the ledger table. */
export function formatFeeAmount(amount: FeeAmount, { short = false } = {}): string {
  if (amount.kind === 'included') return 'Included';
  if (amount.kind === 'not-offered') return 'Not offered';
  if (amount.kind === 'flat') return `${formatUsdCompact(amount.usd)} flat`;
  const basis = amount.of === 'collected-rent' ? (short ? 'collected' : 'collected rent') : (short ? '1st mo.' : 'first month');
  const min = amount.minimumUsd ? `, min ${formatUsdCompact(amount.minimumUsd)}` : '';
  return `${amount.value}% ${basis}${min}`;
}

/** Format the large mono figure shown on a letterbox door. */
export function formatDoorHeadline(feeId: string, planId: PlanId): string {
  const amount = getFeeById(feeId).amounts[planId];
  if (amount.kind === 'percent') return `${amount.value}%`;
  if (amount.kind === 'flat') return formatUsdCompact(amount.usd);
  if (amount.kind === 'included') return 'Incl.';
  return '—';
}

export interface PlanEstimate {
  planId: PlanId;
  monthlyFeeUsd: number;
  leasingFeeUsd: number;
  firstYearTotalUsd: number;
  minimumApplied: boolean;
}

/**
 * Compute monthly management fee, one-time leasing fee and first-year total (12 months + placement)
 * for every plan at a given monthly rent in USD.
 */
export function estimatePlanFees(monthlyRentUsd: number): Record<PlanId, PlanEstimate> {
  if (!Number.isInteger(monthlyRentUsd) || monthlyRentUsd < ESTIMATOR_MIN_RENT || monthlyRentUsd > ESTIMATOR_MAX_RENT) {
    throw new RangeError(
      `Monthly rent must be a whole dollar amount between ${formatUsdCompact(ESTIMATOR_MIN_RENT)} and ${formatUsdCompact(ESTIMATOR_MAX_RENT)}.`,
    );
  }
  const management = getFeeById('management-fee').amounts;
  const leasing = getFeeById('leasing-fee').amounts;
  const planIds: PlanId[] = ['lease-up', 'full-management', 'small-building'];

  const result = {} as Record<PlanId, PlanEstimate>;
  for (const planId of planIds) {
    const mgmt = management[planId];
    const lease = leasing[planId];

    const monthlyFeeUsd =
      mgmt.kind === 'percent' ? roundCents((monthlyRentUsd * mgmt.value) / 100)
        : mgmt.kind === 'flat' ? roundCents(mgmt.usd)
        : 0;

    let leasingFeeUsd = 0;
    let minimumApplied = false;
    if (lease.kind === 'percent') {
      const raw = roundCents((monthlyRentUsd * lease.value) / 100);
      if (lease.minimumUsd !== undefined && raw < lease.minimumUsd) {
        leasingFeeUsd = roundCents(lease.minimumUsd);
        minimumApplied = true;
      } else {
        leasingFeeUsd = raw;
      }
    } else if (lease.kind === 'flat') {
      leasingFeeUsd = roundCents(lease.usd);
    }

    const firstYearTotalUsd = roundCents(monthlyFeeUsd * 12 + leasingFeeUsd);
    result[planId] = { planId, monthlyFeeUsd, leasingFeeUsd, firstYearTotalUsd, minimumApplied };
  }
  return result;
}

export interface OwnerStatementExample {
  rentCollectedUsd: number;
  managementPercent: number;
  managementFeeUsd: number;
  plumberInvoiceUsd: number;
  netToOwnerUsd: number;
}

/** Compute the example monthly owner statement shown on Home directly from fees.ts. */
export function computeExampleStatement(
  rentCollectedUsd = DEFAULT_EXAMPLE_RENT,
  plumberInvoiceUsd = 185,
): OwnerStatementExample {
  const managementPercent = getHeadlineManagementPercent();
  const managementFeeUsd = roundCents((rentCollectedUsd * managementPercent) / 100);
  const netToOwnerUsd = roundCents(rentCollectedUsd - managementFeeUsd - plumberInvoiceUsd);
  return {
    rentCollectedUsd: roundCents(rentCollectedUsd),
    managementPercent,
    managementFeeUsd,
    plumberInvoiceUsd: roundCents(plumberInvoiceUsd),
    netToOwnerUsd,
  };
}
