import type { Metadata } from 'next';
import { AlderLeafMotif, AppraisalSheetArt, FloorPlanDivider } from '../../components/art';
import { PageHead } from '../../components/page-head';
import { SectionHeader } from '../../components/sections';
import { SiteLink } from '../../components/site-link';
import { CropMarks, SlabEdge } from '../../components/decor';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Rental appraisal',
  description:
    'Request a free Portland rental appraisal from Alder Key: market rent estimate, three comparable lets, make-ready notes and leasing timeline.',
  alternates: { canonical: absoluteUrl('/appraisal/') },
};

const INCLUDED_ITEMS = [
  {
    code: 'A1',
    title: 'Estimated monthly rent range',
    detail: 'A realistic low-to-high range grounded in current Portland demand, not a headline number designed to win your signature.',
  },
  {
    code: 'A2',
    title: 'Three recent comparable lets',
    detail: 'Actual nearby homes with matching bedroom count, condition and neighbourhood that leased recently.',
  },
  {
    code: 'A3',
    title: 'Practical make-ready notes',
    detail: 'Small repairs or refreshes worth doing before listing — and the costly renovations you can skip.',
  },
  {
    code: 'A4',
    title: 'Plan & first-year cost breakdown',
    detail: 'Clear side-by-side numbers for Lease-Up, Full Management or Small Building based on your rent range.',
  },
] as const;

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Send the basics',
    detail: 'Use our Contact page to tell us the address, layout and rough timing. We’ll reply to arrange a time to visit.',
  },
  {
    num: '02',
    title: 'On-site walk-through',
    detail: 'Appraisals happen at the property (about 30 minutes). We measure key rooms, note light and finish, and answer your questions.',
  },
  {
    num: '03',
    title: 'Written appraisal sheet',
    detail: 'Within two business days we email your written rent estimate and comparable lets. Take as long as you need to decide.',
  },
] as const;

export default function AppraisalPage() {
  return (
    <>
      <PageHead
        kicker="L3 · Rental appraisal"
        title="Know what your home can rent for."
        art={<AppraisalSheetArt className="w-full max-w-xs md:max-w-sm" />}
      >
        <p>
          A free, on-site Portland rental appraisal before you commit to anything. An appraisal is a
          market rent estimate — not a guarantee of rent or a formal property valuation.
        </p>
      </PageHead>

      {/* What your appraisal includes — 4 annotated entries */}
      <section aria-labelledby="includes-heading" className="bg-concrete pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="wrap">
          <SectionHeader
            id="includes-heading"
            kicker="Annotated sheet"
            title="What your appraisal includes"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {INCLUDED_ITEMS.map(item => (
              <div
                key={item.code}
                className="relative border-[1.5px] border-ink bg-surface p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="border border-ink bg-surface-2 px-2 py-0.5 font-mono text-xs font-bold text-primary-ink">
                    {item.code}
                  </span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SlabEdge label={`L3 · Walk-through`} />

      {/* How it works — three oversized mono numerals */}
      <section aria-labelledby="how-heading" className="bg-aluminium py-12 md:py-16">
        <div className="wrap">
          <SectionHeader
            id="how-heading"
            kicker="Three steps"
            title="How it works"
          />

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS.map(step => (
              <li key={step.num} className="border-[1.5px] border-ink bg-surface p-6">
                <span className="font-mono block text-5xl font-bold leading-none text-primary-ink">
                  {step.num}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FloorPlanDivider variant="bedroom" />

      {/* Example appraisal report on clipboard */}
      <section aria-labelledby="example-heading" className="relative border-b-[1.5px] border-ink bg-surface py-12 md:py-16">
        <CropMarks />
        <div className="wrap relative">
          <SectionHeader
            id="example-heading"
            kicker="Sample output"
            title="What an appraisal sheet looks like"
          />

          <div className="mt-8 border-[1.5px] border-ink bg-felt p-4 sm:p-6">
            <div className="border-[1.5px] border-ink bg-surface p-6 text-ink sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-ink pb-4">
                <div>
                  <p className="font-mono text-xs font-bold tracking-widest text-primary-ink uppercase">
                    Example — not a real property
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                    2-bed, 1-bath upper flat, Sellwood-Moreland
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    APPROX. 880 SQ FT · SHARED YARD · OFF-STREET PARKING
                  </p>
                </div>
                <div className="border-[1.5px] border-ink bg-surface-2 px-4 py-2.5 text-right">
                  <span className="font-mono block text-[0.7rem] text-muted uppercase">Estimated rent</span>
                  <span className="font-mono text-xl font-bold text-primary-ink">$2,150–$2,300/mo</span>
                </div>
              </div>

              <div className="mt-6 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="font-mono text-xs font-bold tracking-wider text-muted uppercase">
                    Three comparable lets
                  </h4>
                  <ul className="mt-3 divide-y divide-line font-mono text-sm">
                    <li className="flex justify-between py-2.5">
                      <span className="font-sans text-ink">SE Milwaukie Ave · 2bd / 1ba · 840 sq ft</span>
                      <span className="font-bold text-ink">$2,195/mo</span>
                    </li>
                    <li className="flex justify-between py-2.5">
                      <span className="font-sans text-ink">SE 13th Ave · 2bd / 1ba · 900 sq ft</span>
                      <span className="font-bold text-ink">$2,250/mo</span>
                    </li>
                    <li className="flex justify-between py-2.5">
                      <span className="font-sans text-ink">SE Tacoma St · 2bd / 1ba · 920 sq ft</span>
                      <span className="font-bold text-ink">$2,300/mo</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold tracking-wider text-muted uppercase">
                    Make-ready notes
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-sm text-ink">
                    <li className="flex items-start gap-2.5">
                      <AlderLeafMotif className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>Repaint the entry hallway in matte white to brighten the stair landing.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <AlderLeafMotif className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>Replace the noisy bathroom exhaust fan before listing photos.</span>
                    </li>
                  </ul>
                  <p className="mt-4 border-t border-line pt-3 font-mono text-xs text-muted">
                    Note: This appraisal is a market rent estimate, not a guarantee of rent or a formal valuation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Put this in your message + CTA to Contact */}
      <section aria-labelledby="checklist-heading" className="bg-concrete py-12 md:py-16">
        <div className="wrap grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker">Before you write</p>
            <h2 id="checklist-heading" className="mt-2 text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold text-ink">
              Put this in your message
            </h2>
            <p className="mt-3 text-base text-muted">
              A few details help us pull comparable lets before we reply to arrange a walk-through.
            </p>
            <ul className="mt-5 space-y-3">
              {business.enquiries.usefulToInclude.map(item => (
                <li key={item} className="flex items-start gap-3 text-base text-ink">
                  <AlderLeafMotif className="mt-1 h-5 w-5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-[1.5px] border-ink bg-surface p-6 sm:p-8 lg:col-span-5">
            <p className="kicker">Ready when you are</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink">
              Ask for an appraisal
            </h3>
            <p className="mt-3 text-sm text-muted">
              Send an enquiry through our Contact page or email{' '}
              <a className="text-link" href={`mailto:${business.email}`}>{business.email}</a>.
              We’ll reply to arrange a time at the property — nothing is booked until we confirm together.
            </p>
            <div className="mt-6">
              <SiteLink href="/contact/" className="button w-full">
                Ask for an appraisal →
              </SiteLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
