import type * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-md bg-white px-4 font-medium transition-[box-shadow]",
        "shadow-[inset_0_0_0_1px_theme(colors.purple.300)]",
        "focus-visible:shadow-[inset_0_0_0_2px_theme(colors.purple.700)]",
        "aria-invalid:shadow-[inset_0_0_0_2px_theme(colors.red.500)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
