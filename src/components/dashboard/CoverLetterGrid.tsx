"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { CoverLetter } from "@/types/coverLetter";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import CoverLetterCard from "./CoverLetterCard";

interface Props {
  coverLetters: CoverLetter[];
}

export default function CoverLetterGrid({ coverLetters }: Props) {
  const router = useRouter();
  const createCoverLetter = useCoverLetterStore((s) => s.createCoverLetter);
  const t = useTranslations("coverLetter");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || coverLetters.length === 0) return;

    gsap.fromTo(
      ".cover-letter-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.1,
      },
    );
  }, [coverLetters.length]);

  function handleCreate() {
    const cl = createCoverLetter();
    router.push(`/cover-letter/${cl.id}`);
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {coverLetters.map((cl) => (
        <div key={cl.id} className="cover-letter-card opacity-0">
          <CoverLetterCard coverLetter={cl} />
        </div>
      ))}

      <button
        onClick={handleCreate}
        className="group border-border hover:border-brand-secondary/60 hover:bg-surface-soft text-muted-foreground hover:text-foreground flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-lg border border-dashed transition-all"
      >
        <div className="border-border group-hover:border-brand-secondary/60 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
          <Plus className="h-5 w-5" />
        </div>
        <div className="text-center">
          <p className="font-sans text-sm font-medium">{t("newCoverLetter")}</p>
          <p className="text-muted-foreground/60 mt-1 font-sans text-[10px] tracking-widest uppercase">
            {t("chooseToStart")}
          </p>
        </div>
      </button>
    </div>
  );
}
