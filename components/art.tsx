import type { ReactNode } from 'react';

/** Key whose bow is an alder leaf — used in header, footer and OG image. */
export function AlderKeyMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="41" height="41" fill="var(--felt)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Alder leaf bow + key blade */}
      <path
        d="M16 11C10.5 11 7.5 16 7.5 22C7.5 28 10.5 33 16 33C20.2 33 22.8 29.2 23.6 25H34V29H37.5V25H39.5V19H23.6C22.8 14.8 20.2 11 16 11Z"
        fill="var(--primary)"
        stroke="var(--felt-ink)"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      {/* Leaf veins inside bow */}
      <path d="M11.5 22H20.5M14.5 22L17.5 18.5M14.5 22L17.5 25.5" stroke="var(--felt-ink)" strokeWidth="1.4" strokeLinecap="square" />
      {/* Keyhole glow dot */}
      <circle cx="34.5" cy="11.5" r="2.2" fill="var(--glow)" />
    </svg>
  );
}

/** Small serrated alder leaf and hanging catkins motif. */
export function AlderLeafMotif({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {/* Serrated alder leaf */}
      <path
        d="M4 18C4 11 8.5 5 16 4C16.5 10.5 13 17 4 18Z"
        fill="var(--leaf)"
        stroke="var(--ink)"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
      <path d="M4 18L13.5 7.5M8 14L11.5 13.5M10.5 11L13.5 10.5" stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="square" />
      {/* Hanging catkins */}
      <path d="M16 4C18 6 19 8 19 10.5" stroke="var(--ink)" strokeWidth="1.2" />
      <rect x="17.8" y="10.5" width="2.4" height="5" fill="var(--glow)" stroke="var(--ink)" strokeWidth="1.1" />
      <path d="M15.5 5.5C17 7.5 17 9.5 16.5 12" stroke="var(--ink)" strokeWidth="1.1" />
      <rect x="14.5" y="12" width="2.2" height="4.2" fill="var(--glow)" stroke="var(--ink)" strokeWidth="1.1" />
    </svg>
  );
}

/** Long architectural floor-plan divider strip between sections (kitchen | bedroom | hall). */
export function FloorPlanDivider({
  variant = 'hall',
  label,
}: {
  variant?: 'kitchen' | 'bedroom' | 'hall';
  label?: string;
}) {
  return (
    <div className="w-full overflow-hidden border-y border-line bg-surface/70 py-1.5" aria-hidden="true">
      <div className="wrap flex items-center gap-4">
        <svg viewBox="0 0 960 36" fill="none" className="h-7 w-full text-line">
          {/* Baseline wall */}
          <line x1="0" y1="18" x2="960" y2="18" stroke="currentColor" strokeWidth="1" />
          {variant === 'kitchen' && (
            <>
              {/* Kitchen counter + sink + door swing */}
              <rect x="40" y="6" width="120" height="12" stroke="currentColor" strokeWidth="1" />
              <rect x="76" y="8" width="24" height="8" stroke="currentColor" strokeWidth="0.75" />
              <path d="M260 18A18 18 0 0 1 278 36" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
              <line x1="260" y1="18" x2="260" y2="36" stroke="currentColor" strokeWidth="1.25" />
              <rect x="640" y="6" width="90" height="12" stroke="currentColor" strokeWidth="1" />
            </>
          )}
          {variant === 'bedroom' && (
            <>
              {/* Closet + double door swing */}
              <rect x="80" y="4" width="96" height="14" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="11" x2="176" y2="11" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 3" />
              <path d="M440 18A16 16 0 0 0 424 34" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
              <line x1="440" y1="18" x2="440" y2="34" stroke="currentColor" strokeWidth="1.25" />
              <path d="M444 18A16 16 0 0 1 460 34" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
            </>
          )}
          {variant === 'hall' && (
            <>
              {/* Corridor doors + dimension ticks */}
              <path d="M180 18A16 16 0 0 1 196 34" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
              <line x1="180" y1="18" x2="180" y2="34" stroke="currentColor" strokeWidth="1.25" />
              <path d="M560 18A16 16 0 0 0 544 34" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 2" />
              <line x1="560" y1="18" x2="560" y2="34" stroke="currentColor" strokeWidth="1.25" />
            </>
          )}
          {/* Dimension ticks */}
          <line x1="340" y1="11" x2="340" y2="25" stroke="currentColor" strokeWidth="0.75" />
          <line x1="780" y1="11" x2="780" y2="25" stroke="currentColor" strokeWidth="0.75" />
          <text x="794" y="14" fill="currentColor" fontSize="9" fontFamily="var(--font-mono)">
            {label ?? (variant === 'kitchen' ? 'SEC A-A · 32\'-0"' : variant === 'bedroom' ? 'PLAN B · 28\'-4"' : 'HALL · 44\'-0"')}
          </text>
        </svg>
      </div>
    </div>
  );
}

