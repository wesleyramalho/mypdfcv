import { MoreHorizontal, MoreVertical } from "lucide-react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MoreMenuTriggerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function MoreMenuTrigger({
  orientation = "vertical",
  className,
}: MoreMenuTriggerProps) {
  const Icon = orientation === "horizontal" ? MoreHorizontal : MoreVertical;
  return (
    <DropdownMenuTrigger
      className={cn(
        "border-border bg-surface-soft hover:bg-surface-strong text-muted-foreground hover:text-foreground inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors",
        className,
      )}
    >
      <Icon className="h-4 w-4" />
    </DropdownMenuTrigger>
  );
}
