"use client";

import { useTranslations } from "next-intl";
import { Link2, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoverLetterData } from "@/types/coverLetter";
import { useResumeStore } from "@/store/useResumeStore";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { track } from "@/lib/analytics";

interface Props {
  coverLetterId: string;
  data: CoverLetterData;
}

export default function ResumeLinkSection({ coverLetterId, data }: Props) {
  const t = useTranslations("coverLetter");
  const resumes = useResumeStore((s) => s.resumes);
  const updateCoverLetter = useCoverLetterStore((s) => s.updateCoverLetter);
  const linkedResume = resumes.find((r) => r.id === data.linkedResumeId);

  function handleLink(resumeId: string) {
    const resume = resumes.find((r) => r.id === resumeId);
    if (!resume) return;
    updateCoverLetter(coverLetterId, {
      linkedResumeId: resumeId,
      senderName: resume.data.fullName,
      senderContact: { ...resume.data.contact },
    });
    track("cover_letter_resume_linked", { resumeId });
  }

  function handleUnlink() {
    updateCoverLetter(coverLetterId, {
      linkedResumeId: undefined,
    });
    track("cover_letter_resume_unlinked");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-sans text-sm font-medium tracking-widest uppercase">
          {t("resumeLink")}
        </h3>
        {linkedResume && (
          <Badge
            variant="secondary"
            className="border-emerald-500/20 bg-emerald-500/10 font-sans text-[10px] tracking-widest text-emerald-700 uppercase dark:text-emerald-300"
          >
            <Link2 className="mr-1 h-3 w-3" />
            {t("linked")}
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground text-xs">{t("resumeLinkDesc")}</p>

      {linkedResume ? (
        <div className="flex items-center gap-2">
          <span className="text-foreground flex-1 truncate text-sm">{linkedResume.name}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleUnlink}
            className="text-muted-foreground gap-1.5 font-sans text-xs tracking-widest uppercase"
          >
            <Link2Off className="h-3.5 w-3.5" />
            {t("unlink")}
          </Button>
        </div>
      ) : (
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) handleLink(e.target.value);
          }}
          className="bg-input border-border text-foreground focus:border-ring w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none"
        >
          <option value="">{t("selectResume")}</option>
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
