import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string | null;
  priority?: boolean;
};

export function Logo({ className, href = "/", priority }: LogoProps) {
  const mark = (
    <Image
      src="/assets/images/yallah-logo.png"
      alt="Yallah Spa"
      width={160}
      height={56}
      priority={priority}
      className={cn("h-10 w-auto object-contain sm:h-14", className)}
    />
  );

  if (href === null) return mark;

  return (
    <Link href={href} className="inline-flex" aria-label="Yallah Spa — الصفحة الرئيسية">
      {mark}
    </Link>
  );
}
