import type { ReactNode } from 'react';
import { AppraisalSheetArt } from './art';
import { MeasuredRoomDecor, TapeEdge } from './decor';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

/* ---- Appraisal CTA Band (shared by Home and Fees) ---- */
function AppraisalBandRoot({ children }: ChildrenProps) {
  return (
    <section className="relative mt-16 overflow-x-clip bg-primary text-on-primary">
      <TapeEdge />
      <MeasuredRoomDecor />
      <div className="wrap relative grid items-center gap-8 pt-14 pb-20 md:grid-cols-12 md:pt-18 md:pb-24">
        <div className="md:col-span-7">{children}</div>
        <div className="relative z-10 md:col-span-5 md:-mt-24">
          <div className="mx-auto max-w-sm">
            <AppraisalSheetArt className="w-full drop-shadow-[0_12px_0_rgba(24,32,29,0.28)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AppraisalBandKicker({ children }: ChildrenProps) {
  return <p className="font-mono text-xs tracking-[0.16em] text-white/80 uppercase">{children}</p>;
}

function AppraisalBandHeading({ children }: ChildrenProps) {
  return <h2 className="mt-2 text-[clamp(1.9rem,4vw,3rem)] font-bold text-white">{children}</h2>;
}

function AppraisalBandBody({ children }: ChildrenProps) {
  return <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">{children}</p>;
}

function AppraisalBandAction({ href, children }: { href: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <SiteLink href={href} className="button button-outline-light">
        {children}
      </SiteLink>
    </div>
  );
}

export const AppraisalBand = Object.assign(AppraisalBandRoot, {
  Kicker: AppraisalBandKicker,
  Heading: AppraisalBandHeading,
  Body: AppraisalBandBody,
  Action: AppraisalBandAction,
});

/* ---- Reusable section header ---- */
export function SectionHeader({
  kicker,
  title,
  action,
  light = false,
  id,
}: {
  kicker: string;
  title: ReactNode;
  action?: ReactNode;
  light?: boolean;
  id?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className={`font-mono text-xs tracking-[0.14em] uppercase ${light ? 'text-felt-muted' : 'text-muted'}`}>
          {kicker}
        </p>
        <h2
          id={id}
          className={`mt-2 text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold ${light ? 'text-felt-ink' : 'text-ink'}`}
        >
          {title}
        </h2>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
