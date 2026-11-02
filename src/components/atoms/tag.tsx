import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap",
  {
    variants: {
      variant: {
        center:
          "h-[21px] rounded-full bg-[rgba(71,92,87,0.12)] px-2.5 text-[11px] font-medium leading-none text-tag-center",
        home: "h-[21px] rounded-full bg-[rgba(115,97,71,0.14)] px-2.5 text-[11px] font-medium leading-none text-tag-home",
        /** Figma package badge: 11px bold, py 4 → ~21px tall, slight transparency */
        package:
          "h-[21px] rounded-lg bg-brand-olive/70 px-2.5 text-[11px] font-bold leading-none text-[#fcf7f0] backdrop-blur-[2px]",
      },
    },
    defaultVariants: {
      variant: "center",
    },
  }
);

type TagProps = ComponentProps<"span"> & VariantProps<typeof tagVariants>;

export function Tag({ className, variant, ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ variant }), className)}
      {...props}
    />
  );
}

export { tagVariants };
