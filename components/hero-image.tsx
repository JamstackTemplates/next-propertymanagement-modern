import type { CSSProperties } from 'react';
import { asset } from '../lib/paths';

// Home page hero rendering: an architect's floor plan and elevation linework dissolving into a finished
// four-storey Portland walk-up with rust Corten cladding, street trees and a glazed letterbox lobby.
// public/hero-light.webp is the overcast-morning version; public/hero-dark.webp is the identical scene at
// night with glowing windows. The `.hero-art` styles in app/tailwind.input.css pick the pair to match the
// theme toggle, so only the active theme's image downloads. Decorative only — the page text carries all
// information.

export function HeroImage({ className = '' }: { className?: string }) {
  const style = {
    '--hero-light': `url("${asset('/hero-light.webp')}")`,
    '--hero-dark': `url("${asset('/hero-dark.webp')}")`,
  } as CSSProperties;
  return <div className={`hero-art ${className}`} style={style} aria-hidden="true" />;
}
