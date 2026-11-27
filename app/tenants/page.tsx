import type { Metadata } from 'next';
import { AlderLeafMotif, DoorHangerCard } from '../../components/art';
import { Icon } from '../../components/icons';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { SectionHeader } from '../../components/sections';
import { CropMarks, RailEdge, SlabEdge } from '../../components/decor';
import { business, telHref } from '../../content/business';
import { maintenanceEmailChecklist, maintenanceTiers } from '../../content/maintenance';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Tenants & repairs',
  description:
    'Report a repair for an Alder Key managed home in Portland: 24/7 emergency line, maintenance email checklist, rent and lease FAQs, and moving-out guide.',
  alternates: { canonical: absoluteUrl('/tenants/') },
};

const RENT_FAQ = [
  {
    q: 'When is rent due and how do I pay?',
    a: 'Rent is due on the 1st of each month via the online tenant payment portal listed in your lease packet. Check payments can also be dropped off at Suite 410 during office hours.',
  },
  {
    q: 'Can I add a roommate or a pet to my lease?',
    a: 'Yes, subject to the home’s occupancy and pet terms. Email hello@alderkey.example before anyone moves in so we can send the standard application and written addendum.',
  },
  {
    q: 'How do lease renewals work?',
    a: 'We reach out at least 60 days before your lease end date with renewal options or month-to-month terms in line with Oregon and City of Portland notice rules.',
  },
  {
    q: 'Should I use the website Contact form for a repair?',
    a: 'No — the website enquiry form is for landlord appraisals and general questions only. For repairs, always call the 24/7 emergency line or email maintenance@alderkey.example directly.',
  },
] as const;

const MOVING_OUT_STEPS = [
  'Give written notice according to your lease terms (at least 30 days ahead).',
  'Leave the home broom-clean, empty of personal belongings and with appliances wiped out.',
  'Replace burnt-out standard light bulbs and return all keys, fobs and mailbox keys to Suite 410.',
  'Share your forwarding address so we can send your itemised deposit accounting and refund within Oregon’s statutory timeframe.',
] as const;

