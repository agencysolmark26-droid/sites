// Original line-art SVG illustrations for the clinic — no external image
// assets are used anywhere on the site.

export function MagnetPairIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 30V16a8 8 0 0 1 16 0v14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M34 30V16a8 8 0 0 1 16 0v14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <rect x="10" y="30" width="12" height="9" rx="2" fill="currentColor" />
      <rect x="22" y="30" width="12" height="9" rx="2" fill="currentColor" opacity="0.45" />
      <rect x="30" y="30" width="12" height="9" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="42" y="30" width="12" height="9" rx="2" fill="currentColor" opacity="0.3" />
      <text x="15.5" y="37" fontSize="7" fill="white" fontFamily="sans-serif">N</text>
      <text x="27.5" y="37" fontSize="7" fill="white" fontFamily="sans-serif">S</text>
    </svg>
  );
}

export function BodyEnergyIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 360" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="180" r="150" fill="url(#glow)" />

      {/* silhouette */}
      <g stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="#ccfbf1">
        <circle cx="160" cy="70" r="34" />
        <path d="M120 118c-18 10-28 30-28 55v70c0 12 9 21 21 21h6l6 66h70l6-66h6c12 0 21-9 21-21v-70c0-25-10-45-28-55-16 12-64 12-80 0Z" />
      </g>

      {/* energy points */}
      {[
        [160, 70],
        [160, 140],
        [160, 190],
        [130, 210],
        [190, 210],
        [160, 250],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="6"
          fill="#0d9488"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}

      {/* connecting field lines */}
      <path
        d="M100 150c-30 10-40 40-20 60M220 150c30 10 40 40 20 60"
        stroke="#14b8a6"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        fill="none"
      />
    </svg>
  );
}

export function BalancedFieldIllustration({ className = "h-full w-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="400" height="300" rx="24" fill="#f0fdfa" />
      <g opacity="0.5" stroke="#14b8a6" strokeWidth="1.4">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${20 + i * 42} 20 Q ${20 + i * 42 + 21} 150 ${20 + i * 42} 280`} fill="none" />
        ))}
      </g>
      <circle cx="150" cy="150" r="46" fill="#0f766e" />
      <circle cx="250" cy="150" r="46" fill="#f59e0b" />
      <text x="150" y="158" fontSize="30" fill="white" textAnchor="middle" fontFamily="sans-serif">N</text>
      <text x="250" y="158" fontSize="30" fill="white" textAnchor="middle" fontFamily="sans-serif">S</text>
      <path
        d="M196 150h8"
        stroke="#0f172a"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EmotionalIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M32 52S10 39 10 24a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 15-22 28-22 28Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M32 52S10 39 10 24a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 15-22 28-22 28Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M18 26h7l4-8 6 14 4-8h7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SportIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="44" cy="14" r="6" fill="currentColor" />
      <path
        d="M10 52l12-14 8 6 10-18M32 26l8 6 8-2"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 38l-6 14M40 32l6 6-4 12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function FirstVisitIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="12" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M20 20h24M20 30h24M20 40h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="46" cy="46" r="12" fill="white" stroke="currentColor" strokeWidth="3" />
      <path d="M46 40v12M40 46h12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="8" y="12" width="48" height="44" rx="5" stroke="currentColor" strokeWidth="3" />
      <path d="M8 24h48" stroke="currentColor" strokeWidth="3" />
      <path d="M18 6v10M46 6v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="34" r="3.2" fill="currentColor" />
      <circle cx="32" cy="34" r="3.2" fill="currentColor" />
      <circle cx="44" cy="34" r="3.2" fill="currentColor" />
      <circle cx="20" cy="45" r="3.2" fill="currentColor" />
      <circle cx="32" cy="45" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function LeafIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 50C8 32 20 12 44 10c4 22-8 38-30 40Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M16 48C24 36 32 26 42 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function HandsIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 34c8-6 14-6 20-2l14 8"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M58 30c-8-6-14-6-20-2L24 36"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="34" r="5" fill="currentColor" opacity="0.7" />
      <circle cx="46" cy="30" r="5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function GalleryPanel({
  variant,
  className = "",
}: {
  variant: "hands" | "balance" | "meridians" | "calm";
  className?: string;
}) {
  const base = "rounded-3xl overflow-hidden flex items-center justify-center";
  if (variant === "hands") {
    return (
      <div className={`${base} bg-gradient-to-br from-teal-100 to-emerald-50 ${className}`}>
        <HandsIcon className="h-24 w-24 text-teal-700" />
      </div>
    );
  }
  if (variant === "balance") {
    return (
      <div className={`${base} bg-gradient-to-br from-amber-50 to-teal-50 ${className}`}>
        <BalancedFieldIllustration className="h-full w-full" />
      </div>
    );
  }
  if (variant === "meridians") {
    return (
      <div className={`${base} bg-gradient-to-br from-teal-50 to-cyan-100 ${className}`}>
        <BodyEnergyIllustration className="h-full w-full max-w-[220px]" />
      </div>
    );
  }
  return (
    <div className={`${base} bg-gradient-to-br from-emerald-50 to-teal-100 ${className}`}>
      <LeafIcon className="h-24 w-24 text-emerald-700" />
    </div>
  );
}
