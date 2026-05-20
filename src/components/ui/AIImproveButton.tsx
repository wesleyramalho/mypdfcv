"use client";

import { useState } from "react";
import { Sparkles, Loader2, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAIImprove } from "@/hooks/useAIImprove";
import { track } from "@/lib/analytics";
import type { FieldType } from "@/types/ai-worker";

interface AIImproveButtonProps {
  text: string;
  fieldType: FieldType;
  onAccept: (improvedText: string) => void;
}

type Status = "idle" | "loading" | "suggestion" | "error";

export default function AIImproveButton({ text, fieldType, onAccept }: AIImproveButtonProps) {
  const { improve, modelStatus, downloadProgress } = useAIImprove();
  const [status, setStatus] = useState<Status>("idle");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const t = useTranslations("ai");

  const disabled = text.trim().length < 10;

  async function handleImprove() {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const result = await improve(text, fieldType);
      setSuggestion(result);
      setStatus("suggestion");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to improve text");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  function handleAccept() {
    if (suggestion) {
      onAccept(suggestion);
      track("ai_improve_accepted", { fieldType });
    }
    setSuggestion(null);
    setStatus("idle");
  }

  function handleDismiss() {
    setSuggestion(null);
    setStatus("idle");
  }

  const isDownloading = status === "loading" && modelStatus === "downloading";

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={disabled || status === "loading"}
        onClick={handleImprove}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-sans text-[10px] tracking-widest uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            {isDownloading ? t("loadingModel", { progress: downloadProgress }) : t("improving")}
          </>
        ) : (
          <>
            <Sparkles className="h-3 w-3" />
            {t("improve")}
          </>
        )}
      </button>

      {status === "error" && errorMsg && (
        <p className="text-destructive font-sans text-[10px]">{errorMsg}</p>
      )}

      {status === "suggestion" && suggestion && (
        <div className="border-brand-secondary/30 bg-brand-secondary/5 rounded-md border p-3">
          <p className="text-muted-foreground mb-1.5 font-sans text-[10px] tracking-widest uppercase">
            {t("suggestion")}
          </p>
          <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">
            {suggestion}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAccept}
              className="text-brand-secondary hover:text-foreground inline-flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase transition-colors"
            >
              <Check className="h-3 w-3" />
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase transition-colors"
            >
              <X className="h-3 w-3" />
              {t("dismiss")}
            </button>
          </div>
          <p className="text-muted-foreground/60 mt-2 text-[9px] leading-relaxed">
            {t("disclaimer")}
          </p>
        </div>
      )}
    </div>
  );
}
