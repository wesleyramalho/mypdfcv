"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormTextarea } from "@/components/ui/FormInput";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { EXPORT_SUCCESS_EVENT } from "@/lib/subscribePrompt";
import { hasShownRatingPrompt, markRatingPromptShown } from "@/lib/ratingPrompt";
import { RATING_PROMPT_ENABLED } from "@/lib/featureFlags";
import { useResumeStore } from "@/store/useResumeStore";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";

const STARS = [1, 2, 3, 4, 5] as const;
const COMMENT_MAX_LENGTH = 500;
const EXPORT_THRESHOLD = 1;

function getTotalExports(): number {
  const resumes = useResumeStore.getState().resumes;
  const coverLetters = useCoverLetterStore.getState().coverLetters;
  return (
    resumes.reduce((sum, r) => sum + r.exportCount, 0) +
    coverLetters.reduce((sum, cl) => sum + cl.exportCount, 0)
  );
}

export default function RatingPromptModal() {
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState<number>(0);
  const [hoverStars, setHoverStars] = useState<number>(0);
  const [comment, setComment] = useState("");
  const t = useTranslations("rating");
  const pathname = usePathname();

  useEffect(() => {
    function handleExportSuccess() {
      if (!RATING_PROMPT_ENABLED) return;
      if (hasShownRatingPrompt()) return;
      if (getTotalExports() < EXPORT_THRESHOLD) return;
      setOpen(true);
      track("rating_prompt_shown");
    }
    window.addEventListener(EXPORT_SUCCESS_EVENT, handleExportSuccess);
    return () => {
      window.removeEventListener(EXPORT_SUCCESS_EVENT, handleExportSuccess);
    };
  }, []);

  // Reopen on every visit to the resume editor until the user submits.
  // The modal is mounted in the global layout, so navigation unmounts only
  // the React state — without this, users who navigate away can escape the
  // mandatory prompt by simply leaving the page.
  useEffect(() => {
    if (!RATING_PROMPT_ENABLED) return;
    if (!pathname?.match(/(^|\/)editor\/[^/]+$/)) return;
    if (hasShownRatingPrompt()) return;
    if (getTotalExports() < EXPORT_THRESHOLD) return;
    setOpen(true);
    track("rating_prompt_shown");
  }, [pathname]);

  const handleSubmit = useCallback(() => {
    if (stars < 1) return;
    const trimmed = comment.trim().slice(0, COMMENT_MAX_LENGTH);
    track("rating_submitted", {
      stars,
      hasComment: trimmed.length > 0,
      commentLength: trimmed.length,
      comment: trimmed || undefined,
    });
    markRatingPromptShown("rated");
    toast.success(t("thanks"));
    setOpen(false);
  }, [stars, comment, t]);

  // Mandatory once shown — block Escape, backdrop click, and any other
  // attempt to close without submitting a rating.
  const handleOpenChange = useCallback((next: boolean) => {
    if (next) setOpen(true);
  }, []);

  const displayedStars = hoverStars || stars;
  const canSubmit = stars > 0;

  const starsLabel = useMemo(() => t("starsLabel"), [t]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={false}
        onKeyDown={(e) => {
          if (e.key === "Escape") e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg">{t("title")}</DialogTitle>
          <DialogDescription className="pt-1 leading-relaxed">{t("description")}</DialogDescription>
        </DialogHeader>

        <div
          role="radiogroup"
          aria-label={starsLabel}
          className="flex items-center justify-center gap-1 py-2"
          onMouseLeave={() => setHoverStars(0)}
        >
          {STARS.map((value) => {
            const filled = value <= displayedStars;
            const selected = value === stars;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${value}`}
                onClick={() => setStars(value)}
                onMouseEnter={() => setHoverStars(value)}
                onFocus={() => setHoverStars(value)}
                onBlur={() => setHoverStars(0)}
                className="focus-visible:ring-ring/40 cursor-pointer rounded-md p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-3"
              >
                <Star
                  className={cn(
                    "size-7 transition-colors",
                    filled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                  )}
                />
              </button>
            );
          })}
        </div>

        <FormTextarea
          id="rating-comment"
          label={t("commentLabel")}
          placeholder={t("commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={COMMENT_MAX_LENGTH}
          rows={3}
        />

        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="font-sans text-xs tracking-widest uppercase"
          >
            {t("submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
