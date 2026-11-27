"use client";
import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Neutral static output; browser refreshes in the business zone every minute. */
export function OpenBadge({ hours }: { hours: readonly OpeningHours[] }) {
  const [label, setLabel] = useState('See opening hours');
  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const isOpen = label.startsWith('Open now');
  return (
    <span className="inline-flex items-center gap-2 border border-line bg-surface px-3 py-1 font-mono text-xs font-semibold text-ink">
      <span
        className={`h-2 w-2 rounded-full ${isOpen ? 'bg-leaf' : 'bg-glow'}`}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