/** Clipboard holding a measured 2-bed floor plan, tape measure unrolling across it, and rent-range bar. */
export function AppraisalSheetArt({ className = 'w-full max-w-md' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 300"
      fill="none"
      className={className}
      role="img"
      aria-label="Clipboard holding a measured two-bedroom floor plan with a tape measure and estimated monthly rent range bar."
    >
      {/* Clipboard backing */}
      <rect x="26" y="24" width="328" height="260" fill="var(--felt)" stroke="var(--ink)" strokeWidth="1.75" />
      {/* Metal clip */}
      <rect x="136" y="10" width="108" height="26" fill="var(--surface-2)" stroke="var(--ink)" strokeWidth="1.75" />
      <circle cx="190" cy="23" r="4" fill="var(--felt)" stroke="var(--ink)" strokeWidth="1.25" />
      {/* Paper sheet */}
      <rect x="42" y="38" width="296" height="232" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Header label */}
      <text x="58" y="60" fill="var(--ink-muted)" fontSize="9.5" fontFamily="var(--font-mono)">RENTAL APPRAISAL · 2BR / 1BA · ~880 SQ FT</text>
      <line x1="58" y1="68" x2="322" y2="68" stroke="var(--line)" strokeWidth="0.75" />

      {/* Measured 2-bed floor plan */}
      <rect x="64" y="82" width="150" height="106" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="138" y1="82" x2="138" y2="188" stroke="var(--ink)" strokeWidth="1.25" />
      <line x1="138" y1="136" x2="214" y2="136" stroke="var(--ink)" strokeWidth="1.25" />
      {/* Door swing arcs */}
      <path d="M138 112A18 18 0 0 0 120 130" stroke="var(--ink-muted)" strokeWidth="0.75" strokeDasharray="3 2" />
      <path d="M168 136A16 16 0 0 1 184 152" stroke="var(--ink-muted)" strokeWidth="0.75" strokeDasharray="3 2" />
      <text x="74" y="102" fill="var(--ink)" fontSize="8.5" fontFamily="var(--font-mono)">LIVING</text>
      <text x="74" y="114" fill="var(--ink-muted)" fontSize="7.5" fontFamily="var(--font-mono)">14&apos; × 18&apos;</text>
      <text x="148" y="102" fill="var(--ink)" fontSize="8.5" fontFamily="var(--font-mono)">BED 1</text>
      <text x="148" y="156" fill="var(--ink)" fontSize="8.5" fontFamily="var(--font-mono)">BED 2</text>

      {/* Rent range panel at right */}
      <rect x="228" y="82" width="94" height="106" fill="var(--surface-2)" stroke="var(--ink)" strokeWidth="1.25" />
      <text x="236" y="100" fill="var(--ink-muted)" fontSize="8" fontFamily="var(--font-mono)">EST. RANGE</text>
      <text x="236" y="120" fill="var(--primary-ink)" fontSize="13" fontFamily="var(--font-mono)" fontWeight="700">$2,150</text>
      <text x="236" y="135" fill="var(--ink-muted)" fontSize="9" fontFamily="var(--font-mono)">to $2,300/mo</text>
      {/* Range bar */}
      <rect x="236" y="150" width="78" height="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="254" y="150" width="44" height="8" fill="var(--leaf)" />
      <text x="236" y="174" fill="var(--ink-muted)" fontSize="7.5" fontFamily="var(--font-mono)">3 COMPS MATCHED</text>

      {/* Unrolling tape measure across bottom */}
      <g>
        <rect x="58" y="216" width="212" height="22" fill="var(--glow)" stroke="var(--ink)" strokeWidth="1.5" />
        <path
          d="M74 216V224M90 216V228M106 216V224M122 216V228M138 216V224M154 216V228M170 216V224M186 216V228M202 216V224M218 216V228M234 216V224M250 216V228"
          stroke="var(--ink)"
          strokeWidth="1"
        />
        {/* Tape case */}
        <path d="M268 202H312A12 12 0 0 1 324 214V238H268V202Z" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.5" />
        <circle cx="296" cy="220" r="7" fill="var(--surface-2)" stroke="var(--ink)" strokeWidth="1.25" />
      </g>
    </svg>
  );
}

