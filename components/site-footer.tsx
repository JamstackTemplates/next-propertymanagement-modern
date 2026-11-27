import { business, telHref } from '../content/business';
import { AlderKeyMark } from './art';
import { RooflineEdge } from './decor';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="bg-felt-board relative mt-24 pt-12 pb-10">
      <RooflineEdge />
      <div className="wrap">
        {/* Aluminium frame rail */}
        <div className="border-[1.5px] border-line/50 p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line/40 pb-5">
            <div className="flex items-center gap-3">
              <AlderKeyMark className="h-9 w-9 shrink-0" />
              <div>
                <p className="font-display text-lg font-bold tracking-tight text-felt-ink">
                  {business.name}
                </p>
                <p className="font-mono text-xs tracking-widest text-felt-muted uppercase">
                  Directory · Suite 410 · Portland, OR
                </p>
              </div>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-wider uppercase">
              <SiteLink href="/fees/" className="text-felt-ink no-underline hover:underline">Fees &amp; services</SiteLink>
              <SiteLink href="/appraisal/" className="text-felt-ink no-underline hover:underline">Rental appraisal</SiteLink>
              <SiteLink href="/tenants/" className="text-felt-ink no-underline hover:underline">Tenants</SiteLink>
              <SiteLink href="/contact/" className="text-felt-ink no-underline hover:underline">Contact</SiteLink>
            </nav>
          </div>

          <div className="grid gap-8 font-mono text-sm md:grid-cols-3">
            {/* Office & Hours */}
            <div className="space-y-2">
              <p className="text-xs tracking-widest text-felt-muted uppercase">Office</p>
              <p className="text-felt-ink">
                {business.address.suite}, {business.address.street}
                <br />
                {business.address.city}, {business.address.region} {business.address.postcode}
              </p>
              <p className="pt-2 text-xs tracking-widest text-felt-muted uppercase">Office hours</p>
              <p className="text-felt-ink">{business.hoursSummary}</p>
            </div>

            {/* Landlords & General */}
            <div className="space-y-2">
              <p className="text-xs tracking-widest text-felt-muted uppercase">Landlords &amp; appraisals</p>
              <p>
                <a className="text-felt-ink underline hover:text-glow" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <p>
                Office:{' '}
                <a className="text-felt-ink underline hover:text-glow" href={telHref(business.phone)}>
                  {business.phone}
                </a>
              </p>
            </div>

            {/* Tenants */}
            <div className="space-y-2">
              <p className="text-xs tracking-widest text-felt-muted uppercase">Tenants of managed homes</p>
              <p>
                Maintenance:{' '}
                <a className="text-felt-ink underline hover:text-glow" href={`mailto:${business.maintenanceEmail}`}>
                  {business.maintenanceEmail}
                </a>
              </p>
              <p>
                24/7 emergency:{' '}
                <a className="text-glow underline hover:text-felt-ink" href={telHref(business.emergencyPhone)}>
                  {business.emergencyPhone}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-3 border-t border-line/40 pt-6 text-xs leading-relaxed text-felt-muted">
            <p className="font-sans text-felt-ink/90">{business.equalHousingStatement}</p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p className="font-sans">{business.sampleNote}</p>
              <span title="Made with love by jamstacks.net" className="font-sans text-felt-muted">
                with <span role="img" aria-label="love">❤️</span>{' '}
                <a className="text-felt-ink no-underline hover:underline" href="https://jamstacks.net">
                  jamstacks.net
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
