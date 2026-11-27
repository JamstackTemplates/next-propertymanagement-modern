import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  computeExampleStatement,
  estimatePlanFees,
  fees,
  getHeadlineManagementPercent,
  type FeeItem,
} from '../content/fees.ts';
import { leasingSteps } from '../content/leasing-steps.ts';
import { maintenanceTiers } from '../content/maintenance.ts';
import { neighbourhoods } from '../content/neighbourhoods.ts';
import { plans } from '../content/plans.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';
import {
  validateBusiness,
  validateFees,
  validateLeasingSteps,
  validateMaintenanceTiers,
  validateNeighbourhoods,
  validatePlans,
} from '../lib/validate-content.ts';

test('all typed content collections pass validation', () => {
  assert.doesNotThrow(() => validateBusiness(business));
  assert.doesNotThrow(() => validatePlans(plans, fees));
  assert.doesNotThrow(() => validateFees(fees, plans));
  assert.doesNotThrow(() => validateLeasingSteps(leasingSteps, plans));
  assert.doesNotThrow(() => validateNeighbourhoods(neighbourhoods));
  assert.doesNotThrow(() => validateMaintenanceTiers(maintenanceTiers));
});

test('validation failures identify the offending item by id', () => {
  // Duplicate box number
  assert.throws(
    () => validatePlans(plans.map((p, i) => (i === 1 ? { ...p, boxNumber: '101' } : p)), fees),
    /full-management/,
  );
  // Broken headlineFee reference
  assert.throws(
    () => validatePlans(plans.map((p, i) => (i === 0 ? { ...p, headlineFee: 'no-such-fee' } : p)), fees),
    /lease-up/,
  );
  // Out-of-range percent
  assert.throws(
    () =>
      validateFees(
        fees.map(f =>
          f.id === 'management-fee'
            ? { ...f, amounts: { ...f.amounts, 'full-management': { kind: 'percent', value: 120, of: 'collected-rent' } } }
            : f,
        ),
        plans,
      ),
    /management-fee/,
  );
  // Negative flat amount
  assert.throws(
    () =>
      validateFees(
        fees.map(f =>
          f.id === 'lease-renewal'
            ? { ...f, amounts: { ...f.amounts, 'full-management': { kind: 'flat', usd: -10 } } }
            : f,
        ),
        plans,
      ),
    /lease-renewal/,
  );
  // Missing plan coverage on a fee
  assert.throws(
    () =>
      validateFees(
        fees.map(f =>
          f.id === 'leasing-fee'
            ? ({ ...f, amounts: { 'lease-up': f.amounts['lease-up'], 'full-management': f.amounts['full-management'] } } as unknown as FeeItem)
            : f,
        ),
        plans,
      ),
    /leasing-fee/,
  );
  // Non-contiguous leasing steps
  assert.throws(
    () => validateLeasingSteps(leasingSteps.map(s => (s.id === 'screen' ? { ...s, order: 99 } : s)), plans),
    /screen/,
  );
  // Invalid neighbourhood intake enum
  assert.throws(
    () =>
      validateNeighbourhoods(
        neighbourhoods.map(n => (n.id === 'hawthorne' ? ({ ...n, intake: 'closed' } as never) : n)),
      ),
    /hawthorne/,
  );
  // Invalid maintenance channel
  assert.throws(
    () =>
      validateMaintenanceTiers(
        maintenanceTiers.map(t => (t.id === 'urgent' ? ({ ...t, howToReport: 'fax' } as never) : t)),
      ),
    /urgent/,
  );
});

test('fee estimator computes monthly, leasing (with Lease-Up minimum), rounding and range checks', () => {
  // At $1,200/mo, Lease-Up 75% = $900 -> $1,000 minimum applies
  const low = estimatePlanFees(1200);
  assert.equal(low['lease-up'].monthlyFeeUsd, 0);
  assert.equal(low['lease-up'].leasingFeeUsd, 1000);
  assert.equal(low['lease-up'].minimumApplied, true);
  assert.equal(low['lease-up'].firstYearTotalUsd, 1000);

  // At $2,400/mo, Lease-Up 75% = $1,800 (above minimum)
  const mid = estimatePlanFees(2400);
  assert.equal(mid['lease-up'].leasingFeeUsd, 1800);
  assert.equal(mid['lease-up'].minimumApplied, false);
  assert.equal(mid['full-management'].monthlyFeeUsd, 192);
  assert.equal(mid['full-management'].leasingFeeUsd, 1200);
  assert.equal(mid['full-management'].firstYearTotalUsd, 3504);
  assert.equal(mid['small-building'].monthlyFeeUsd, 168);
  assert.equal(mid['small-building'].leasingFeeUsd, 1200);
  assert.equal(mid['small-building'].firstYearTotalUsd, 3216);

  // Rounding to cents on odd rent ($1,333 * 8% = $106.64, * 7% = $93.31)
  const odd = estimatePlanFees(1333);
  assert.equal(odd['full-management'].monthlyFeeUsd, 106.64);
  assert.equal(odd['small-building'].monthlyFeeUsd, 93.31);
  assert.equal(odd['lease-up'].leasingFeeUsd, 1000); // 75% of 1333 = 999.75 -> min $1,000

  // Range and integer checks
  assert.throws(() => estimatePlanFees(499), RangeError);
  assert.throws(() => estimatePlanFees(15001), RangeError);
  assert.throws(() => estimatePlanFees(2400.5), RangeError);
});

test('example owner statement derives from Full Management percentage in fees.ts', () => {
  const stmt = computeExampleStatement();
  const pct = getHeadlineManagementPercent();
  assert.equal(stmt.rentCollectedUsd, 2400);
  assert.equal(stmt.managementPercent, pct);
  assert.equal(stmt.managementFeeUsd, Math.round(2400 * pct) / 100);
  assert.equal(stmt.plumberInvoiceUsd, 185);
  assert.equal(stmt.netToOwnerUsd, Math.round((2400 - stmt.managementFeeUsd - 185) * 100) / 100);
});

test('wording requirements hold in business and maintenance data', () => {
  assert.match(business.equalHousingStatement, /Equal Housing Opportunity/i);
  const emergency = maintenanceTiers.find(t => t.id === 'emergency');
  assert.ok(emergency?.firstStep, 'emergency tier must include a gas/fire safety firstStep');
  assert.match(emergency.firstStep, /911/);
  assert.match(emergency.firstStep, /gas utility/i);
  for (const tier of maintenanceTiers) {
    assert.match(tier.responseAim, /aim/i, `${tier.id}: response time must be worded as an aim`);
  }
});

test('RealEstateAgent structured data derives from content and escapes closing script tags', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'RealEstateAgent');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.address.addressLocality, 'Portland');
  assert.equal(schema.areaServed.length, neighbourhoods.length);
  assert.equal(schema.openingHoursSpecification.length, 6); // Mon-Sat open, Sun closed

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
