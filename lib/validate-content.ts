import type { Business } from '../content/business.ts';
import type { FeeCategory, FeeItem } from '../content/fees.ts';
import type { IconId, LeasingStep } from '../content/leasing-steps.ts';
import type { MaintenanceChannel, MaintenanceTier } from '../content/maintenance.ts';
import type { IntakeStatus, Neighbourhood, PortlandQuadrant } from '../content/neighbourhoods.ts';
import type { ManagementPlan, PlanId } from '../content/plans.ts';
import { validateHours } from './hours.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FEE_CATEGORIES = new Set<FeeCategory>(['monthly', 'leasing', 'occasional', 'never']);
const QUADRANTS = new Set<PortlandQuadrant>(['N', 'NE', 'SE', 'NW', 'SW']);
const INTAKE_VALUES = new Set<IntakeStatus>(['open', 'waitlist']);
const CHANNELS = new Set<MaintenanceChannel>(['call-emergency-line', 'email-maintenance']);
const VALID_ICONS = new Set<IconId>([
  'tap',
  'radiator',
  'plug',
  'lock',
  'bulb',
  'camera',
  'tape-measure',
  'pen',
  'calendar',
  'building',
  'clipboard',
  'envelope',
  'phone',
  'leaf',
]);

export function validateBusiness(b: Business): void {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'maintenanceEmail', 'phone', 'emergencyPhone', 'equalHousingStatement', 'sampleNote'] as const) {
    if (!b[key]?.trim()) throw new Error(`business.${key}: required`);
  }
  if (!EMAIL_RE.test(b.email)) throw new Error(`business.email (${b.email}): valid public email required`);
  if (!EMAIL_RE.test(b.maintenanceEmail)) throw new Error(`business.maintenanceEmail (${b.maintenanceEmail}): valid email required`);
  for (const key of ['suite', 'street', 'city', 'region', 'postcode', 'landmarkNote', 'formatted'] as const) {
    if (!b.address[key]?.trim()) throw new Error(`business.address.${key}: required`);
  }
  validateHours(b.hours);
  if (!b.enquiries.title.trim()) throw new Error('business.enquiries.title: required');
  if (!b.enquiries.introduction.trim()) throw new Error('business.enquiries.introduction: required');
  if (!b.enquiries.usefulToInclude.length) throw new Error('business.enquiries.usefulToInclude: at least one suggestion required');
  b.enquiries.usefulToInclude.forEach((tip, i) => {
    if (!tip.trim()) throw new Error(`business.enquiries.usefulToInclude[${i}]: empty tip`);
  });
}

export function validatePlans(planList: readonly ManagementPlan[], feeList: readonly FeeItem[]): void {
  if (!planList.length) throw new Error('plans: at least one plan required');
  const seenIds = new Set<string>();
  const seenBoxes = new Set<string>();
  const feeIds = new Set(feeList.map(f => f.id));

  for (const plan of planList) {
    if (!URL_SAFE_ID.test(plan.id)) throw new Error(`plans.${plan.id}: id must be URL-safe lowercase kebab-case`);
    if (seenIds.has(plan.id)) throw new Error(`plans.${plan.id}: duplicate plan id`);
    seenIds.add(plan.id);

    if (!plan.boxNumber.trim()) throw new Error(`plans.${plan.id}: boxNumber is required`);
    if (seenBoxes.has(plan.boxNumber)) throw new Error(`plans.${plan.id}: duplicate boxNumber "${plan.boxNumber}"`);
    seenBoxes.add(plan.boxNumber);

    if (!plan.name.trim()) throw new Error(`plans.${plan.id}: name is required`);
    if (!plan.summary.trim()) throw new Error(`plans.${plan.id}: summary is required`);
    if (!plan.bestFor.trim()) throw new Error(`plans.${plan.id}: bestFor is required`);
    if (!plan.includes.length) throw new Error(`plans.${plan.id}: includes must list at least one item`);
    for (const line of plan.includes) {
      if (!line.trim()) throw new Error(`plans.${plan.id}: includes contains an empty entry`);
    }
    if (!feeIds.has(plan.headlineFee)) {
      throw new Error(`plans.${plan.id}: headlineFee "${plan.headlineFee}" does not match any fee id`);
    }
  }
}

export function validateFees(feeList: readonly FeeItem[], planList: readonly ManagementPlan[]): void {
  if (!feeList.length) throw new Error('fees: at least one fee item required');
  const seenIds = new Set<string>();
  const planIds = planList.map(p => p.id) as PlanId[];

  for (const fee of feeList) {
    if (!URL_SAFE_ID.test(fee.id)) throw new Error(`fees.${fee.id}: id must be URL-safe lowercase kebab-case`);
    if (seenIds.has(fee.id)) throw new Error(`fees.${fee.id}: duplicate fee id`);
    seenIds.add(fee.id);

    if (!fee.name.trim()) throw new Error(`fees.${fee.id}: name is required`);
    if (!FEE_CATEGORIES.has(fee.category)) throw new Error(`fees.${fee.id}: invalid category "${String(fee.category)}"`);

    for (const planId of planIds) {
      const amount = fee.amounts[planId];
      if (!amount) throw new Error(`fees.${fee.id}: missing amount for plan "${planId}"`);
      if (amount.kind === 'percent') {
        if (!Number.isFinite(amount.value) || amount.value < 0 || amount.value > 100) {
          throw new Error(`fees.${fee.id}.${planId}: percent value must be between 0 and 100`);
        }
        if (amount.of !== 'collected-rent' && amount.of !== 'first-month-rent') {
          throw new Error(`fees.${fee.id}.${planId}: invalid percent basis "${String(amount.of)}"`);
        }
        if (amount.minimumUsd !== undefined && (!Number.isFinite(amount.minimumUsd) || amount.minimumUsd < 0)) {
          throw new Error(`fees.${fee.id}.${planId}: minimumUsd must be >= 0`);
        }
      } else if (amount.kind === 'flat') {
        if (!Number.isFinite(amount.usd) || amount.usd < 0) {
          throw new Error(`fees.${fee.id}.${planId}: flat usd must be >= 0`);
        }
      } else if (amount.kind !== 'included' && amount.kind !== 'not-offered') {
        throw new Error(`fees.${fee.id}.${planId}: invalid amount kind`);
      }
    }
  }
}

