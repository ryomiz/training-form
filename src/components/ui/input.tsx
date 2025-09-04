import type * as React from "react";
import { useContext } from "react";
import { cn } from "@/lib/utils";
import { FormControlContext } from "./form-control";

function Input({
  className,
  type,
  id: _id,
  ...props
}: React.ComponentProps<"input">) {
  const context = useContext(FormControlContext);
  const id = _id ?? context?.id;

  return (
    <input
      id={id}
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-md bg-white px-4 font-medium outline-none transition-[box-shadow]",
        "shadow-[inset_0_0_0_1px_theme(colors.purple.300)]",
        "focus-visible:shadow-[inset_0_0_0_2px_theme(colors.purple.700)]",
        "aria-invalid:bg-red-50 aria-invalid:shadow-[inset_0_0_0_2px_theme(colors.red.500)]",
        className,
      )}
      aria-invalid={context?.isInvalid}
      {...props}
    />
  );
}

export { Input };
