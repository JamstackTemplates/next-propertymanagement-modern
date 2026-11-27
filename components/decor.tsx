/**
 * Decorative section edges and background layers for the "apartment lobby" design.
 * Everything here is presentational: aria-hidden, pointer-events none, hidden in print.
 * The shapes and textures live in app/tailwind.input.css (.edge-*, .decor-*).
 */

/** Architectural section-cut floor slab between two sections, with an optional level datum. */
export function SlabEdge({ label }: { /** e.g. `L2 · +10'-6"` */ label?: string }) {
  return (
    <div className="edge-slab decor" aria-hidden="true">
      {label ? (
        <div className="wrap relative h-full">
          <span className="edge-slab__datum">
            <svg viewBox="0 0 12 10" className="h-2.5 w-3" fill="none">
              <path d="M1 1H11L6 9Z" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.2" />
            </svg>
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/** Aluminium frame rail with screw heads, as on a lobby directory board. */
export function RailEdge() {
  return <div className="edge-rail decor" aria-hidden="true" />;
}

/** Torn paper edge; place inside a `relative` section with a --surface ground. */
export function TearEdge({ side = 'top' }: { side?: 'top' | 'bottom' }) {
  return <div className={`edge-tear decor ${side === 'bottom' ? 'edge-tear--bottom' : ''}`} aria-hidden="true" />;
}

/** Tractor-feed sprocket margins either side of a paper band (wide screens only). */
export function TractorFeed() {
  return (
    <>
      <div className="decor-feed decor-feed--left decor" aria-hidden="true" />
      <div className="decor-feed decor-feed--right decor" aria-hidden="true" />
    </>
  );
}

/** Yellow tape-measure edge with inch ticks and an end hook; place as first child of a `relative` section. */
export function TapeEdge() {
  return (
    <div className="edge-tape decor" aria-hidden="true">
      <span className="edge-tape__hook" />
    </div>
  );
}

/** Skyline of the Portland home types Alder Key manages, rising out of the next band (the footer). */
export function RooflineEdge() {
  return <div className="edge-roofline decor" aria-hidden="true" />;
}

/** Four corner registration marks, like a printed drawing sheet. Parent must be `relative`. */
export function CropMarks({ className = '' }: { className?: string }) {
  return (
    <div className={`decor-crop decor ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

/** Hero background: fading blueprint grid, north arrow and a street dimension string. */
export function HeroBlueprintDecor() {
  return (
    <div className="decor pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="decor-blueprint absolute inset-0" />
      <svg
        viewBox="0 0 64 80"
        fill="none"
        className="absolute top-8 right-[52%] hidden h-20 w-16 text-line lg:block"
      >
        <circle cx="32" cy="44" r="22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <path d="M32 18L40 52L32 46L24 52Z" fill="var(--surface)" stroke="var(--ink-muted)" strokeWidth="1.2" />
        <path d="M32 18L32 46L24 52Z" fill="var(--ink-muted)" />
        <text x="27.5" y="12" fill="var(--ink-muted)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="700">
          N
        </text>
      </svg>
      <div className="wrap absolute inset-x-0 bottom-3 hidden lg:block">
        <div className="decor-dimension">
          <span>SW Alder Street · 200&apos;-0&quot; frontage</span>
        </div>
      </div>
    </div>
  );
}

/** Dashed door-swing arcs (plan notation) behind the landlord / tenant doors. */
export function DoorSwingDecor({ hinge = 'left' }: { hinge?: 'left' | 'right' }) {
  const flip = hinge === 'right';
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      className={`decor pointer-events-none absolute bottom-0 h-64 w-64 opacity-30 md:h-80 md:w-80 ${
        flip ? 'right-0 -scale-x-100' : 'left-0'
      }`}
      aria-hidden="true"
    >
      <line x1="2" y1="318" x2="2" y2="18" stroke="currentColor" strokeWidth="3" />
      <path d="M2 18A300 300 0 0 1 302 318" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 7" />
      <path d="M2 118A200 200 0 0 1 202 318" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
      <line x1="2" y1="318" x2="318" y2="318" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Faint Portland map behind the directory board: the Willamette, its bridges, street grid and quadrants. */
export function RiverMapDecor() {
  const label = { fill: 'currentColor', fontSize: 15, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: 5 };
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className="decor pointer-events-none absolute inset-0 h-full w-full text-felt-ink opacity-[0.09]"
      aria-hidden="true"
    >
      {/* Street grid */}
      <path
        d="M0 80H1200M0 160H1200M0 240H1200M0 320H1200M0 400H1200M0 480H1200M0 560H1200M100 0V600M200 0V600M300 0V600M400 0V600M760 0V600M860 0V600M960 0V600M1060 0V600M1160 0V600"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 5"
      />
      {/* Burnside: the north / south divide */}
      <path d="M0 300H1200" stroke="currentColor" strokeWidth="3" />
      {/* Willamette River */}
      <path
        d="M470 -10C520 60 640 90 610 170C585 240 520 260 560 340C600 420 690 430 650 510C630 550 600 580 610 610"
        stroke="currentColor"
        strokeWidth="46"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Bridges */}
      <path d="M560 120H690M540 210H660M520 300H640M545 380H690M590 470H710" stroke="currentColor" strokeWidth="4" />
      <path d="M560 112V128M690 112V128M520 292V308M640 292V308" stroke="currentColor" strokeWidth="2" />
      <text x="760" y="290" {...label}>BURNSIDE</text>
      <text {...label} transform="translate(700 520) rotate(-62)">WILLAMETTE RIVER</text>
    </svg>
  );
}

/** Faint measured room outline with dimension strings, behind the appraisal call to action. */
export function MeasuredRoomDecor() {
  return (
    <svg
      viewBox="0 0 600 360"
      fill="none"
      className="decor pointer-events-none absolute top-12 right-[-4rem] hidden h-[calc(100%-5rem)] text-white opacity-[0.12] md:block"
      aria-hidden="true"
    >
      <rect x="60" y="60" width="480" height="260" stroke="currentColor" strokeWidth="6" />
      <path d="M300 60V200M300 240V320M60 190H200" stroke="currentColor" strokeWidth="4" />
      <path d="M300 200A40 40 0 0 1 340 240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M60 30H540M60 22V38M540 22V38M300 22V38" stroke="currentColor" strokeWidth="1.5" />
      <path d="M570 60V320M562 60H578M562 320H578" stroke="currentColor" strokeWidth="1.5" />
      <text x="150" y="24" fill="currentColor" fontSize="16" fontFamily="var(--font-mono)">14&apos;-6&quot;</text>
      <text x="390" y="24" fill="currentColor" fontSize="16" fontFamily="var(--font-mono)">12&apos;-0&quot;</text>
    </svg>
  );
}
