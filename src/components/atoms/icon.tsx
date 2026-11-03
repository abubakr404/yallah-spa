import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Download,
  Filter,
  Gift,
  Menu,
  QrCode,
  Share2,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Figma DS outline icons (svgrepo) — preferred over Lucide for meta rows. */
const assetIcons = {
  clock: "/assets/icons/clock.svg",
  location: "/assets/icons/location.svg",
  calendar: "/assets/icons/calendar.svg",
  services: "/assets/icons/services.svg",
} as const;

const lucideMap = {
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "chevron-down": ChevronDown,
  menu: Menu,
  download: Download,
  copy: Copy,
  share: Share2,
  check: Check,
  close: X,
  gift: Gift,
  qr: QrCode,
  filter: Filter,
  sparkles: Sparkles,
  whatsapp: Gift,
} as const;

export type IconName = keyof typeof assetIcons | keyof typeof lucideMap;

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

function WhatsAppIcon({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M8.002 1.333A6.66 6.66 0 0 0 1.34 8c0 1.173.31 2.313.9 3.32L1.333 14.667l3.447-.9A6.64 6.64 0 0 0 8.002 14.667 6.66 6.66 0 0 0 14.667 8 6.66 6.66 0 0 0 8.002 1.333Zm3.84 9.547c-.16.447-.933.853-1.3.907-.347.05-.787.073-1.267-.08-.293-.093-.667-.22-1.147-.427-2.013-.867-3.327-2.887-3.427-3.02-.1-.133-.8-1.067-.8-2.033s.507-1.44.687-1.64c.18-.2.393-.25.527-.25h.38c.12 0 .28-.047.44.333.16.387.54 1.32.587 1.413.047.093.08.207.013.333-.067.133-.1.213-.2.327-.1.113-.21.253-.3.34-.1.093-.203.193-.087.38.113.187.507.833 1.087 1.347.747.66 1.38.867 1.573.96.193.093.307.08.42-.047.113-.127.487-.567.617-.76.133-.193.26-.16.44-.093.18.067 1.14.537 1.333.633.193.1.32.147.367.227.047.08.047.467-.113.913Z" />
    </svg>
  );
}

export function Icon({
  name,
  className,
  size = 16,
  strokeWidth = 1.75,
}: IconProps) {
  if (name === "whatsapp") {
    return <WhatsAppIcon className={className} size={size} />;
  }

  if (name in assetIcons) {
    const src = assetIcons[name as keyof typeof assetIcons];
    return (
      // eslint-disable-next-line @next/next/no-img-element -- local Figma SVGs
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0", className)}
        aria-hidden
      />
    );
  }

  const Comp: LucideIcon = lucideMap[name as keyof typeof lucideMap];
  return (
    <Comp
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0 text-current", className)}
      aria-hidden
    />
  );
}
