"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";

type SheetProps = {
  open?: boolean;
  title?: string;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  /**
   * bottom = mobile bottom sheet
   * center = desktop dialog
   * responsive = bottom on phone, centered dialog from md+
   */
  placement?: "bottom" | "center" | "responsive";
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
};

/**
 * Shared sheet shell for Figma «أوراق».
 * Mobile: full-width bottom sheet. Desktop: centered dialog with max-width.
 */
export function Sheet({
  open = true,
  title,
  onClose,
  children,
  className,
  placement = "responsive",
  footer,
  size = "md",
}: SheetProps) {
  if (!open) return null;

  const desktopMax =
    size === "lg" ? "md:max-w-[560px]" : size === "sm" ? "md:max-w-sm" : "md:max-w-md";
  const centerMax =
    size === "lg" ? "max-w-[560px]" : size === "sm" ? "max-w-sm" : "max-w-md";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex bg-bg-ghost/45 p-0",
        placement === "bottom" && "items-end justify-center",
        placement === "center" && "items-center justify-center p-4",
        placement === "responsive" &&
          "items-end justify-center md:items-center md:p-4"
      )}
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "flex max-h-[92vh] w-full flex-col overflow-hidden bg-bg-surface text-start shadow-[0_12px_40px_rgba(41,41,36,0.18)]",
          placement === "bottom" && "max-w-none rounded-t-[20px] rounded-b-none",
          placement === "center" && cn(centerMax, "rounded-[20px]"),
          placement === "responsive" &&
            cn(
              // Full phone width — override any caller max-w on small screens
              "max-w-none max-md:!max-w-none rounded-t-[20px] rounded-b-none",
              desktopMax,
              "md:rounded-[20px]"
            ),
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between gap-3 px-4 pb-1 pt-[18px] sm:px-7">
            {title ? (
              <h2 className="text-lg font-bold leading-[25px] text-brand-olive">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-body-sm font-medium text-[#615c52] outline-none hover:text-text-primary"
              >
                <Icon name="close" size={14} />
                <span>إغلاق</span>
              </button>
            ) : null}
          </div>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-2 sm:px-7">
          {children}
        </div>
        {footer ? (
          <div className="border-t border-border-subtle px-4 py-4 sm:px-7">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
