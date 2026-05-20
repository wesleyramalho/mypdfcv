"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "../../lib/cn";

/**
 * Separator — thin horizontal or vertical divider between content.
 *
 * @example
 * <Separator orientation="vertical" />
 */
function Separator({ className, orientation = "horizontal", ...props }: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