export function validateLeasingSteps(stepList: readonly LeasingStep[], planList: readonly ManagementPlan[]): void {
  if (!stepList.length) throw new Error('leasingSteps: at least one step required');
  const seenIds = new Set<string>();
  const seenOrders = new Set<number>();
  const planIds = new Set<string>(planList.map(p => p.id));

  for (const step of stepList) {
    if (!URL_SAFE_ID.test(step.id)) throw new Error(`leasingSteps.${step.id}: id must be URL-safe lowercase kebab-case`);
    if (seenIds.has(step.id)) throw new Error(`leasingSteps.${step.id}: duplicate step id`);
    seenIds.add(step.id);

    if (!Number.isInteger(step.order) || step.order < 1 || step.order > stepList.length) {
      throw new Error(`leasingSteps.${step.id}: order ${step.order} out of range 1..${stepList.length}`);
    }
    if (seenOrders.has(step.order)) throw new Error(`leasingSteps.${step.id}: duplicate order ${step.order}`);
    seenOrders.add(step.order);

    if (!step.title.trim()) throw new Error(`leasingSteps.${step.id}: title is required`);
    if (!step.detail.trim()) throw new Error(`leasingSteps.${step.id}: detail is required`);
    if (!step.plans.length) throw new Error(`leasingSteps.${step.id}: must reference at least one plan`);
    for (const planId of step.plans) {
      if (!planIds.has(planId)) throw new Error(`leasingSteps.${step.id}: unknown plan id "${planId}"`);
    }
    if (!VALID_ICONS.has(step.icon)) throw new Error(`leasingSteps.${step.id}: unknown icon "${step.icon}"`);
  }

  for (let i = 1; i <= stepList.length; i++) {
    if (!seenOrders.has(i)) throw new Error(`leasingSteps: missing contiguous step order ${i}`);
  }
}

export function validateNeighbourhoods(list: readonly Neighbourhood[]): void {
  if (!list.length) throw new Error('neighbourhoods: at least one neighbourhood required');
  const seenIds = new Set<string>();

  for (const area of list) {
    if (!URL_SAFE_ID.test(area.id)) throw new Error(`neighbourhoods.${area.id}: id must be URL-safe lowercase kebab-case`);
    if (seenIds.has(area.id)) throw new Error(`neighbourhoods.${area.id}: duplicate id`);
    seenIds.add(area.id);

    if (!area.name.trim()) throw new Error(`neighbourhoods.${area.id}: name is required`);
    if (!QUADRANTS.has(area.quadrant)) throw new Error(`neighbourhoods.${area.id}: invalid quadrant "${String(area.quadrant)}"`);
    if (!INTAKE_VALUES.has(area.intake)) throw new Error(`neighbourhoods.${area.id}: invalid intake "${String(area.intake)}"`);
    if (!area.homeTypes.length) throw new Error(`neighbourhoods.${area.id}: homeTypes must not be empty`);
    for (const type of area.homeTypes) {
      if (!type.trim()) throw new Error(`neighbourhoods.${area.id}: homeTypes contains empty string`);
    }
  }
}

export function validateMaintenanceTiers(tiers: readonly MaintenanceTier[]): void {
  if (!tiers.length) throw new Error('maintenanceTiers: at least one tier required');
  const seenIds = new Set<string>();
  const seenOrders = new Set<number>();

  for (const tier of tiers) {
    if (!URL_SAFE_ID.test(tier.id)) throw new Error(`maintenanceTiers.${tier.id}: id must be URL-safe`);
    if (seenIds.has(tier.id)) throw new Error(`maintenanceTiers.${tier.id}: duplicate id`);
    seenIds.add(tier.id);

    if (!Number.isInteger(tier.order) || tier.order < 1 || tier.order > tiers.length) {
      throw new Error(`maintenanceTiers.${tier.id}: order ${tier.order} out of range`);
    }
    if (seenOrders.has(tier.order)) throw new Error(`maintenanceTiers.${tier.id}: duplicate order ${tier.order}`);
    seenOrders.add(tier.order);

    if (!tier.label.trim()) throw new Error(`maintenanceTiers.${tier.id}: label is required`);
    if (!tier.examples.length) throw new Error(`maintenanceTiers.${tier.id}: examples must not be empty`);
    if (!CHANNELS.has(tier.howToReport)) throw new Error(`maintenanceTiers.${tier.id}: invalid howToReport "${String(tier.howToReport)}"`);
    if (!tier.responseAim.trim()) throw new Error(`maintenanceTiers.${tier.id}: responseAim is required`);
    if (!VALID_ICONS.has(tier.icon)) throw new Error(`maintenanceTiers.${tier.id}: unknown icon "${tier.icon}"`);
  }
}
