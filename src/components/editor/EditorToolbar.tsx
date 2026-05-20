"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { FileDown, ArrowLeft, Check, Loader2, Palette, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resume, ResumeData } from "@/types/resume";
import { useResumeStore } from "@/store/useResumeStore";
import { useResumeAutoSave } from "@/hooks/useResumeAutoSave";
import { useExportPDF } from "@/hooks/useExportPDF";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { toast } from "sonner";
import { getTemplate } from "@/lib/resumeTemplates";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import TemplatePicker from "@/components/dashboard/TemplatePicker";
import ImportResumeIntoButton from "@/components/editor/ImportResumeIntoButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import MoreMenuTrigger from "@/components/ui/MoreMenuTrigger";
import { importResumeFromFile } from "@/lib/resumeImport";
import { track } from "@/lib/analytics";
import { LINKEDIN_OAUTH_ENABLED } from "@/lib/featureFlags";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const LANGUAGES = [
  { code: "en", flag: "\u{1F1FA}\u{1F1F8}", label: "English" },
  { code: "pt-BR", flag: "\u{1F1E7}\u{1F1F7}", label: "Portugu\u00EAs (Brasil)" },
  { code: "es", flag: "\u{1F1EA}\u{1F1F8}", label: "Español" },
  { code: "it", flag: "\u{1F1EE}\u{1F1F9}", label: "Italiano" },
  { code: "zh", flag: "\u{1F1E8}\u{1F1F3}", label: "中文" },
  { code: "ja", flag: "\u{1F1EF}\u{1F1F5}", label: "日本語" },
  { code: "de", flag: "\u{1F1E9}\u{1F1EA}", label: "Deutsch" },
  { code: "hi", flag: "\u{1F1EE}\u{1F1F3}", label: "हिन्दी" },
];

interface Props {
  resume: Resume;
}
interface LinkedInImportResponse {
  data?: Partial<ResumeData>;
}

