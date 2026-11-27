import type { Metadata } from 'next';
import { AlderLeafMotif, FloorPlanDivider, LeasingFloorPlanArt } from '../components/art';
import { HeroImage } from '../components/hero-image';
import { LetterboxBank } from '../components/letterbox-bank';
import { OwnerStatementCard } from '../components/owner-statement';
import { CropMarks, DoorSwingDecor, HeroBlueprintDecor, RailEdge, RiverMapDecor, SlabEdge, TearEdge, TractorFeed } from '../components/decor';
import { AppraisalBand, SectionHeader } from '../components/sections';
import { SiteLink } from '../components/site-link';
import { business, telHref } from '../content/business';
import { getHeadlineManagementPercent } from '../content/fees';
import { leasingSteps } from '../content/leasing-steps';
import { neighbourhoods } from '../content/neighbourhoods';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

const headlinePct = getHeadlineManagementPercent();

export const metadata: Metadata = {
  title: `${business.name} — Portland Residential Property Management`,
  description: `Alder Key manages and leases rental homes across Portland for a clear ${headlinePct}% of collected rent. See every fee, request a free rental appraisal, or report a repair.`,
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const schema = businessStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />

      {/* 1. HERO — Concrete ground, asymmetric 12-col composition; cropped lobby band at 390px */}
      <section className="bg-concrete relative overflow-x-clip">
        <HeroBlueprintDecor />
        {/* Mobile hero rendering band, cropped to the lobby corner */}
        <div className="relative block lg:hidden">
          <HeroImage className="aspect-[4/3] max-h-[22rem] w-full sm:aspect-[16/9]" />
        </div>

        <div className="wrap relative grid items-center gap-8 pt-5 pb-14 lg:grid-cols-12 lg:pt-14 lg:pb-20">
          <div className="relative z-10 -mt-9 bg-bg/95 pt-3 lg:col-span-6 lg:mt-0 lg:bg-transparent lg:pt-0">
            <p className="kicker">Portland, Oregon · Residential Management</p>
            <h1 className="mt-2.5 text-[clamp(2.35rem,5.8vw,4.5rem)] font-bold tracking-tight text-ink">
              Your rental, properly kept.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              We find the right tenant, collect the rent, fix what breaks and send you a plain
              statement every month — for{' '}
              <strong className="font-mono font-bold text-ink">{headlinePct}%</strong> of the rent
              we actually collect.
            </p>

            {/* Mono headline fee plate */}
            <div className="mt-5 inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 border-[1.5px] border-ink bg-surface px-4 py-2.5">
              <span className="font-mono text-2xl font-bold text-primary-ink sm:text-3xl">
                {headlinePct}%
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider text-ink uppercase sm:text-sm">
                of collected rent · Full Management
              </span>
            </div>

            {/* Primary & secondary actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SiteLink href="/appraisal/" className="button w-full sm:w-auto">
                Request a rental appraisal
              </SiteLink>
              <SiteLink
                href="/tenants/"
                className="button button-quiet hidden sm:inline-flex"
              >
                Report a repair
              </SiteLink>
              <SiteLink
                href="/tenants/"
                className="text-link inline-block py-1 font-mono text-sm font-semibold sm:hidden"
              >
                Tenant? Report a repair →
              </SiteLink>
            </div>

            {/* Address chip */}
            <p className="mt-6 inline-flex items-center gap-2 border border-line bg-surface/80 px-3 py-1.5 font-mono text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
              <span>
                {business.address.suite}, {business.address.street} · {business.address.city}, {business.address.region}
              </span>
            </p>
          </div>

          {/* Desktop rendering bleeding off the right edge: blueprint dissolving into the building */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="-my-8 -mr-8 -ml-16 xl:-mr-16 xl:-ml-28">
              <HeroImage className="aspect-[1200/896] w-full" />
            </div>
          </div>
        </div>
      </section>

      <SlabEdge label={`L1 · Lobby ±0'-0"`} />

      {/* 2. WHICH DOOR IS YOURS? — Full-bleed split into two tall lobby doors */}
      <section aria-labelledby="doors-heading">
        <h2 id="doors-heading" className="sr-only">Which door is yours?</h2>
        <div className="grid md:grid-cols-2">
          {/* Rust Landlord Door */}
          <div className="relative overflow-hidden border-b-[1.5px] border-ink bg-primary px-6 py-12 text-white md:border-r-[1.5px] md:border-b-0 md:px-12 md:py-16">
            <DoorSwingDecor hinge="left" />
            {/* Aluminium push plate */}
            <div
              className="pointer-events-none absolute top-1/2 right-6 hidden h-28 w-5 -translate-y-1/2 border border-ink bg-surface-2/90 md:block"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-lg">
              <p className="font-mono text-xs tracking-[0.18em] text-white/80 uppercase">
                DOOR A · LANDLORDS &amp; OWNERS
              </p>
              <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                I own a rental
              </h3>
              <p className="mt-3 text-base text-white/90">
                Whether you are renting out your first Portland bungalow or handing over a six-unit
                walk-up, every fee is printed before you sign.
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-white/25 pt-5 font-mono text-sm">
                <li>
                  <SiteLink href="/fees/" className="inline-flex items-center gap-2 text-white underline hover:text-glow">
                    <span>01</span> <span>See every fee &amp; estimate your rent →</span>
                  </SiteLink>
                </li>
                <li>
                  <SiteLink href="/appraisal/" className="inline-flex items-center gap-2 text-white underline hover:text-glow">
                    <span>02</span> <span>Request a free rental appraisal →</span>
                  </SiteLink>
                </li>
                <li>
                  <a href="#neighbourhoods" className="inline-flex items-center gap-2 text-white underline hover:text-glow">
                    <span>03</span> <span>Check neighbourhood availability →</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Leaf Tenant Door */}
          <div className="relative overflow-hidden bg-felt px-6 py-12 text-felt-ink md:px-12 md:py-16">
            <div className="text-felt-leaf">
              <DoorSwingDecor hinge="right" />
            </div>
            <div
              className="pointer-events-none absolute top-1/2 left-6 hidden h-28 w-5 -translate-y-1/2 border border-line bg-leaf/80 md:block"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-lg md:pl-8">
              <p className="font-mono text-xs tracking-[0.18em] text-felt-leaf uppercase">
                DOOR B · TENANTS OF MANAGED HOMES
              </p>
              <h3 className="mt-2 text-3xl font-bold text-felt-ink sm:text-4xl">
                I rent from Alder Key
              </h3>
              <p className="mt-3 text-base text-felt-muted">
                Something leaking, cold or broken? Skip the sales form and go straight to our
                maintenance desk or 24/7 emergency line.
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-line/40 pt-5 font-mono text-sm">
                <li>
                  <SiteLink href="/tenants/" className="inline-flex items-center gap-2 text-felt-ink underline hover:text-glow">
                    <span className="text-felt-leaf">01</span> <span>Report a repair &amp; see response aims →</span>
                  </SiteLink>
                </li>
                <li>
                  <a href={telHref(business.emergencyPhone)} className="inline-flex items-center gap-2 text-glow underline hover:text-felt-ink">
                    <span className="text-felt-leaf">02</span> <span>24/7 emergency line: {business.emergencyPhone}</span>
                  </a>
                </li>
                <li>
                  <SiteLink href="/tenants/#moving-out" className="inline-flex items-center gap-2 text-felt-ink underline hover:text-glow">
                    <span className="text-felt-leaf">03</span> <span>Moving-out checklist &amp; deposit guide →</span>
                  </SiteLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SlabEdge label={`L2 · Plans +10'-6"`} />

      {/* 3. THE PLANS — Brushed-aluminium band with signature Letterbox Bank */}
      <section aria-labelledby="plans-heading" className="bg-aluminium py-14 md:py-20">
        <div className="wrap">
          <SectionHeader
            id="plans-heading"
            kicker="L2 · Management plans"
            title="Pick a box, open the door"
            action={
              <SiteLink href="/fees/" className="text-link font-mono text-sm font-semibold">
                See every fee →
              </SiteLink>
            }
          />
          <p className="mt-3 max-w-2xl text-muted">
            Three straightforward plans for Portland landlords. Open any letterbox door to inspect
            what is included. Your written management agreement sets the final fee terms.
          </p>

          <div className="mt-8">
            <LetterboxBank defaultOpenFirst />
          </div>
        </div>
      </section>

      <FloorPlanDivider variant="kitchen" />

      {/* 4. HOW A LEASE COMES TOGETHER — Concrete background + apartment floor plan walking route */}
      <section aria-labelledby="leasing-heading" className="bg-concrete relative py-14 md:py-20">
        <CropMarks />
        <div className="wrap relative">
          <SectionHeader
            id="leasing-heading"
            kicker="L3 · Eight-step walkthrough"
            title="How a lease comes together"
            action={
              <SiteLink href="/fees/#leasing-process" className="text-link font-mono text-sm font-semibold">
                See plan coverage →
              </SiteLink>
            }
          />

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
            {/* Floor plan with dotted walking route (desktop) */}
            <div className="hidden lg:sticky lg:top-24 lg:col-span-7 lg:block">
              <LeasingFloorPlanArt />
              <div className="mt-3 flex items-center gap-5 font-mono text-xs text-muted">
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
                  Steps 1–6: All plans
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-leaf" aria-hidden="true" />
                  Steps 7–8: Full Management &amp; Small Building
                </span>
              </div>
            </div>

            {/* Compact numbered list */}
            <ol className="grid gap-3 lg:col-span-5">
              {leasingSteps.map(step => (
                <li
                  key={step.id}
                  className="flex items-start gap-3.5 border border-line bg-surface p-4"
                >
                  <span
                    className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink font-mono text-xs font-bold text-white ${
                      step.order >= 7 ? 'bg-leaf' : 'bg-primary'
                    }`}
                  >
                    {step.order}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <RailEdge />

      {/* 5. WHERE WE MANAGE — Felt directory board over a faint map of the Willamette and its bridges */}
      <section
        id="neighbourhoods"
        aria-labelledby="neighbourhoods-heading"
        className="bg-felt-board relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-24"
      >
        <RiverMapDecor />
        <div className="wrap relative">
          <div className="border-[1.5px] border-line/50 bg-felt/70 p-6 sm:p-10">
            <SectionHeader
              id="neighbourhoods-heading"
              kicker="L4 · Portland directory"
              title="Where we manage"
              light
              action={
                <div className="flex flex-wrap gap-4 font-mono text-xs text-felt-muted">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-felt-leaf" aria-hidden="true" />
                    Taking new homes
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-glow" aria-hidden="true" />
                    Waitlist
                  </span>
                </div>
              }
            />

            <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {neighbourhoods.map(area => {
                const isOpen = area.intake === 'open';
                return (
                  <li
                    key={area.id}
                    className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line/35 pb-3 font-mono"
                  >
                    <div>
                      <span className="text-base font-bold tracking-wide text-felt-ink uppercase">
                        {area.name}
                      </span>
                      <span className="ml-2 text-xs text-felt-muted">{area.quadrant}</span>
                      <p className="mt-0.5 font-sans text-xs text-felt-muted">
                        {area.homeTypes.join(' · ')}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-felt-leaf' : 'bg-glow'}`}
                        aria-hidden="true"
                      />
                      <span className={isOpen ? 'text-felt-leaf' : 'text-glow'}>
                        {isOpen ? 'Taking new homes' : 'Waitlist'}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. WHAT LANDS IN YOUR INBOX — Surface paper band with tilted example owner statement */}
      <section aria-labelledby="statement-heading" className="relative bg-surface py-14 md:py-20">
        <TearEdge />
        <TearEdge side="bottom" />
        <TractorFeed />
        <div className="wrap relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <OwnerStatementCard />
          </div>
          <div className="lg:col-span-6 lg:pl-6">
            <p className="kicker">L5 · Monthly reporting</p>
            <h2 id="statement-heading" className="mt-2 text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold text-ink">
              What lands in your inbox
            </h2>
            <p className="mt-3 text-base text-muted">
              No portal maze or mystery line items. Every month you get one plain statement with
              every dollar accounted for.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <AlderLeafMotif className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Paid by the 10th</h3>
                  <p className="text-sm text-muted">
                    Collected rent is transferred straight to your bank account by the 10th of each month.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlderLeafMotif className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Contractor invoices attached</h3>
                  <p className="text-sm text-muted">
                    Every repair line arrives with the original licensed tradesperson’s PDF invoice.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <AlderLeafMotif className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <h3 className="font-display text-base font-bold text-ink">No markup, no vacancy fee</h3>
                  <p className="text-sm text-muted">
                    You pay repairs at cost, and you pay $0 management fee while a home is vacant.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. APPRAISAL CTA — Full-bleed rust band with overlapping AppraisalSheetArt */}
      <AppraisalBand>
        <AppraisalBand.Kicker>Free Portland rental appraisal</AppraisalBand.Kicker>
        <AppraisalBand.Heading>Find out what your home should rent for</AppraisalBand.Heading>
        <AppraisalBand.Body>
          We walk through the property, pull recent Portland comparable lets and send you a written
          market rent estimate — with no obligation to sign.
        </AppraisalBand.Body>
        <AppraisalBand.Action href="/appraisal/">Request a rental appraisal →</AppraisalBand.Action>
      </AppraisalBand>
    </>
  );
}
