import { business } from '../content/business.ts';
import { getHeadlineManagementPercent } from '../content/fees.ts';
import { neighbourhoods } from '../content/neighbourhoods.ts';
import { absoluteUrl } from './paths.ts';

/** RealEstateAgent structured data derived from typed content. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const pct = getHeadlineManagementPercent();
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: business.name,
    description: `${business.introduction} Clear ${pct}% of collected rent.`,
    email: business.email,
    telephone: business.phone,
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.suite}, ${business.address.street}`,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postcode,
      addressCountry: 'US',
    },
    openingHoursSpecification: business.hours
      .filter(entry => entry.opens && entry.closes)
      .map(entry => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${entry.day}`,
        opens: entry.opens,
        closes: entry.closes,
      })),
    areaServed: neighbourhoods.map(area => ({
      '@type': 'Place',
      name: `${area.name}, Portland, OR`,
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
