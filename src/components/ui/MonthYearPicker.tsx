"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

function getLocalizedMonths(locale: string): string[] {
  const tag = locale === "pt-BR" ? "pt-BR" : "en-US";
  return Array.from({ length: 12 }, (_, i) =>
    new Date(2024, i).toLocaleDateString(tag, { month: "short" }),
  );
}

interface MonthYearPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
}

export default function MonthYearPicker({
  value,
  onChange,
  placeholder,
  disabled = false,
  id,
  label,
}: MonthYearPickerProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const MONTHS = getLocalizedMonths(locale);

  function formatDisplay(val: string): string {
    if (!val) return "";
    const [year, month] = val.split("-");
    const m = parseInt(month, 10);
    if (isNaN(m) || m < 1 || m > 12) return val;
    return `${MONTHS[m - 1]} ${year}`;
  }

  const currentYear = new Date().getFullYear();
  const initialYear = value ? parseInt(value.split("-")[0], 10) : currentYear;
  const [viewYear, setViewYear] = useState(initialYear);
  const [open, setOpen] = useState(false);

  const selectedMonth = value ? parseInt(value.split("-")[1], 10) : null;
  const selectedYear = value ? parseInt(value.split("-")[0], 10) : null;

  function handleSelect(monthIndex: number) {
    const mm = String(monthIndex + 1).padStart(2, "0");
    onChange(`${viewYear}-${mm}`);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-text-subtle font-sans text-xs tracking-widest uppercase"
        >
          {label}
        </label>
      )}
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          id={id}
          disabled={disabled}
          className="bg-input border-border hover:border-ring focus:border-ring flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CalendarDays className="text-muted-foreground h-4 w-4 shrink-0" />
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value ? formatDisplay(value) : (placeholder ?? t("selectDate"))}
          </span>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner sideOffset={4} align="start">
            <PopoverPrimitive.Popup className="bg-card border-border z-50 w-[220px] rounded-lg border p-3 shadow-lg">
              {/* Year navigation */}
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y - 1)}
                  className="hover:bg-surface-soft text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-foreground font-sans text-sm font-semibold">{viewYear}</span>
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y + 1)}
                  className="hover:bg-surface-soft text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Month grid */}
              <div className="grid grid-cols-3 gap-1">
                {MONTHS.map((month, i) => {
                  const isSelected = selectedYear === viewYear && selectedMonth === i + 1;
                  return (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleSelect(i)}
                      className={`rounded-md px-2 py-1.5 font-sans text-xs transition-colors ${
                        isSelected
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-surface-soft"
                      }`}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}
