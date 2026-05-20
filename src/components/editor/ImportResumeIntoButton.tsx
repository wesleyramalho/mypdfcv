"use client";

import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/useResumeStore";
import { importResumeFromFile } from "@/lib/resumeImport";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  resumeId: string;
}

export default function ImportResumeIntoButton({ resumeId }: Props) {
  const updateResume = useResumeStore((s) => s.updateResume);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const t = useTranslations("editor");
  const tc = useTranslations("common");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setImporting(true);
    try {
      const { data, textLength } = await importResumeFromFile(file);

      if (textLength < 50) {
        toast.warning(t("scanWarning"));
      }

      updateResume(resumeId, data);

      const exp = data.experience?.length ?? 0;
      const edu = data.education?.length ?? 0;
      toast.success(t("importSuccess", { exp, edu }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("parseFailed"));
    } finally {
      setImporting(false);
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc"
        onChange={handleFile}
        className="hidden"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={(props) => (
              <Button
                {...props}
                variant="outline"
                size="sm"
                disabled={importing}
                onClick={() => fileInputRef.current?.click()}
                className="gap-1.5 font-sans text-xs tracking-widest uppercase"
              >
                {importing ? <Loader2 className="animate-spin" /> : <Upload />}
                <span className="hidden sm:inline">
                  {importing ? tc("importing") : tc("import")}
                </span>
              </Button>
            )}
          />
          <TooltipContent>{tc("importFileTooltip")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
