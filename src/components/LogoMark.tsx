import React from 'react';
import LOGO_URL from '../assets/Skytouch_Logo.jpg';
type LogoMarkProps = {
  /** Wrapper sizing + rounding classes, e.g. "w-8 h-8 rounded-lg" */
  className?: string
}
/**
 * Skytouch brand mark — the purple pointing-hand-and-star logo on a white tile.
 * Used everywhere the logo lockup appears (navbar, footer, auth, app sidebars).
 */
export function LogoMark({ className = 'w-8 h-8 rounded-lg' }: LogoMarkProps) {
  return (
    <div
      className={`bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm transition-transform group-hover:scale-105 ${className}`}
    >
      <img
        src={LOGO_URL}
        alt="SkyTouch logo"
        className="w-full h-full object-contain p-1"
      />
    </div>
  )
}