export default function TenantsPage() {
  const emergencyTier = maintenanceTiers.find(t => t.id === 'emergency');
  const sortedTiers = [...maintenanceTiers].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHead
        kicker="L1 · Tenants"
        title="Something broken? Start here."
        planCode="REPAIR · TRIAGE"
      >
        <p>
          For residents of homes managed by Alder Key. The website enquiry form is{' '}
          <strong className="font-semibold text-ink">not for repairs</strong> — use the emergency
          line or maintenance email below so your request reaches the right desk immediately.
        </p>
      </PageHead>

      {/* Gas / fire safety warning + Three door hangers on a rail */}
      <section aria-labelledby="triage-heading" className="bg-concrete pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="wrap">
          {emergencyTier?.firstStep ? (
            <div
              role="note"
              className="mb-8 border-2 border-primary bg-surface p-5 text-ink"
            >
              <p className="font-mono text-xs font-bold tracking-widest text-primary-ink uppercase">
                Safety first · Gas smell or fire
              </p>
              <p className="mt-1.5 text-base font-medium text-ink">
                {emergencyTier.firstStep}
              </p>
            </div>
          ) : null}

          <SectionHeader
            id="triage-heading"
            kicker="Maintenance triage"
            title="Pick the hanger that matches the problem"
          />

          {/* Aluminium hanger rail */}
          <div className="mt-7 border-t-4 border-ink pt-6">
            <div className="grid items-start gap-6 lg:grid-cols-12">
              {sortedTiers.map(tier => {
                const isEmergency = tier.id === 'emergency';
                return (
                  <div
                    key={tier.id}
                    className={isEmergency ? 'lg:col-span-5' : 'lg:col-span-3 lg:last:col-span-4'}
                  >
                    <DoorHangerCard accent={tier.id} size={isEmergency ? 'large' : 'normal'}>
                      <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
                        <span className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
                          TIER 0{tier.order}
                        </span>
                        <Icon name={tier.icon} className="h-6 w-6 text-ink" />
                      </div>

                      <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                        {tier.label}
                      </h3>

                      <ul className="mt-3 space-y-2 text-sm text-ink">
                        {tier.examples.map(ex => (
                          <li key={ex} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ink" aria-hidden="true" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 border-t border-line pt-4">
                        <p className="font-mono text-xs text-muted">{tier.responseAim}</p>
                        <div className="mt-4">
                          {tier.howToReport === 'call-emergency-line' ? (
                            <a
                              href={telHref(business.emergencyPhone)}
                              className="button w-full font-mono text-sm"
                            >
                              Call 24/7: {business.emergencyPhone}
                            </a>
                          ) : (
                            <a
                              href={`mailto:${business.maintenanceEmail}?subject=${encodeURIComponent(`${tier.label} repair request`)}`}
                              className="button button-leaf w-full font-mono text-xs sm:text-sm"
                            >
                              Email {business.maintenanceEmail}
                            </a>
                          )}
                        </div>
                      </div>
                    </DoorHangerCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SlabEdge label={`L1 · Maintenance desk`} />

      {/* What to put in a maintenance email — envelope + checklist */}
      <section aria-labelledby="email-checklist-heading" className="bg-aluminium py-12 md:py-16">
        <div className="wrap grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker">Faster dispatch</p>
            <h2 id="email-checklist-heading" className="mt-2 text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold text-ink">
              What to put in a maintenance email
            </h2>
            <p className="mt-3 text-base text-muted">
              Sending photos and entry details in your first message lets us book the right trade
              without back-and-forth emails.
            </p>
            <p className="mt-4 font-mono text-sm">
              Send to:{' '}
              <a className="text-link font-bold" href={`mailto:${business.maintenanceEmail}`}>
                {business.maintenanceEmail}
              </a>
            </p>
          </div>

          <div className="border-[1.5px] border-ink bg-surface p-6 sm:p-8 lg:col-span-7">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <span className="font-mono text-xs font-bold tracking-widest text-muted uppercase">
                TO: {business.maintenanceEmail}
              </span>
              <Icon name="envelope" className="h-5 w-5 text-ink" />
            </div>
            <ul className="space-y-3">
              {maintenanceEmailChecklist.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink sm:text-base">
                  <span className="font-mono text-xs font-bold text-primary-ink">0{i + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <RailEdge />

      {/* Rent & lease FAQ as filing tabs */}
      <section aria-labelledby="faq-heading" className="relative bg-surface pt-12 pb-16 md:pt-16 md:pb-20">
        <CropMarks />
        <div className="wrap max-w-4xl">
          <SectionHeader
            id="faq-heading"
            kicker="Filing cabinet"
            title="Rent and lease questions"
          />

          <div className="mt-7 divide-y divide-line border-[1.5px] border-ink bg-bg">
            {RENT_FAQ.map(item => (
              <details key={item.q} className="faq-tab p-5">
                <summary className="font-display text-lg font-bold text-ink">
                  {item.q}
                </summary>
                <p className="mt-3 pl-9 text-sm leading-relaxed text-muted sm:text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Moving-out checklist + Office hours with OpenBadge */}
      <SlabEdge />

      <section id="moving-out" aria-labelledby="moveout-heading" className="bg-concrete py-12 md:py-16">
        <div className="wrap grid items-start gap-8 lg:grid-cols-12">
          {/* Moving-out clipboard */}
          <div className="border-[1.5px] border-ink bg-surface p-6 sm:p-8 lg:col-span-7">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <p className="kicker">Move-out clipboard</p>
              <Icon name="clipboard" className="h-5 w-5 text-ink" />
            </div>
            <h2 id="moveout-heading" className="font-display text-2xl font-bold text-ink">
              Moving-out checklist
            </h2>
            <ul className="mt-5 space-y-3.5">
              {MOVING_OUT_STEPS.map(step => (
                <li key={step} className="flex items-start gap-3 text-sm text-ink sm:text-base">
                  <AlderLeafMotif className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Office hours with OpenBadge */}
          <div className="border-[1.5px] border-ink bg-surface p-6 sm:p-8 lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="kicker">Office desk</p>
              <OpenBadge hours={business.hours} />
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">Office hours</h2>
            <p className="mt-1 text-sm text-muted">
              {business.address.suite}, {business.address.street}, {business.address.city}
            </p>
            <dl className="mt-5 divide-y divide-line font-mono text-sm">
              {business.hours.map(row => (
                <div key={row.day} className="flex justify-between py-2">
                  <dt className="text-muted">{row.day}</dt>
                  <dd className="font-semibold text-ink">
                    {row.opens && row.closes ? `${row.opens}–${row.closes}` : 'Closed'}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-mono text-xs text-muted">
              Office phone:{' '}
              <a className="text-link" href={telHref(business.phone)}>{business.phone}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
