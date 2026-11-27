import type { IconId } from './leasing-steps.ts';

export type MaintenanceChannel = 'call-emergency-line' | 'email-maintenance';

export interface MaintenanceTier {
  /** URL-safe unique identifier. */
  id: 'emergency' | 'urgent' | 'routine';
  /** Display order (1 = highest priority). */
  order: number;
  /** Short tier label printed on the door hanger. */
  label: string;
  /** Representative repair examples. */
  examples: readonly string[];
  /** Which channel tenants should use. */
  howToReport: MaintenanceChannel;
  /** Worded as an aim, never a guarantee. */
  responseAim: string;
  /** Optional immediate safety instruction shown above the triage cards. */
  firstStep?: string;
  /** Icon shown on the door hanger. */
  icon: IconId;
}

export const maintenanceTiers: readonly MaintenanceTier[] = [
  {
    id: 'emergency',
    order: 1,
    label: 'Emergency',
    examples: [
      'No heat when indoor temperature drops below 55°F',
      'Active water leak you cannot stop at the shut-off valve',
      'Sewage backup',
      'No power to the whole home (after checking with your utility)',
      'An exterior door or ground-floor lock that will not secure',
    ],
    howToReport: 'call-emergency-line',
    responseAim: 'We aim to call you back within one hour, day or night.',
    firstStep:
      'Smell gas or see fire? Leave the home immediately and call 911 or the gas utility’s emergency line first, then call our 24/7 line once you are safe.',
    icon: 'radiator',
  },
  {
    id: 'urgent',
    order: 2,
    label: 'Urgent',
    examples: [
      'Fridge or stove not working',
      'Only hot or only cold water',
      'A toilet that won’t flush when there is a second working toilet',
    ],
    howToReport: 'email-maintenance',
    responseAim: 'We aim to reply within one business day.',
    icon: 'tap',
  },
  {
    id: 'routine',
    order: 3,
    label: 'Routine',
    examples: [
      'Dripping tap or slow drain',
      'Sticking window or interior door',
      'A light fitting or wall switch acting up',
      'A loose fence board or gate latch',
    ],
    howToReport: 'email-maintenance',
    responseAim: 'We aim to schedule a visit within five business days.',
    icon: 'bulb',
  },
];

export const maintenanceEmailChecklist: readonly string[] = [
  'Your street address and unit number',
  'What is wrong and which room it is in',
  'When the issue started and whether it is getting worse',
  'Clear photos or a short video of the problem',
  'Times someone can enter (and whether we have permission to enter if you are out)',
  'Any pets at home so contractors can plan safely',
];
