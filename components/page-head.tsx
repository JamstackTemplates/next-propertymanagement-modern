import type { ReactNode } from 'react';
import { PageHeadPlanArt } from './art';
import { SlabEdge } from './decor';

/** Finished-floor elevations for the storey datum under each page head. */
const LEVEL_ELEVATIONS: Record<string, string> = {
  L1: `±0'-0"`,
  L2: `+10'-6"`,
  L3: `+21'-0"`,
  L4: `+31'-6"`,
  L5: `+42'-0"`,
};

/** Architectural page header sitting on a 24px floor-plan grid with a Floor/Room kicker and right-side plan art. */
export function PageHead({
  kicker,
  title,
  children,
  id,
  art,
  planCode,
}: {
  /** Mono Floor / Room kicker, e.g. "L2 · Fees & services". */
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Optional custom art at right; defaults to a floor-plan fragment. */
  art?: ReactNode;
  /** Short plan code used by the default floor-plan fragment. */
  planCode?: string;
}) {
  const level = /^L\d/.exec(kicker)?.[0];
  return (
    <>
      <header className="bg-plan-grid relative overflow-hidden">
        {level ? (
          <span className="decor decor-level" aria-hidden="true">
            {level}
          </span>
        ) : null}
        <div className="wrap relative grid items-end gap-8 pt-10 pb-14 md:grid-cols-12 md:pt-14 md:pb-18">
          <div className="md:col-span-8">
            <p className="kicker">{kicker}</p>
            <h1
              id={id}
              className="mt-3 max-w-[18ch] text-[clamp(2.25rem,5.4vw,4rem)] font-bold text-ink"
            >
              {title}
            </h1>
            {children ? (
              <div className="mt-4 max-w-(--measure) text-base text-muted sm:text-lg">
                {children}
              </div>
            ) : null}
          </div>
          <div className="flex justify-start md:col-span-4 md:justify-end">
            {art ?? <PageHeadPlanArt code={planCode ?? kicker} />}
          </div>
        </div>
      </header>
      <SlabEdge label={level ? `${level} · FFL ${LEVEL_ELEVATIONS[level] ?? ''}`.trim() : undefined} />
    </>
  );
}
