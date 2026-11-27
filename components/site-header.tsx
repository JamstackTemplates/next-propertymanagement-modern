import { DarkModeToggle } from 'jamstacks';
import { AlderKeyMark } from './art';
import { SiteLink } from './site-link';

const NAV_LINKS = [
  { href: '/fees/', label: 'Fees & services' },
  { href: '/appraisal/', label: 'Rental appraisal' },
  { href: '/tenants/', label: 'Tenants' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  return (
    <header className="bg-aluminium sticky top-0 z-40 border-b-[1.5px] border-ink">
      <div className="wrap flex min-h-18 items-center justify-between gap-3 py-2">
        <SiteLink href="/" className="group flex items-center gap-3 no-underline">
          <AlderKeyMark className="h-9 w-9 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight text-ink sm:text-lg">
              Alder Key
            </span>
            <span className="font-mono mt-0.5 text-[0.7rem] tracking-wider text-muted uppercase">
              SW Alder St · Portland
            </span>
          </span>
        </SiteLink>

        <nav aria-label="Primary" className="flex items-center gap-2 lg:gap-5">
          {/* Desktop inline links */}
          <ul className="hidden items-center gap-2 lg:flex">
            {NAV_LINKS.map(item => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  markCurrent="page"
                  className="inline-flex items-center border border-transparent px-2.5 py-1.5 text-sm font-medium text-ink no-underline transition-colors hover:text-primary-ink hover:underline aria-[current=page]:border-ink aria-[current=page]:bg-surface aria-[current=page]:font-semibold aria-[current=page]:text-primary-ink aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4"
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>

          <SiteLink
            href="/appraisal/"
            className="button hidden text-sm lg:inline-flex"
          >
            Request an appraisal
          </SiteLink>

          <DarkModeToggle />

          {/* Mobile popover trigger */}
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 border-[1.5px] border-ink bg-surface px-3 font-mono text-xs font-semibold tracking-wider text-ink uppercase lg:hidden"
            popoverTarget="mobile-nav"
            popoverTargetAction="toggle"
            aria-controls="mobile-nav"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
            </svg>
            <span>Menu</span>
          </button>

          {/* Native top-layer mobile navigation panel */}
          <div id="mobile-nav" popover="auto" className="mobile-nav-panel p-5">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <span className="font-mono text-xs tracking-wider text-muted uppercase">
                Lobby directory
              </span>
              <button
                type="button"
                popoverTarget="mobile-nav"
                popoverTargetAction="hide"
                className="border border-line px-2.5 py-1 font-mono text-xs text-ink uppercase"
              >
                Close
              </button>
            </div>
            <ul className="grid gap-1">
              <li>
                <SiteLink
                  href="/"
                  markCurrent="page"
                  className="block border-b border-line/60 px-3 py-3 font-display text-lg font-semibold text-ink no-underline aria-[current=page]:border-l-4 aria-[current=page]:border-l-primary aria-[current=page]:bg-bg aria-[current=page]:text-primary-ink"
                >
                  Home
                </SiteLink>
              </li>
              {NAV_LINKS.map(item => (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    markCurrent="page"
                    className="block border-b border-line/60 px-3 py-3 font-display text-lg font-semibold text-ink no-underline aria-[current=page]:border-l-4 aria-[current=page]:border-l-primary aria-[current=page]:bg-bg aria-[current=page]:text-primary-ink"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <SiteLink href="/appraisal/" className="button w-full">
                Request an appraisal
              </SiteLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
