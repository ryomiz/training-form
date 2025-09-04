import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircleIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[5px] text-lg font-medium cursor-pointer transition-all disabled:pointer-events-none disabled:bg-purple-300 focus-visible:ring-purple-300 focus-visible:ring-[3px] outline-none",
  {
    variants: {
      variant: {
        default: "bg-purple-700 text-primary-foreground hover:bg-purple-800",
        ghost: "hover:bg-purple-50",
      },
      size: {
        default: "h-[45px]",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  disabled,
  asChild = false,
  isLoading = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <LoaderCircleIcon className={"animate-spin"} /> : children}
    </Comp>
  );
}

export { Button, buttonVariants };
