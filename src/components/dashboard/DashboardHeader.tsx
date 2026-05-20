"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Plus, LogOut, Palette, Upload, ChevronDown, FileText } from "lucide-react";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useResumeStore } from "@/store/useResumeStore";
import type { ResumeData } from "@/types/resume";

interface LinkedInImportResponse {
  data?: Partial<ResumeData>;
}
import TemplatePicker from "@/components/dashboard/TemplatePicker";
import { getTemplate } from "@/lib/resumeTemplates";
import { getLocalizedSampleData } from "@/lib/localizedSampleData";
import { importResumeFromFile } from "@/lib/resumeImport";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { LINKEDIN_OAUTH_ENABLED } from "@/lib/featureFlags";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

export default function DashboardHeader({
  activeTab = "resumes",
}: {
  activeTab?: "resumes" | "cover-letters";
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("dashboard");
  const tc = useTranslations("common");
  const createResume = useResumeStore((s) => s.createResume);
  const createCoverLetter = useCoverLetterStore((s) => s.createCoverLetter);
  const tcl = useTranslations("coverLetter");
  const hasConsumedImportIntent = useRef(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const [, setMobileImporting] = useState(false);

  async function handleMobileFileImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setMobileImporting(true);
    try {
      const { data, textLength } = await importResumeFromFile(file);
      if (textLength < 50) {
        toast.warning(t("scanWarning"));
      }
      const resume = createResume(t("importedResume"), data);
      track("file_imported", { fileType: file.name.split(".").pop() });
      const exp = data.experience?.length ?? 0;
      const edu = data.education?.length ?? 0;
      const skills = data.skillGroups?.reduce((n, g) => n + g.skills.length, 0) ?? 0;
      toast.success(
        t("importSuccess", {
          exp,
          edu,
          skills: skills > 0 ? t("skillsSuffix", { count: skills }) : "",
        }),
      );
      router.push(`/editor/${resume.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("parseFailed"));
    } finally {
      setMobileImporting(false);
    }
  }

  function handleTemplateSelect(templateId: string) {
    setPickerOpen(false);
    track("template_selected", { templateId });
    if (templateId === "blank") {
      const resume = createResume();
      router.push(`/editor/${resume.id}`);
      return;
    }
    const tmpl = getTemplate(templateId);
    const sampleData = getLocalizedSampleData(templateId, locale) ?? tmpl?.sampleData;
    const resume = createResume(tmpl?.name ?? t("untitledResume"), sampleData, templateId);
    router.push(`/editor/${resume.id}`);
  }

  const callbackUrl =
    locale === "en" ? "/dashboard?intent=import" : `/${locale}/dashboard?intent=import`;

  const handleLinkedInImport = useCallback(
    async (consumeIntent: boolean) => {
      setImportError(null);

      if (status === "loading") return;

      if (!session) {
        await signIn("linkedin", { callbackUrl });
        return;
      }

      setIsImporting(true);
      try {
        const response = await fetch("/api/linkedin/import", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error(t("importError"));
        }

        const result = (await response.json()) as LinkedInImportResponse;
        if (!result.data) {
          throw new Error(t("importNoData"));
        }

        const importedResume = createResume(t("importedResume"), result.data);
        track("linkedin_import");
        router.push(`/editor/${importedResume.id}`);
      } catch (error) {
        setImportError(error instanceof Error ? error.message : t("importFailed"));
        if (consumeIntent) {
          router.replace("/dashboard");
        }
      } finally {
        setIsImporting(false);
      }
    },
    [createResume, router, session, status, callbackUrl, t],
  );

  useEffect(() => {
    if (!LINKEDIN_OAUTH_ENABLED) return;
    const intent = searchParams.get("intent");
    if (intent !== "import" || hasConsumedImportIntent.current) return;
    if (status === "loading") return;
    hasConsumedImportIntent.current = true;
    void handleLinkedInImport(true);
  }, [handleLinkedInImport, searchParams, status]);

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  return (
    <header className="relative mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-text-subtle mb-2 font-sans text-xs tracking-[0.2em] uppercase">
          {t("portfolioOverview")}
        </p>
        <h1
          className="text-foreground font-sans font-bold"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          {activeTab === "cover-letters" ? t("coverLetterTitle") : t("title")}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-sm">
          {activeTab === "cover-letters" ? t("coverLetterSubtitle") : t("subtitle")}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={mobileFileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleMobileFileImport}
          className="hidden"
        />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <Button
                {...props}
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90 gap-2 font-sans text-xs tracking-widest uppercase"
              >
                <Plus className="h-4 w-4" />
                {t("createNew")}
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            )}
          />
          <DropdownMenuContent align="end" className="bg-card border-border min-w-55">
            <DropdownMenuItem onClick={() => setPickerOpen(true)} className="gap-2">
              <Palette className="h-4 w-4" />
              {t("fromTemplate")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const r = createResume();
                router.push(`/editor/${r.id}`);
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {t("blankResume")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const cl = createCoverLetter();
                router.push(`/cover-letter/${cl.id}`);
              }}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              {t("blankCoverLetter")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => mobileFileInputRef.current?.click()} className="gap-2">
              <Upload className="h-4 w-4" />
              {t("importFromFile")}
            </DropdownMenuItem>
            {LINKEDIN_OAUTH_ENABLED && (
              <DropdownMenuItem
                disabled={isImporting}
                onClick={() => {
                  if (session) {
                    void handleLinkedInImport(false);
                  } else {
                    void signIn("linkedin", { callbackUrl });
                  }
                }}
                className="gap-2"
              >
                <LinkedInIcon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span>
                    {isImporting
                      ? tc("importing")
                      : session
                        ? t("importFromLinkedIn")
                        : t("signInLinkedIn")}
                  </span>
                  <span className="text-muted-foreground text-[10px] font-normal">
                    {tc("linkedInLimited")}
                  </span>
                </div>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-surface-soft border-border text-foreground hover:bg-surface-strong flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border font-sans text-xs font-bold transition-colors">
              {session.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-destructive focus:text-destructive gap-2"
              >
                <LogOut className="h-4 w-4" />
                {t("signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {importError ? (
        <p className="text-destructive absolute right-0 -bottom-6 font-sans text-xs">
          {importError}
        </p>
      ) : null}

      <TemplatePicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={handleTemplateSelect}
      />
    </header>
  );
}
