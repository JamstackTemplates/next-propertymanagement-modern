import { formatDoorHeadline } from '../content/fees';
import { plans } from '../content/plans';
import { AlderLeafMotif } from './art';
import { SiteLink } from './site-link';

/**
 * Signature element: brushed-aluminium apartment lobby letterbox bank.
 * Each plan sits behind a numbered <details> door (101, 102, 103); opening it swings the door
 * on its left hinge (CSS 3D, disabled under reduced motion) to reveal the inclusions on the "mail" inside.
 */
export function LetterboxBank({
  showPortfolioBoxes = false,
  defaultOpenFirst = false,
}: {
  /** On /fees/, render two extra "Ask about larger portfolios" boxes (104, 105). */
  showPortfolioBoxes?: boolean;
  /** Optionally open box 102 (Full Management) by default so visitors see how doors work. */
  defaultOpenFirst?: boolean;
}) {
  return (
    <div className="border-[1.5px] border-ink bg-felt p-2 sm:p-3">
      {/* Top stamped aluminium rail */}
      <div className="bg-aluminium mb-2 flex items-center justify-between border border-ink px-4 py-2 sm:mb-3">
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-ink uppercase">
          ALDER KEY · RESIDENTS &amp; OWNERS
        </span>
        <span className="font-mono text-[0.72rem] text-muted">
          BOXES 101–{showPortfolioBoxes ? '105' : '103'}
        </span>
      </div>

      {/* Letterbox doors grid */}
      <div className={`grid items-start gap-2 sm:gap-3 ${showPortfolioBoxes ? 'md:grid-cols-3 lg:grid-cols-5' : 'md:grid-cols-3'}`}>
        {plans.map(plan => {
          const headline = formatDoorHeadline(plan.headlineFee, plan.id);
          const isFeatured = plan.id === 'full-management';
          return (
            <div key={plan.id} className="letterbox-cell flex flex-col bg-felt">
              <details
                className="letterbox-door group flex h-full flex-col"
                open={defaultOpenFirst && isFeatured ? true : undefined}
              >
                {/* No heading inside <summary> per accessibility/accordion best practices */}
                <summary className="bg-aluminium relative flex flex-col justify-between border-[1.5px] border-ink p-4 text-ink select-none sm:p-5">
                  {/* Left hinge knuckles */}
                  <span
                    className="pointer-events-none absolute top-4 left-0 h-5 w-1 bg-ink"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-4 left-0 h-5 w-1 bg-ink"
                    aria-hidden="true"
                  />

                  {/* Top row: box number plate + keyhole */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="border border-ink bg-surface px-2.5 py-1">
                      <span className="font-mono block text-xs font-bold tracking-widest text-ink">
                        UNIT {plan.boxNumber}
                      </span>
                      <span className="font-display block text-base font-bold text-ink">
                        {plan.name}
                      </span>
                    </div>
                    {/* Keyhole */}
                    <span
                      className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink bg-surface"
                      aria-hidden="true"
                    >
                      <span className="h-3 w-1 bg-ink" />
                    </span>
                  </div>

                  {/* Mail slot */}
                  <div
                    className="my-4 h-1.5 w-full border border-ink bg-felt"
                    aria-hidden="true"
                  />

                  {/* Mono headline fee */}
                  <div>
                    <p className="font-mono text-3xl font-bold tracking-tight text-primary-ink sm:text-4xl">
                      {headline}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {plan.headlineContext}
                    </p>
                    <p className="mt-3 text-sm text-ink">
                      {plan.summary}
                    </p>
                  </div>

                  {/* Door pull / open cue */}
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-xs font-semibold text-primary-ink uppercase">
                    <span className="group-open:hidden">Open box →</span>
                    <span className="hidden group-open:inline">Close box ×</span>
                    <span className="text-muted">#{plan.boxNumber}</span>
                  </div>
                </summary>

                {/* Mail inside the open letterbox */}
                <div className="letterbox-mail border-x-[1.5px] border-b-[1.5px] border-ink bg-surface p-4 text-ink sm:p-5">
                  <p className="font-mono text-[0.72rem] font-semibold tracking-wider text-muted uppercase">
                    Best for
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">{plan.bestFor}</p>
                  <p className="mt-4 font-mono text-[0.72rem] font-semibold tracking-wider text-muted uppercase">
                    What’s inside
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-ink">
                    {plan.includes.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <AlderLeafMotif className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          );
        })}

        {showPortfolioBoxes && (
          <>
            {(['104', '105'] as const).map(box => (
              <div
                key={box}
                className="bg-aluminium flex flex-col justify-between border-[1.5px] border-ink p-4 opacity-90 sm:p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="border border-line bg-surface/80 px-2.5 py-1">
                    <span className="font-mono block text-xs font-bold tracking-widest text-muted">
                      UNIT {box}
                    </span>
                    <span className="font-display block text-sm font-semibold text-ink">
                      Larger portfolio
                    </span>
                  </div>
                  <span
                    className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface/60"
                    aria-hidden="true"
                  >
                    <span className="h-2.5 w-0.5 bg-line" />
                  </span>
                </div>
                <div className="my-4 h-1.5 w-full border border-line bg-felt/60" aria-hidden="true" />
                <p className="text-sm text-muted">
                  {box === '104'
                    ? 'Ten or more units across Portland? Ask about custom portfolio pricing.'
                    : 'Mixed residential walk-ups or family-held buildings? Write to our team.'}
                </p>
                <div className="mt-4 border-t border-line pt-3">
                  <SiteLink href="/contact/" className="font-mono text-xs font-semibold text-primary-ink uppercase hover:underline">
                    Ask about larger portfolios →
                  </SiteLink>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
