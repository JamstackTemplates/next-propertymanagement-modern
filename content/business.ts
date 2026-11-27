import type { OpeningHours } from '../lib/hours.ts';

export interface BusinessAddress {
  /** Suite or floor identifier. */
  suite: string;
  /** Street number and name. */
  street: string;
  /** City name. */
  city: string;
  /** State or region abbreviation. */
  region: string;
  /** Postal code. */
  postcode: string;
  /** Short walking landmark for visitors. */
  landmarkNote: string;
  /** Single-line formatted address used for maps and structured data. */
  formatted: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and structured data. */
  introduction: string;
  /** Office street address and directions note. */
  address: BusinessAddress;
  /** Public general and appraisal email address. */
  email: string;
  /** Maintenance email for tenants of managed homes. */
  maintenanceEmail: string;
  /** Public office phone number. */
  phone: string;
  /** 24/7 emergency maintenance line for tenants of managed homes only. */
  emergencyPhone: string;
  /** Seven same-day office hours records (Monday through Sunday). */
  hours: readonly OpeningHours[];
  /** Human-readable summary of office hours for static displays. */
  hoursSummary: string;
  /** Fair housing notice displayed in the footer. */
  equalHousingStatement: string;
  /** Sample gallery disclaimer displayed in the footer. */
  sampleNote: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Alder Key Property Management',
  tagline: 'Your rental, properly kept.',
  introduction:
    'Residential property management and leasing across Portland, Oregon for private landlords of houses, duplexes, condos and small apartment buildings.',
  address: {
    suite: 'Suite 410',
    street: '812 SW Alder Street',
    city: 'Portland',
    region: 'OR',
    postcode: '97205',
    landmarkNote: 'Half a block from Pioneer Courthouse Square. Visitors are welcome during office hours; appraisals happen at the property.',
    formatted: 'Suite 410, 812 SW Alder Street, Portland, OR 97205',
  },
  email: 'hello@alderkey.example',
  maintenanceEmail: 'maintenance@alderkey.example',
  phone: '(503) 555-0142',
  emergencyPhone: '(503) 555-0199',
  hours: [
    { day: 'Monday', opens: '09:00', closes: '17:30' },
    { day: 'Tuesday', opens: '09:00', closes: '17:30' },
    { day: 'Wednesday', opens: '09:00', closes: '17:30' },
    { day: 'Thursday', opens: '09:00', closes: '17:30' },
    { day: 'Friday', opens: '09:00', closes: '17:30' },
    { day: 'Saturday', opens: '10:00', closes: '13:00' },
    { day: 'Sunday' },
  ],
  hoursSummary: 'Mon–Fri 09:00–17:30 · Sat 10:00–13:00 · Sun closed',
  equalHousingStatement:
    'Equal Housing Opportunity. We follow federal, Oregon and City of Portland fair housing laws and apply written screening criteria equally to every applicant.',
  sampleNote:
    'Sample website for the Jamstacks gallery. Alder Key Property Management, its people, figures and contact details are fictitious.',
  enquiries: {
    title: 'Talk to our team',
    introduction:
      'Ask for a free rental appraisal, compare management plans or ask a leasing question. We’ll reply to arrange a time — sending a message is an enquiry, not a booked appointment or management agreement.',
    usefulToInclude: [
      'Property address or Portland neighbourhood',
      'Home type, bedrooms and bathrooms',
      'Whether it is vacant, tenanted or your own home right now',
      'When you would like it rented',
      'Which plan you are interested in (Lease-Up, Full Management or Small Building)',
      'Good times for a walk-through at the property',
    ],
  },
};

/** Strip punctuation to produce a valid tel: href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