/** Architectural floor-plan fragment for inner page heads. */
export function PageHeadPlanArt({ code = 'PLAN · L2' }: { code?: string }) {
  return (
    <svg viewBox="0 0 240 120" fill="none" className="w-56 max-w-full" aria-hidden="true">
      <rect x="8" y="14" width="224" height="96" stroke="var(--ink)" strokeWidth="1.5" fill="var(--surface)" />
      <line x1="92" y1="14" x2="92" y2="110" stroke="var(--ink)" strokeWidth="1.25" />
      <line x1="92" y1="62" x2="232" y2="62" stroke="var(--ink)" strokeWidth="1.25" />
      <path d="M92 32A22 22 0 0 0 70 54" stroke="var(--primary-ink)" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M148 62A20 20 0 0 1 168 82" stroke="var(--leaf)" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="8" y1="6" x2="232" y2="6" stroke="var(--ink-muted)" strokeWidth="0.75" />
      <line x1="8" y1="2" x2="8" y2="10" stroke="var(--ink-muted)" strokeWidth="0.75" />
      <line x1="232" y1="2" x2="232" y2="10" stroke="var(--ink-muted)" strokeWidth="0.75" />
      <text x="18" y="34" fill="var(--ink-muted)" fontSize="9" fontFamily="var(--font-mono)">{code}</text>
      <text x="104" y="42" fill="var(--ink-muted)" fontSize="8.5" fontFamily="var(--font-mono)">16&apos;-0&quot;</text>
      <text x="104" y="92" fill="var(--ink-muted)" fontSize="8.5" fontFamily="var(--font-mono)">SW ALDER</text>
    </svg>
  );
}

/** 404 art: letterbox door hanging open on one hinge, empty inside, "Return to sender — unit 404" sticker. */
export function Unit404LetterboxArt({ className = 'w-full max-w-sm' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 280"
      fill="none"
      className={className}
      role="img"
      aria-label="An aluminium letterbox compartment for unit 404 with its door hanging open on a single hinge and a Return to sender sticker."
    >
      {/* Brushed aluminium bank recess */}
      <rect x="20" y="20" width="210" height="230" fill="var(--surface-2)" stroke="var(--ink)" strokeWidth="1.75" />
      {/* Empty dark interior */}
      <rect x="38" y="42" width="174" height="186" fill="var(--felt)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Interior depth lines */}
      <path d="M38 42L72 72H178L212 42M38 228L72 198H178L212 228M72 72V198M178 72V198" stroke="var(--line)" strokeOpacity="0.45" strokeWidth="1" />
      {/* Hanging door swung out and tilted on bottom hinge */}
      <g transform="rotate(14 212 216)">
        <rect x="212" y="54" width="106" height="168" fill="var(--surface-2)" stroke="var(--ink)" strokeWidth="1.75" />
        {/* Nameplate */}
        <rect x="228" y="76" width="74" height="28" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.25" />
        <text x="242" y="95" fill="var(--ink)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="700">404</text>
        {/* Keyhole */}
        <circle cx="294" cy="140" r="6" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.25" />
        <line x1="294" y1="138" x2="294" y2="144" stroke="var(--ink)" strokeWidth="1.5" />
        {/* Return to sender sticker */}
        <g transform="rotate(-7 265 178)">
          <rect x="222" y="160" width="90" height="34" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.25" />
          <text x="230" y="174" fill="#FFFFFF" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="700">RETURN TO SENDER</text>
          <text x="244" y="186" fill="#FFFFFF" fontSize="8" fontFamily="var(--font-mono)">UNIT 404</text>
        </g>
      </g>
      {/* Broken top hinge pin */}
      <rect x="206" y="64" width="10" height="14" fill="var(--ink)" />
      {/* Intact bottom hinge */}
      <rect x="206" y="198" width="12" height="18" fill="var(--ink)" />
    </svg>
  );
}

