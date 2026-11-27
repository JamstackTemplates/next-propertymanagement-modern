import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const atPortland = (isoUtc: string) => openingLabel(business.hours, 'America/Los_Angeles', new Date(isoUtc));

test('Alder Key office hours: Mon-Fri 09:00-17:30, Sat 10:00-13:00, Sun closed', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
  // Tuesday in PST (UTC-8): 2026-11-17 08:59 local = 16:59Z, 09:00 local = 17:00Z, 17:30 local = 2026-11-18T01:30Z
  assert.equal(atPortland('2026-11-17T16:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atPortland('2026-11-17T17:00:00Z'), 'Open now · until 17:30');
  assert.equal(atPortland('2026-11-18T01:29:00Z'), 'Open now · until 17:30');
  assert.equal(atPortland('2026-11-18T01:30:00Z'), 'Closed · opens Wednesday at 09:00');
});

test('Saturday close and Sunday closed wrap cleanly to Monday 09:00', () => {
  // Saturday 2026-11-21 in PST (UTC-8): opens 10:00 (18:00Z), closes 13:00 (21:00Z)
  assert.equal(atPortland('2026-11-21T17:59:00Z'), 'Closed · opens today at 10:00');
  assert.equal(atPortland('2026-11-21T18:00:00Z'), 'Open now · until 13:00');
  assert.equal(atPortland('2026-11-21T20:59:00Z'), 'Open now · until 13:00');
  assert.equal(atPortland('2026-11-21T21:00:00Z'), 'Closed · opens Monday at 09:00');
  // Sunday 2026-11-22 midday local (20:00Z)
  assert.equal(atPortland('2026-11-22T20:00:00Z'), 'Closed · opens Monday at 09:00');
});

test('US DST transitions in America/Los_Angeles preserve local office hours', () => {
  // Spring forward: Sunday 2026-03-08 (PDT starts UTC-7).
  // Monday 2026-03-09 09:00 PDT = 16:00Z
  assert.equal(atPortland('2026-03-09T15:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atPortland('2026-03-09T16:00:00Z'), 'Open now · until 17:30');
  // Saturday before spring forward (2026-03-07, PST UTC-8): 10:00 PST = 18:00Z
  assert.equal(atPortland('2026-03-07T17:59:00Z'), 'Closed · opens today at 10:00');
  assert.equal(atPortland('2026-03-07T18:00:00Z'), 'Open now · until 13:00');

  // Fall back: Sunday 2026-11-01 (PST resumes UTC-8).
  // Saturday before fall back (2026-10-31, PDT UTC-7): 10:00 PDT = 17:00Z, 13:00 PDT = 20:00Z
  assert.equal(atPortland('2026-10-31T16:59:00Z'), 'Closed · opens today at 10:00');
  assert.equal(atPortland('2026-10-31T17:00:00Z'), 'Open now · until 13:00');
  assert.equal(atPortland('2026-10-31T20:00:00Z'), 'Closed · opens Monday at 09:00');
  // Monday after fall back (2026-11-02, PST UTC-8): 09:00 PST = 17:00Z
  assert.equal(atPortland('2026-11-02T16:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atPortland('2026-11-02T17:00:00Z'), 'Open now · until 17:30');
});

test('missing/invalid zones stay neutral and invalid/overnight intervals name the weekday', () => {
  assert.equal(openingLabel(business.hours, '', new Date('2026-11-17T17:00:00Z')), 'See opening hours');
  assert.equal(openingLabel(business.hours, 'Mars/Base', new Date('2026-11-17T17:00:00Z')), 'See opening hours');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'America/Los_Angeles'), 'Closed · see opening hours');

  const sample: OpeningHours[] = [...business.hours];
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(sample.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))), /Tuesday/);
  }
  assert.throws(() => validateHours(sample.slice(1)), /Monday/);
  assert.throws(() => validateHours(sample.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))), /Tuesday/);
});
