"use client";

import { ArrowLeft, Check, Loader2, FileDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CoverLetter } from "@/types/coverLetter";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { useCoverLetterAutoSave } from "@/hooks/useCoverLetterAutoSave";
import { useExportCoverLetterPDF } from "@/hooks/useExportCoverLetterPDF";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface Props {
  coverLetter: CoverLetter;
}

export default function CoverLetterToolbar({ coverLetter }: Props) {
  const router = useRouter();
  const t = useTranslations("coverLetter");
  const tc = useTranslations("common");
  const saveStatus = useCoverLetterAutoSave(coverLetter.id);
  const updateName = useCoverLetterStore((s) => s.updateCoverLetterName);
  const { exportPDF, exporting } = useExportCoverLetterPDF();

  return (
    <div className="border-border bg-background/95 sticky top-0 z-30 flex items-center gap-2 border-b px-3 py-2 backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-3">
      <button
        onClick={() => router.push("/dashboard")}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={t("backToDashboard")}
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="bg-border h-4 w-px" />

      <input
        value={coverLetter.name}
        onChange={(e) => updateName(coverLetter.id, e.target.value)}
        className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent font-sans text-sm focus:outline-none"
        placeholder={t("coverLetterName")}
        aria-label={t("coverLetterName")}
      />

      <div className="text-muted-foreground hidden items-center gap-1 font-sans text-[10px] tracking-widest uppercase sm:flex">
        {saveStatus === "saving" ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            {tc("saving")}
          </>
        ) : (
          <>
            <Check className="h-3 w-3 text-emerald-500" />
            {tc("saved")}
          </>
        )}
      </div>

      <Button
        size="sm"
        onClick={() => exportPDF(coverLetter)}
        disabled={exporting}
        className="gap-2 font-sans text-xs tracking-widest uppercase"
      >
        {exporting ? <Loader2 className="animate-spin" /> : <FileDown />}
        <span className="hidden sm:inline">{tc("export")}</span>
      </Button>

      <div className="hidden sm:flex">
        <LanguageSwitcher />
      </div>
      <ThemeToggle />
    </div>
  );
}
