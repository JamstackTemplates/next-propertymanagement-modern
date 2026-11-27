import { computeExampleStatement, formatUsd } from '../content/fees';

/**
 * Folded A4 monthly owner statement computed directly from content/fees.ts.
 * Recomputes automatically whenever the Full Management percentage changes.
 */
export function OwnerStatementCard() {
  const stmt = computeExampleStatement();

  return (
    <div className="relative border-[1.5px] border-ink bg-surface p-6 text-ink shadow-[8px_8px_0_var(--surface-2)] sm:p-8 lg:rotate-2">
      {/* Perforated edge */}
      <div className="perforated-top -mx-6 -mt-2 mb-5 px-6 pt-3 sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
            Example statement · Not a real property
          </span>
          {/* Rust PAID stamp */}
          <span className="-rotate-3 border-2 border-primary px-2.5 py-0.5 font-mono text-xs font-bold tracking-[0.2em] text-primary-ink uppercase">
            PAID · 10TH
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
        <div>
          <p className="font-display text-lg font-bold">Alder Key Owner Statement</p>
          <p className="font-mono text-xs text-muted">UNIT 2B · SE BUCKMAN · SAMPLE MONTH</p>
        </div>
        <span className="font-mono text-xs text-muted">PLAN: FULL MGMT</span>
      </div>

      <dl className="mt-4 space-y-3 font-mono text-sm">
        <div className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2">
          <dt className="font-sans text-ink">Rent collected</dt>
          <dd className="font-bold text-ink">{formatUsd(stmt.rentCollectedUsd)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2">
          <dt className="font-sans text-ink">
            Management fee ({stmt.managementPercent}%)
          </dt>
          <dd className="text-primary-ink">−{formatUsd(stmt.managementFeeUsd)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-2">
          <dt className="font-sans text-ink">
            Plumber invoice (at cost, PDF attached)
          </dt>
          <dd className="text-muted">−{formatUsd(stmt.plumberInvoiceUsd)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 pt-2 text-base">
          <dt className="font-display font-bold text-ink">Net to owner</dt>
          <dd className="text-lg font-bold text-leaf">{formatUsd(stmt.netToOwnerUsd)}</dd>
        </div>
      </dl>
    </div>
  );
}
