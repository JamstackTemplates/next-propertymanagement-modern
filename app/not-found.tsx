import type { Metadata } from 'next';
import { Unit404LetterboxArt } from '../components/art';
import { SiteLink } from '../components/site-link';
import { CropMarks, HeroBlueprintDecor } from '../components/decor';

export const metadata: Metadata = {
  title: 'Unit 404 — Page not found',
};

export default function NotFound() {
  return (
    <section className="bg-concrete relative overflow-hidden py-16 md:py-24">
      <HeroBlueprintDecor />
      <CropMarks />
      <div className="wrap relative grid items-center gap-10 md:grid-cols-12">
        <div className="flex justify-center md:col-span-5">
          <Unit404LetterboxArt />
        </div>
        <div className="md:col-span-7">
          <p className="font-mono text-6xl font-bold leading-none text-primary-ink sm:text-7xl">
            404
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-bold text-ink">
            Unit 404 isn’t on this floor.
          </h1>
          <p className="mt-3 max-w-lg text-base text-muted">
            That box is empty and the page you’re looking for may have moved. Head back to the
            lobby or jump straight to fees or tenant repairs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <SiteLink href="/" className="button">
              Back to Home
            </SiteLink>
            <SiteLink href="/fees/" className="button button-quiet">
              Fees &amp; services
            </SiteLink>
            <SiteLink href="/tenants/" className="button button-quiet">
              Tenants &amp; repairs
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
