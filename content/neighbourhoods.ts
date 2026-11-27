export type PortlandQuadrant = 'N' | 'NE' | 'SE' | 'NW' | 'SW';
export type IntakeStatus = 'open' | 'waitlist';

export interface Neighbourhood {
  /** URL-safe unique identifier. */
  id: string;
  /** Portland neighbourhood name. */
  name: string;
  /** Portland address quadrant. */
  quadrant: PortlandQuadrant;
  /** Current owner onboarding availability; flip between 'open' and 'waitlist'. */
  intake: IntakeStatus;
  /** Typical residential home types managed in this area. */
  homeTypes: readonly string[];
}

export const neighbourhoods: readonly Neighbourhood[] = [
  {
    id: 'pearl-district',
    name: 'Pearl District',
    quadrant: 'NW',
    intake: 'open',
    homeTypes: ['Condos', 'Lofts', 'Modern flats'],
  },
  {
    id: 'alphabet-district',
    name: 'Alphabet District',
    quadrant: 'NW',
    intake: 'open',
    homeTypes: ['Walk-up apartments', 'Row houses', 'Condos'],
  },
  {
    id: 'goose-hollow',
    name: 'Goose Hollow',
    quadrant: 'SW',
    intake: 'open',
    homeTypes: ['Small apartment buildings', 'Townhomes', 'Condos'],
  },
  {
    id: 'buckman',
    name: 'Buckman',
    quadrant: 'SE',
    intake: 'open',
    homeTypes: ['Duplexes', 'Fourplexes', 'Bungalows'],
  },
  {
    id: 'hawthorne',
    name: 'Hawthorne',
    quadrant: 'SE',
    intake: 'waitlist',
    homeTypes: ['Craftsman houses', 'Duplexes', 'ADUs'],
  },
  {
    id: 'sellwood-moreland',
    name: 'Sellwood-Moreland',
    quadrant: 'SE',
    intake: 'open',
    homeTypes: ['Single-family homes', 'Upper/lower flats', 'Duplexes'],
  },
  {
    id: 'alberta-arts',
    name: 'Alberta Arts',
    quadrant: 'NE',
    intake: 'open',
    homeTypes: ['Bungalows', 'Modern townhomes', 'ADUs'],
  },
  {
    id: 'st-johns',
    name: 'St. Johns',
    quadrant: 'N',
    intake: 'waitlist',
    homeTypes: ['Single-family homes', 'Duplexes', 'Small multiplexes'],
  },
];
