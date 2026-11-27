import type { IconId } from '../content/leasing-steps';

type IconProps = {
  name: IconId;
  className?: string;
};

/** 24px architectural line icons (1.75px stroke, square caps). */
export function Icon({ name, className = 'w-6 h-6' }: IconProps) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'square' as const,
    strokeLinejoin: 'miter' as const,
    'aria-hidden': true as const,
    className,
  };

  switch (name) {
    case 'tap':
      return (
        <svg {...common}>
          <path d="M5 6h8M9 6v4M5 10h10a4 4 0 0 1 4 4v2h-3v-2a1 1 0 0 0-1-1H5v-3Z" />
          <path d="M17.5 19c0 1.2-1 2-1.5 2s-1.5-.8-1.5-2c0-1 1.5-2.5 1.5-2.5S17.5 18 17.5 19Z" />
        </svg>
      );
    case 'radiator':
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="12" />
          <path d="M8 6v12M12 6v12M16 6v12M2 9h2M20 15h2M6 18v2M18 18v2" />
        </svg>
      );
    case 'plug':
      return (
        <svg {...common}>
          <path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0V8ZM12 18v3" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="10" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2" />
        </svg>
      );
    case 'bulb':
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.7.5 1 1.2 1 2.1h5c0-.9.3-1.6 1-2.1A6 6 0 0 0 12 3Z" />
        </svg>
      );
    case 'camera':
      return (
        <svg {...common}>
          <path d="M3 8h4l2-3h6l2 3h4v11H3V8Z" />
          <circle cx="12" cy="13.5" r="3.5" />
        </svg>
      );
    case 'tape-measure':
      return (
        <svg {...common}>
          <path d="M3 15V9a6 6 0 0 1 12 0v6H3Z" />
          <circle cx="9" cy="10" r="2" />
          <path d="M15 15h6v-3h-6M18 12v1.5M20 12v1.5" />
        </svg>
      );
    case 'pen':
      return (
        <svg {...common}>
          <path d="M4 20h4l11-11-4-4L4 16v4ZM13 7l4 4" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" />
          <path d="M3 10h18M8 3v4M16 3v4M8 14h2M14 14h2" />
        </svg>
      );
    case 'building':
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" />
          <path d="M8 7h2M14 7h2M8 11h2M14 11h2M10 21v-5h4v5" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" />
          <path d="M9 4V2h6v2M8 10h8M8 14h8M8 18h5" />
        </svg>
      );
    case 'envelope':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" />
          <path d="M3 6l9 7 9-7" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M5 19C5 10 11 4 19 4c0 8-5 15-14 15ZM5 19l9-9M10 14h4M13 11v-3" />
        </svg>
      );
  }
}
