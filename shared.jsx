// Shared components — loaded before all variation files

function MarkipLogo({ white = false, className = '' }) {
  const c = white ? 'rgba(255,255,255,0.9)' : 'currentColor';
  return (
    <svg
      viewBox="0 0 76 36"
      className={'markip-logo-svg ' + className}
      fill="none"
      aria-label="Markip"
    >
      {/* Outer arch — top of the m */}
      <path d="M4 17 C4 3 22 3 22 17" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Circle ring inside arch */}
      <circle cx="13" cy="13" r="5.5" stroke={c} strokeWidth="2.2"/>
      {/* m legs */}
      <line x1="4" y1="17" x2="4" y2="28" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="22" y1="17" x2="22" y2="28" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      {/* "arkip" wordmark text */}
      <text
        x="26" y="28"
        fontFamily="'Inter Tight', sans-serif"
        fontWeight="700"
        fontSize="18.5"
        fill={c}
        letterSpacing="-0.4"
      >arkip</text>
      {/* Underline accent below "ip" */}
      <line x1="55" y1="32" x2="72" y2="32" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

window.MarkipLogo = MarkipLogo;