/** Single-line apartment floor plan with dotted walking route through 8 numbered rooms (Home leasing section). */
export function LeasingFloorPlanArt({ className = 'w-full' }: { className?: string }) {
  const nodes = [
    { n: '1', x: 76, y: 84, room: 'ENTRY' },
    { n: '2', x: 184, y: 84, room: 'HALL' },
    { n: '3', x: 312, y: 84, room: 'LIVING' },
    { n: '4', x: 438, y: 84, room: 'BALCONY' },
    { n: '5', x: 438, y: 214, room: 'STUDY' },
    { n: '6', x: 312, y: 214, room: 'KITCHEN' },
    { n: '7', x: 184, y: 214, room: 'DINING' },
    { n: '8', x: 76, y: 214, room: 'BEDROOM' },
  ];
  return (
    <svg
      viewBox="0 0 516 296"
      fill="none"
      className={className}
      role="img"
      aria-label="Apartment floor plan tracing the eight steps of the leasing process from entry to renewal."
    >
      <rect x="16" y="16" width="484" height="264" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.75" />
      {/* Interior room partitions */}
      <line x1="130" y1="16" x2="130" y2="280" stroke="var(--ink)" strokeWidth="1.25" />
      <line x1="248" y1="16" x2="248" y2="280" stroke="var(--ink)" strokeWidth="1.25" />
      <line x1="376" y1="16" x2="376" y2="280" stroke="var(--ink)" strokeWidth="1.25" />
      <line x1="16" y1="148" x2="500" y2="148" stroke="var(--ink)" strokeWidth="1.25" />

      {/* Doorway gaps & swing arcs */}
      <rect x="128" y="72" width="4" height="24" fill="var(--surface)" />
      <rect x="246" y="72" width="4" height="24" fill="var(--surface)" />
      <rect x="374" y="72" width="4" height="24" fill="var(--surface)" />
      <rect x="426" y="146" width="24" height="4" fill="var(--surface)" />
      <rect x="374" y="202" width="4" height="24" fill="var(--surface)" />
      <rect x="246" y="202" width="4" height="24" fill="var(--surface)" />
      <rect x="128" y="202" width="4" height="24" fill="var(--surface)" />

      {/* Dotted walking route connecting 1 -> 8 */}
      <path
        d="M76 84H438V214H76"
        stroke="var(--primary-ink)"
        strokeWidth="2"
        strokeDasharray="6 5"
      />

      {/* Room labels and numbered step circles */}
      {nodes.map(node => (
        <g key={node.n}>
          <text
            x={node.x}
            y={node.y - 30}
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontSize="8.5"
            fontFamily="var(--font-mono)"
            letterSpacing="0.8"
          >
            {node.room}
          </text>
          <circle
            cx={node.x}
            cy={node.y}
            r="17"
            fill={Number(node.n) >= 7 ? 'var(--leaf)' : 'var(--primary)'}
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontFamily="var(--font-mono)"
            fontWeight="700"
          >
            {node.n}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Die-cut door hanger shell used for the three maintenance triage tiers on /tenants/. */
export function DoorHangerCard({
  accent,
  size = 'normal',
  children,
}: {
  accent: 'emergency' | 'urgent' | 'routine';
  size?: 'large' | 'normal';
  children: ReactNode;
}) {
  const accentBar =
    accent === 'emergency'
      ? 'border-t-primary bg-surface'
      : accent === 'urgent'
        ? 'border-t-glow bg-surface'
        : 'border-t-leaf bg-surface';

  return (
    <article
      className={`door-hanger relative flex flex-col border-[1.5px] border-ink border-t-[6px] ${accentBar} ${
        size === 'large' ? 'p-6 md:p-7' : 'p-5 md:p-6'
      }`}
    >
      {/* Die-cut hook hole silhouette at top center */}
      <div className="mb-4 flex items-center justify-center" aria-hidden="true">
        <div className="flex flex-col items-center">
          <span className="h-3 w-0.5 bg-ink" />
          <span className="h-9 w-9 rounded-full border-[1.5px] border-ink bg-bg" />
        </div>
      </div>
      {children}
    </article>
  );
}
