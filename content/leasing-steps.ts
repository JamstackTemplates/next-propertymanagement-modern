import type { PlanId } from './plans.ts';

export type IconId =
  | 'tap'
  | 'radiator'
  | 'plug'
  | 'lock'
  | 'bulb'
  | 'camera'
  | 'tape-measure'
  | 'pen'
  | 'calendar'
  | 'building'
  | 'clipboard'
  | 'envelope'
  | 'phone'
  | 'leaf';

export interface LeasingStep {
  /** URL-safe unique identifier. */
  id: string;
  /** Contiguous step number from 1 to 8. */
  order: number;
  /** Short step heading. */
  title: string;
  /** Concise description of what happens at this stage. */
  detail: string;
  /** Plan IDs that include this step. */
  plans: readonly PlanId[];
  /** Icon drawn on the step card. */
  icon: IconId;
}

export const leasingSteps: readonly LeasingStep[] = [
  {
    id: 'price-it',
    order: 1,
    title: 'Price it',
    detail: 'Rent recommendation from recent comparable lets in your Portland neighbourhood.',
    plans: ['lease-up', 'full-management', 'small-building'],
    icon: 'tape-measure',
  },
  {
    id: 'make-ready',
    order: 2,
    title: 'Make ready',
    detail: 'A walk-through list of practical fixes worth doing before the listing goes live.',
    plans: ['lease-up', 'full-management', 'small-building'],
    icon: 'clipboard',
  },
  {
    id: 'photos-plan',
    order: 3,
    title: 'Photos and floor plan',
    detail: 'Daylight photos and a measured floor plan so prospective tenants know the layout.',
    plans: ['lease-up', 'full-management', 'small-building'],
    icon: 'camera',
  },
  {
    id: 'list-show',
    order: 4,
    title: 'List and show',
    detail: 'Published to major listing sites with booked in-person showings six days a week.',
    plans: ['lease-up', 'full-management', 'small-building'],
    icon: 'calendar',
  },
  {
    id: 'screen',
    order: 5,
    title: 'Screen',
    detail: 'Written screening criteria applied the same way to every applicant under fair housing rules.',
    plans: ['lease-up', 'full-management', 'small-building'],
    icon: 'lock',
  },
  {
    id: 'sign-move-in',
    order: 6,
    title: 'Sign and move in',
    detail: 'Lease signing, security deposit receipt and a dated, photo-documented move-in report.',
    plans: ['lease-up', 'full-management', 'small-building'],
    icon: 'pen',
  },
  {
    id: 'collect-report',
    order: 7,
    title: 'Collect and report',
    detail: 'Monthly rent collection, contractor coordination at cost and a plain owner statement.',
    plans: ['full-management', 'small-building'],
    icon: 'envelope',
  },
  {
    id: 'renew-or-turn',
    order: 8,
    title: 'Renew or turn over',
    detail: 'Renewal offer 60 days before lease end, or a room-by-room move-out report and relist.',
    plans: ['full-management', 'small-building'],
    icon: 'building',
  },
];
