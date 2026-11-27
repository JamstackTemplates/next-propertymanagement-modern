import type { Metadata } from 'next';
import { FloorPlanDivider } from '../../components/art';
import { FeeEstimator } from '../../components/fee-estimator';
import { Icon } from '../../components/icons';
import { LetterboxBank } from '../../components/letterbox-bank';
import { PageHead } from '../../components/page-head';
import { AppraisalBand, SectionHeader } from '../../components/sections';
import { CropMarks, SlabEdge, TearEdge, TractorFeed } from '../../components/decor';
import { fees, formatFeeAmount, getHeadlineManagementPercent, type FeeCategory } from '../../content/fees';
import { leasingSteps } from '../../content/leasing-steps';
import { plans } from '../../content/plans';
import { absoluteUrl } from '../../lib/paths';

const headlinePct = getHeadlineManagementPercent();

export const metadata: Metadata = {
  title: 'Fees & services',
  description: `Every management and leasing fee in plain USD: Full Management at ${headlinePct}% of collected rent, Lease-Up, Small Building, interactive rent estimator and zero hidden markups.`,
  alternates: { canonical: absoluteUrl('/fees/') },
};

const LEDGER_GROUPS: readonly { category: Exclude<FeeCategory, 'never'>; heading: string }[] = [
  { category: 'monthly', heading: 'Monthly management & care' },
  { category: 'leasing', heading: 'Tenant placement' },
  { category: 'occasional', heading: 'Renewals & inspections' },
];