export default function EditorToolbar({ resume }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const locale = useLocale();
  const t = useTranslations("editor");
  const tc = useTranslations("common");
  const saveStatus = useResumeAutoSave(resume.id);
  const { exportPDF, exporting } = useExportPDF();
  const updateResumeName = useResumeStore((s) => s.updateResumeName);
  const updateResume = useResumeStore((s) => s.updateResume);
  const updateTemplateId = useResumeStore((s) => s.updateTemplateId);
  const [importing, setImporting] = useState(false);
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);
  const hasConsumedImportIntent = useRef(false);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const [mobileImporting, setMobileImporting] = useState(false);

  const currentTemplate = resume.templateId ? getTemplate(resume.templateId) : null;

  function handleTemplateSelect(templateId: string) {
    setTemplatePickerOpen(false);
    if (templateId !== "blank") {
      updateTemplateId(resume.id, templateId);
      track("template_selected", { templateId });
    }
  }

  async function handleMobileFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setMobileImporting(true);
    try {
      const { data, textLength } = await importResumeFromFile(file);
      if (textLength < 50) toast.warning(t("scanWarning"));
      updateResume(resume.id, data);
      const exp = data.experience?.length ?? 0;
      const edu = data.education?.length ?? 0;
      toast.success(t("importSuccess", { exp, edu }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("parseFailed"));
    } finally {
      setMobileImporting(false);
    }
  }

  const callbackUrl =
    locale === "en"
      ? `/editor/${resume.id}?intent=import`
      : `/${locale}/editor/${resume.id}?intent=import`;

  const handleLinkedInImport = useCallback(async () => {
    if (!session) {
      await signIn("linkedin", { callbackUrl });
      return;
    }
    setImporting(true);
    try {
      const res = await fetch("/api/linkedin/import", { method: "POST" });
      if (!res.ok) throw new Error("Import failed");
      const result = (await res.json()) as LinkedInImportResponse;
      if (result.data) {
        updateResume(resume.id, { ...result.data, linkedInImported: true });
        toast.success(t("linkedInImported"));
      }
    } catch {
      toast.error(t("linkedInFailed"));
    } finally {
      setImporting(false);
    }
  }, [session, resume.id, updateResume, callbackUrl, t]);

  useEffect(() => {
    if (!LINKEDIN_OAUTH_ENABLED) return;
    const intent = searchParams.get("intent");
    if (intent !== "import" || hasConsumedImportIntent.current) return;
    if (status === "loading" || !session) return;
    hasConsumedImportIntent.current = true;
    void (async () => {
      await handleLinkedInImport();
      router.replace(`/editor/${resume.id}`);
    })();
  }, [handleLinkedInImport, searchParams, session, status, resume.id, router]);

  return (
    <div className="border-border bg-background/95 sticky top-0 z-30 flex items-center gap-2 border-b px-3 py-2 backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-3">
      <input
        ref={mobileFileInputRef}
        type="file"
        accept=".pdf,.docx,.doc"
        onChange={handleMobileFileImport}
        className="hidden"
      />

      <button
        onClick={() => router.push("/dashboard")}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={t("backToDashboard")}
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="bg-border h-4 w-px" />

      <input
        value={resume.name}
        onChange={(e) => updateResumeName(resume.id, e.target.value)}
        className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent font-sans text-sm focus:outline-none"
        placeholder={t("resumeName")}
        aria-label={t("resumeName")}
      />

      <Button
        size="sm"
        variant="outline"
        onClick={() => setTemplatePickerOpen(true)}
        className="hidden shrink-0 gap-1.5 font-sans text-xs tracking-widest uppercase sm:inline-flex"
      >
        <Palette />
        <span className="hidden sm:inline">{currentTemplate?.name ?? "Default"}</span>
      </Button>
      <TemplatePicker
        open={templatePickerOpen}
        onOpenChange={setTemplatePickerOpen}
        onSelect={handleTemplateSelect}
        hideBlank
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

      <div className="hidden sm:flex">
        <ImportResumeIntoButton resumeId={resume.id} />
      </div>

      {LINKEDIN_OAUTH_ENABLED && !resume.data.linkedInImported && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={(props) => (
                <Button
                  {...props}
                  size="sm"
                  variant="outline"
                  onClick={() => void handleLinkedInImport()}
                  disabled={importing}
                  className="hidden gap-2 font-sans text-xs tracking-widest uppercase sm:inline-flex"
                >
                  {importing ? <Loader2 className="animate-spin" /> : <LinkedInIcon />}
                  <span className="hidden md:inline">{tc("import")}</span>
                </Button>
              )}
            />
            <TooltipContent>{tc("linkedInTooltip")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <DropdownMenu>
        <MoreMenuTrigger className="sm:hidden" />
        <DropdownMenuContent align="end" className="bg-card border-border">
          <DropdownMenuItem onClick={() => setTemplatePickerOpen(true)} className="gap-2">
            <Palette className="h-4 w-4" />
            {currentTemplate?.name ?? t("changeTemplate")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => mobileFileInputRef.current?.click()}
            disabled={mobileImporting}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {mobileImporting ? tc("importing") : t("importFile")}
          </DropdownMenuItem>
          {LINKEDIN_OAUTH_ENABLED && !resume.data.linkedInImported && (
            <DropdownMenuItem
              onClick={() => void handleLinkedInImport()}
              disabled={importing}
              className="gap-2"
            >
              <LinkedInIcon className="h-4 w-4" />
              {importing ? tc("importing") : t("startWithLinkedIn")}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {LANGUAGES.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => {
                if (lang.code !== locale) router.replace(pathname, { locale: lang.code });
              }}
              className={`gap-2 ${locale === lang.code ? "font-medium" : ""}`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        size="sm"
        onClick={() => exportPDF(resume)}
        disabled={exporting}
        className="gap-2 font-sans text-xs tracking-widest uppercase"
      >
        {exporting ? <Loader2 className="animate-spin" /> : <FileDown />}
        <span className="hidden sm:inline">{t("exportPdf")}</span>
        <span className="sm:hidden">{tc("export")}</span>
      </Button>
      <div className="hidden sm:flex">
        <LanguageSwitcher />
      </div>
      <ThemeToggle />
    </div>
  );
}
