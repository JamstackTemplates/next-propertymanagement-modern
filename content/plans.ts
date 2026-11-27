export type PlanId = 'lease-up' | 'full-management' | 'small-building';

export interface ManagementPlan {
  /** URL-safe unique identifier. */
  id: PlanId;
  /** Unique letterbox door number shown on the lobby letterbox bank. */
  boxNumber: string;
  /** Public plan name. */
  name: string;
  /** Short one-line description shown on the letterbox door. */
  summary: string;
  /** Fee item ID in content/fees.ts shown large on the letterbox door. */
  headlineFee: string;
  /** Short qualifying phrase paired with the headline fee (e.g. "once" or "of collected rent"). */
  headlineContext: string;
  /** Services included in this plan, shown on the mail card when the door opens. */
  includes: readonly string[];
  /** Who this plan fits best. */
  bestFor: string;
}

export const plans: readonly ManagementPlan[] = [
  {
    id: 'lease-up',
    boxNumber: '101',
    name: 'Lease-Up',
    summary: 'Find, screen and move in a qualified tenant, then hand you the keys.',
    headlineFee: 'leasing-fee',
    headlineContext: 'of first month’s rent, once',
    includes: [
      'Pricing advice from recent Portland comparable lets',
      'Daylight listing photos and a measured floor plan',
      'Listing syndication and booked showings six days a week',
      'Written fair-housing screening applied equally to every applicant',
      'Lease signing and deposit receipt',
      'Dated move-in condition report with room-by-room photos',
    ],
    bestFor: 'Landlords who self-manage after move-in',
  },
  {
    id: 'full-management',
    boxNumber: '102',
    name: 'Full Management',
    summary: 'End-to-end leasing, rent collection, maintenance and monthly reporting.',
    headlineFee: 'management-fee',
    headlineContext: 'of collected rent',
    includes: [
      'Everything in Lease-Up',
      'Online rent collection and direct owner disbursement by the 10th',
      'Plain monthly owner statements with contractor invoices attached',
      'Maintenance coordination at cost with no contractor markup',
      'Annual condition inspection with dated photos',
      'Lease renewals and room-by-room move-out condition report',
    ],
    bestFor: 'One to four homes, fully hands-off',
  },
  {
    id: 'small-building',
    boxNumber: '103',
    name: 'Small Building',
    summary: 'Dedicated care for multiplexes and walk-ups with five or more units.',
    headlineFee: 'management-fee',
    headlineContext: 'of collected rent',
    includes: [
      'Everything in Full Management',
      'Quarterly common-area, entry and exterior walk-throughs',
      'One combined monthly owner statement per building',
      'Reduced renewal fee across all units in the building',
    ],
    bestFor: 'Buildings of five or more units',
  },
];
