import type { Metadata } from 'next';
import { AlderLeafMotif } from '../../components/art';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { SiteLink } from '../../components/site-link';
import { RailEdge, RiverMapDecor } from '../../components/decor';
import { business, telHref } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      {/* Felt directory-board header */}
      <header className="bg-felt-board relative overflow-hidden py-10 md:py-14">
        <RiverMapDecor />
        <div className="wrap relative">
          <div className="border-[1.5px] border-line/50 bg-felt/70 p-6 sm:p-8">
            <p className="font-mono text-xs tracking-[0.2em] text-felt-muted uppercase">
              ALDER KEY · {business.address.suite.toUpperCase()} · L4
            </p>
            <h1 className="mt-3 text-[clamp(2.25rem,5.2vw,3.75rem)] font-bold text-felt-ink">
              {business.enquiries.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-felt-muted sm:text-lg">
              {business.enquiries.introduction}
            </p>
          </div>
        </div>
      </header>
      <RailEdge />

      <div className="bg-concrete py-12 md:py-16">
        <div className="wrap grid items-start gap-10 lg:grid-cols-12">
          {/* Left column: Put this in your message + Hosted form or email fallback */}
          <section aria-label="Landlord enquiry form" className="space-y-6 lg:col-span-7">
            <div className="border-[1.5px] border-ink bg-surface p-6 sm:p-8">
              <p className="kicker">For landlords &amp; appraisals</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                Put this in your message
              </h2>
              <ul className="mt-4 grid gap-2.5 text-sm text-muted sm:grid-cols-2">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip} className="flex items-start gap-2">
                    <AlderLeafMotif className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-line pt-6">
                {hosted ? (
                  <JamstacksSupportForm
                    siteId={site.jamstacksSite}
                    embedUrl={site.jamstacksEmbedUrl}
                    email={business.email}
                  />
                ) : (
                  <div className="border border-line bg-bg p-5">
                    <h3 className="font-display text-lg font-bold text-ink">
                      Email our leasing desk directly
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      The online enquiry form is not connected in this preview. Send your message to{' '}
                      <a className="text-link font-mono font-semibold" href={`mailto:${business.email}`}>
                        {business.email}
                      </a>{' '}
                      and we’ll reply to arrange a time.
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-5 font-mono text-xs text-muted">
                Enquiries only — we’ll reply to arrange a walk-through or call. Fees are set in your
                written management agreement.
              </p>
            </div>
          </section>

          {/* Right column: Direct email, Office details, Map, Hours, Tenant redirect panel */}
          <aside aria-label="Office details and tenant maintenance redirect" className="space-y-6 lg:col-span-5">
            {/* Tenant redirect panel (always visible) */}
            <div className="border-2 border-leaf bg-surface p-6">
              <p className="font-mono text-xs font-bold tracking-widest text-leaf uppercase">
                Tenants of managed homes
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-ink">
                Tenants: this form isn’t for repairs
              </h2>
              <p className="mt-2 text-sm text-muted">
                For urgent or routine maintenance, email our repairs desk directly. For emergencies
                (no heat below 55°F, active leaks, security locks), call our 24/7 line.
              </p>
              <div className="mt-4 space-y-2 font-mono text-sm">
                <p>
                  Repairs:{' '}
                  <a className="text-link font-bold" href={`mailto:${business.maintenanceEmail}`}>
                    {business.maintenanceEmail}
                  </a>
                </p>
                <p>
                  24/7 emergency:{' '}
                  <a className="text-link font-bold" href={telHref(business.emergencyPhone)}>
                    {business.emergencyPhone}
                  </a>
                </p>
              </div>
              <div className="mt-4">
                <SiteLink href="/tenants/" className="text-link font-mono text-xs font-semibold uppercase">
                  Open tenant repair triage →
                </SiteLink>
              </div>
            </div>

            {/* Direct email & phone */}
            <div className="border-[1.5px] border-ink bg-surface p-6">
              <p className="kicker">General &amp; appraisals</p>
              <p className="mt-2 font-mono text-base font-bold">
                <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>
              <p className="mt-4 font-mono text-sm text-ink">
                Office phone:{' '}
                <a className="text-link font-semibold" href={telHref(business.phone)}>
                  {business.phone}
                </a>
              </p>
            </div>

            {/* Address, Hours & Map */}
            <div className="border-[1.5px] border-ink bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="kicker">Portland office</p>
                <OpenBadge hours={business.hours} />
              </div>
              <p className="mt-3 font-mono text-sm font-bold text-ink">
                {business.address.formatted}
              </p>
              <p className="mt-1.5 text-sm text-muted">{business.address.landmarkNote}</p>

              <dl className="mt-4 divide-y divide-line font-mono text-xs">
                {business.hours.map(row => (
                  <div key={row.day} className="flex justify-between py-1.5">
                    <dt className="text-muted">{row.day}</dt>
                    <dd className="font-semibold text-ink">
                      {row.opens && row.closes ? `${row.opens}–${row.closes}` : 'Closed'}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 border border-line">
                <GoogleMap
                  address={business.address.formatted}
                  title={`Map showing ${business.name} at ${business.address.formatted}`}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
