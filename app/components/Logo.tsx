export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="logoStar" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#logoBg)" />
      <g transform="translate(-1.5, 1.5)" opacity="0.35">
        <path
          d="M16 7 L18.5 12.5 L24.5 13 L20 17 L21.5 23 L16 20 L10.5 23 L12 17 L7.5 13 L13.5 12.5 Z"
          fill="white"
        />
      </g>
      <path
        d="M16 7 L18.5 12.5 L24.5 13 L20 17 L21.5 23 L16 20 L10.5 23 L12 17 L7.5 13 L13.5 12.5 Z"
        fill="url(#logoStar)"
      />
      <circle cx="19" cy="11" r="1.2" fill="white" />
    </svg>
  )
}

export function LogoWithText({ iconSize = 32 }: { iconSize?: number }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={iconSize} />
      <span className="font-display font-bold text-lg">
        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
          Lively
        </span>
        <span className="text-bone">Icons</span>
      </span>
    </div>
  )
}
