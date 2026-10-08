import React from 'react';

/**
 * Brand Logo: Stylized "S" emblem inside a circle from the Milliy Bog' Residence renders.
 */
export const BrandLogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Milliy Bog' Residence Logo"
  >
    <defs>
      <linearGradient id="brandLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6fb1ea" />
        <stop offset="100%" stopColor="#1f4fa8" />
      </linearGradient>
      <linearGradient id="goldLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
    </defs>
    {/* Outer circle ring */}
    <circle cx="50" cy="50" r="46" stroke="url(#brandLogoGrad)" strokeWidth="4.5" />
    <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Stylized elegant intertwined 'S' ribbon shape */}
    <path
      d="M50 18C41 18 35 24 35 32C35 44 65 42 65 56C65 65 57 70 48 70C39 70 33 65 32 58"
      stroke="#ffffff"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 18C59 18 65 24 65 32C65 36 62 40 57 44M50 82C41 82 35 76 35 68C35 64 38 60 43 56"
      stroke="url(#brandLogoGrad)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="3" fill="#6fb1ea" />
  </svg>
);

export const GoldBrandLogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-10 h-10', size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Milliy Bog' Residence Gold Crest"
  >
    <defs>
      <linearGradient id="goldCrestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" stroke="url(#goldCrestGrad)" strokeWidth="4.5" />
    <circle cx="50" cy="50" r="42" stroke="rgba(254, 240, 138, 0.4)" strokeWidth="1" />
    <path
      d="M50 18C41 18 35 24 35 32C35 44 65 42 65 56C65 65 57 70 48 70C39 70 33 65 32 58"
      stroke="url(#goldCrestGrad)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="3.5" fill="#fef08a" />
  </svg>
);
