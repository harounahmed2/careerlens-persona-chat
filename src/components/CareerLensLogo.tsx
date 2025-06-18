import React from 'react';

const CareerLensLogo = ({ size = 40, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      
      {/* Outer lens/eye shape */}
      <path
        d="M50 20 C30 20 15 35 15 50 C15 65 30 80 50 80 C70 80 85 65 85 50 C85 35 70 20 50 20 Z"
        fill="url(#logoGradient)"
      />
      
      {/* Inner lens highlight */}
      <circle cx="50" cy="50" r="20" fill="url(#lensGradient)" opacity="0.8" />
      
      {/* AI nodes */}
      <circle cx="50" cy="50" r="8" fill="white" />
      <circle cx="35" cy="45" r="4" fill="white" opacity="0.8" />
      <circle cx="65" cy="45" r="4" fill="white" opacity="0.8" />
      <circle cx="50" cy="65" r="4" fill="white" opacity="0.8" />
      
      {/* Connection lines */}
      <line x1="42" y1="50" x2="35" y2="45" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="58" y1="50" x2="65" y2="45" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="50" y1="58" x2="50" y2="65" stroke="white" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
};

export default CareerLensLogo;