'use client';

import { useId, useState } from 'react';
import {
  DEFAULT_EXAMPLE_RENT,
  ESTIMATOR_MAX_RENT,
  ESTIMATOR_MIN_RENT,
  estimatePlanFees,
  formatUsd,
  formatUsdCompact,
  getFeeById,
} from '../content/fees';
import { plans } from '../content/plans';

/**
 * Lobby intercom fee estimator on /fees/.
 * Accepts monthly rent ($500–$15,000, whole dollars) and computes each plan's monthly fee,
 * leasing fee (respecting Lease-Up minimum) and first-year total directly from content/fees.ts.
 */
export function FeeEstimator() {
  const inputId = useId();
  const errorId = useId();
  const [rawInput, setRawInput] = useState(String(DEFAULT_EXAMPLE_RENT));

  const trimmed = rawInput.trim().replace(/[$,\s]/g, '');
  const parsed = /^\d+$/.test(trimmed) ? Number(trimmed) : Number.NaN;
  const isValid =
    Number.isInteger(parsed) &&
    parsed >= ESTIMATOR_MIN_RENT &&
    parsed <= ESTIMATOR_MAX_RENT;

  const estimates = isValid ? estimatePlanFees(parsed) : null;
  const fallbackEstimates = estimatePlanFees(DEFAULT_EXAMPLE_RENT);
  const mgmtFee = getFeeById('management-fee').amounts;
  const leasingFee = getFeeById('leasing-fee').amounts;

  return (
    <div className="border-[1.5px] border-ink bg-felt p-4 text-felt-ink sm:p-7">
      {/* Intercom top plate */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/40 pb-4">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-felt-muted uppercase">
            LOBBY INTERCOM · FEE ESTIMATOR
          </p>
          <p className="mt-1 text-sm text-felt-muted">
            Enter an expected monthly rent in whole US dollars ({formatUsdCompact(ESTIMATOR_MIN_RENT)}–{formatUsdCompact(ESTIMATOR_MAX_RENT)}).
          </p>
        </div>
        {/* Speaker grille dots */}
        <div className="hidden grid-cols-5 gap-1.5 sm:grid" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-line/60" />
          ))}
        </div>
      </div>

      {/* Rent input */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 max-w-xs">
          <label
            htmlFor={inputId}
            className="font-mono block text-xs font-semibold tracking-wider text-felt-ink uppercase"
          >
            Monthly rent (USD)
          </label>
          <div className="mt-1.5 flex items-center border-[1.5px] border-line bg-surface text-ink focus-within:border-glow">
            <span className="px-3 font-mono text-lg font-bold text-muted" aria-hidden="true">$</span>
            <input
              id={inputId}
              type="text"
              inputMode="numeric"
              value={rawInput}
              onChange={e => setRawInput(e.target.value)}
              aria-invalid={!isValid}
              aria-describedby={!isValid ? errorId : undefined}
              className="w-full bg-transparent py-2.5 pr-3 font-mono text-lg font-bold text-ink focus:outline-none"
            />
          </div>
        </div>

        {/* Quick preset buttons */}
        <div className="flex flex-wrap gap-2">
          {[1200, 2400, 3600].map(preset => (
            <button
              key={preset}
              type="button"
              onClick={() => setRawInput(String(preset))}
              className={`border px-3 py-2 font-mono text-xs font-semibold transition-colors ${
                parsed === preset
                  ? 'border-glow bg-glow text-felt'
                  : 'border-line/60 bg-transparent text-felt-ink hover:border-felt-ink'
              }`}
            >
              {formatUsdCompact(preset)}/mo
            </button>
          ))}
        </div>
      </div>

      {/* Inline validation error */}
      {!isValid ? (
        <p id={errorId} role="alert" className="mt-3 font-mono text-sm text-glow">
          Enter a whole dollar rent between {formatUsdCompact(ESTIMATOR_MIN_RENT)} and {formatUsdCompact(ESTIMATOR_MAX_RENT)} (for example 2400).
        </p>
      ) : null}

      {/* Mono readout panels */}
      <div className="mt-6 grid gap-4 md:grid-cols-3" aria-live="polite">
        {plans.map(plan => {
          const item = estimates ? estimates[plan.id] : null;
          return (
            <div
              key={plan.id}
              className="border border-line/50 bg-black/25 p-4"
            >
              <div className="flex items-baseline justify-between border-b border-line/35 pb-2">
                <span className="font-display text-base font-bold text-felt-ink">{plan.name}</span>
                <span className="font-mono text-xs text-felt-muted">BOX {plan.boxNumber}</span>
              </div>
              <dl className="mt-3 space-y-2 font-mono text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-felt-muted">Monthly fee</dt>
                  <dd className="font-bold text-felt-ink">
                    {item ? (item.monthlyFeeUsd > 0 ? `${formatUsd(item.monthlyFeeUsd)}/mo` : '—') : '—'}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-felt-muted">Tenant placement</dt>
                  <dd className="font-bold text-felt-ink">
                    {item ? formatUsd(item.leasingFeeUsd) : '—'}
                  </dd>
                </div>
                {item?.minimumApplied ? (
                  <p className="text-xs text-glow">
                    Lease-Up minimum ({formatUsdCompact(leasingFee['lease-up'].kind === 'percent' ? (leasingFee['lease-up'].minimumUsd ?? 0) : 0)}) applied.
                  </p>
                ) : null}
                <div className="flex justify-between gap-2 border-t border-line/35 pt-2">
                  <dt className="text-felt-muted">First-year total</dt>
                  <dd className="text-base font-bold text-glow">
                    {item ? formatUsd(item.firstYearTotalUsd) : '—'}
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>

      {/* No-JS static worked example */}
      <noscript>
        <div className="mt-6 border border-line/50 bg-black/30 p-4 font-mono text-xs text-felt-ink">
          <p className="font-bold text-glow">Worked example at {formatUsdCompact(DEFAULT_EXAMPLE_RENT)}/month rent (JavaScript off):</p>
          <ul className="mt-2 space-y-1">
            {plans.map(plan => {
              const ex = fallbackEstimates[plan.id];
              const m = mgmtFee[plan.id];
              const l = leasingFee[plan.id];
              const mDesc = m.kind === 'percent' ? `${m.value}% monthly` : 'no monthly fee';
              const lDesc = l.kind === 'percent'
                ? `${l.value}% placement${l.minimumUsd ? ` (min ${formatUsdCompact(l.minimumUsd)})` : ''}`
                : 'placement';
              return (
                <li key={plan.id}>
                  {plan.name}: {mDesc} ({formatUsd(ex.monthlyFeeUsd)}/mo) + {lDesc} ({formatUsd(ex.leasingFeeUsd)}) = {formatUsd(ex.firstYearTotalUsd)} first-year total.
                </li>
              );
            })}
          </ul>
        </div>
      </noscript>

      <p className="mt-5 font-mono text-xs text-felt-muted">
        Estimate only — your management agreement sets the fees. First-year total assumes 12 months of collected rent plus one initial placement.
      </p>
    </div>
  );
}