export default function FeesPage() {
  const neverItems = fees.filter(item => item.category === 'never');

  return (
    <>
      <PageHead
        kicker="L2 · Fees & services"
        title="Every fee, printed up front."
        planCode="LEDGER · USD"
      >
        <p>
          Compare our three management plans, test your expected monthly rent on the intercom
          estimator, and see what will never appear on an Alder Key bill. Your written management
          agreement sets the final fee terms.
        </p>
      </PageHead>

      {/* Full-width letterbox bank with extra portfolio doors */}
      <section aria-labelledby="compare-plans-heading" className="bg-concrete pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="wrap">
          <SectionHeader
            id="compare-plans-heading"
            kicker="Three plans + custom portfolios"
            title="Plans compared"
          />
          <div className="mt-6">
            <LetterboxBank showPortfolioBoxes defaultOpenFirst />
          </div>
        </div>
      </section>

      {/* Itemised Fee Ledger — continuous-feed ledger paper */}
      <section aria-labelledby="ledger-heading" className="relative bg-surface py-12 md:py-16">
        <TearEdge />
        <TearEdge side="bottom" />
        <TractorFeed />
        <div className="wrap relative">
          <SectionHeader
            id="ledger-heading"
            kicker="Schedule of fees (USD)"
            title="Itemised fee ledger"
          />
          <p className="mt-3 max-w-2xl text-sm text-muted">
            All figures are in US dollars. Fees are set in your written management agreement.
          </p>

          <div
            className="ledger-wrap mt-7 border-[1.5px] border-ink bg-surface"
            tabIndex={0}
            role="region"
            aria-labelledby="ledger-heading"
          >
            <table className="ledger-table text-left text-sm">
              <caption className="sr-only">Itemised fee schedule by management plan</caption>
              <thead>
                <tr className="border-b-[1.5px] border-ink font-mono text-xs tracking-wider text-ink uppercase">
                  <th scope="col" className="border-b-[1.5px] border-ink px-4 py-3.5">Fee item</th>
                  {plans.map(plan => (
                    <th key={plan.id} scope="col" className="border-b-[1.5px] border-ink px-4 py-3.5">
                      {plan.name}
                      <span className="block text-[0.7rem] font-normal text-muted">BOX {plan.boxNumber}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEDGER_GROUPS.map(group => {
                  const groupItems = fees.filter(item => item.category === group.category);
                  return [
                    <tr key={`cat-${group.category}`} className="ledger-cat-row bg-bg/70">
                      <th
                        colSpan={plans.length + 1}
                        scope="colgroup"
                        className="border-b border-line px-4 py-2 font-mono text-xs font-bold tracking-widest text-muted uppercase"
                      >
                        {group.heading}
                      </th>
                    </tr>,
                    ...groupItems.map(item => (
                      <tr key={item.id} className="border-b border-line">
                        <th scope="row" className="border-b border-line px-4 py-3.5 font-normal">
                          <span className="block font-display text-base font-bold text-ink">{item.name}</span>
                          {item.note ? <span className="mt-0.5 block text-xs text-muted">{item.note}</span> : null}
                        </th>
                        {plans.map(plan => {
                          const amt = item.amounts[plan.id];
                          const isMuted = amt.kind === 'not-offered';
                          const isIncluded = amt.kind === 'included';
                          return (
                            <td
                              key={plan.id}
                              data-plan-label={plan.name}
                              className={`border-b border-line px-4 py-3.5 font-mono text-sm ${
                                isMuted
                                  ? 'text-muted'
                                  : isIncluded
                                    ? 'font-semibold text-leaf'
                                    : 'font-bold text-ink'
                              }`}
                            >
                              {formatFeeAmount(amt)}
                            </td>
                          );
                        })}
                      </tr>
                    )),
                  ];
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Lobby Intercom Fee Estimator */}
      <section aria-labelledby="estimator-heading" className="bg-aluminium mt-10 border-t-[1.5px] border-ink py-12 md:py-16">
        <div className="wrap">
          <SectionHeader
            id="estimator-heading"
            kicker="Interactive rent check"
            title="Estimate your first year"
          />
          <div className="mt-6">
            <FeeEstimator />
          </div>
        </div>
      </section>

      {/* Never on your bill — struck-through receipt */}
      <SlabEdge />

      <section aria-labelledby="never-heading" className="bg-concrete relative py-12 md:py-16">
        <CropMarks />
        <div className="wrap relative grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">Zero junk fees</p>
            <h2 id="never-heading" className="mt-2 text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold text-ink">
              Never on your bill
            </h2>
            <p className="mt-3 text-base text-muted">
              Some management companies advertise a low headline rate and make up the difference
              with onboarding fees, vacancy charges and repair markups. We strike them all out.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="border-[1.5px] border-ink bg-surface p-6 shadow-[6px_6px_0_var(--surface-2)] sm:p-8">
              <div className="perforated-top -mx-6 -mt-2 mb-4 flex items-center justify-between px-6 pt-3 sm:-mx-8 sm:px-8">
                <span className="font-mono text-xs tracking-widest text-muted uppercase">
                  ALDER KEY · VOIDED CHARGES
                </span>
                <span className="font-mono text-xs font-bold text-leaf">$0.00</span>
              </div>
              <ul className="divide-y divide-line">
                {neverItems.map(item => (
                  <li key={item.id} className="flex flex-wrap items-baseline justify-between gap-3 py-3.5">
                    <div>
                      <span className="font-display text-lg font-bold text-ink line-through decoration-primary decoration-2">
                        {item.name}
                      </span>
                      {item.note ? <p className="mt-0.5 text-sm text-muted">{item.note}</p> : null}
                    </div>
                    <span className="font-mono text-sm font-bold text-leaf uppercase">$0 · Never</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FloorPlanDivider variant="hall" />

      {/* Full leasing process — horizontal corridor of 8 doors with snap scroll */}
      <section id="leasing-process" aria-labelledby="corridor-heading" className="border-b-[1.5px] border-ink bg-surface py-12 md:py-16">
        <div className="wrap">
          <SectionHeader
            id="corridor-heading"
            kicker="Corridor · Steps 01–08"
            title="The full leasing process"
          />
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Scroll across the corridor to see which plans cover each step from pricing to renewal.
          </p>

          <ol className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
            {leasingSteps.map(step => (
              <li
                key={step.id}
                className="flex w-72 shrink-0 snap-start flex-col justify-between border-[1.5px] border-ink bg-bg p-5 lg:w-auto"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="font-mono text-sm font-bold text-primary-ink">
                      DOOR 0{step.order}
                    </span>
                    <Icon name={step.icon} className="h-5 w-5 text-ink" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.detail}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-3">
                  {plans.map(plan => {
                    const included = step.plans.includes(plan.id);
                    return (
                      <span
                        key={plan.id}
                        className={`px-2 py-0.5 font-mono text-[0.7rem] ${
                          included
                            ? 'border border-leaf bg-leaf/15 font-semibold text-ink'
                            : 'border border-line/60 text-muted line-through'
                        }`}
                      >
                        {plan.name}
                      </span>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <AppraisalBand>
        <AppraisalBand.Kicker>Next step for landlords</AppraisalBand.Kicker>
        <AppraisalBand.Heading>Want exact numbers for your property?</AppraisalBand.Heading>
        <AppraisalBand.Body>
          Ask for a free rental appraisal. We’ll visit the home, estimate its current Portland
          market rent and outline which plan fits best.
        </AppraisalBand.Body>
        <AppraisalBand.Action href="/appraisal/">See how the appraisal works →</AppraisalBand.Action>
      </AppraisalBand>
    </>
  );
}
