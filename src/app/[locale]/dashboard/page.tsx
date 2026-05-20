"use client";

import { Suspense, useState } from "react";
import { useTranslations } from "next-intl";
import { useResumeStore } from "@/store/useResumeStore";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ResumeGrid from "@/components/dashboard/ResumeGrid";
import CoverLetterGrid from "@/components/dashboard/CoverLetterGrid";
import { Link } from "@/i18n/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const resumes = useResumeStore((s) => s.resumes);
  const coverLetters = useCoverLetterStore((s) => s.coverLetters);
  const t = useTranslations("common");
  const td = useTranslations("dashboard");
  const [activeTab, setActiveTab] = useState<"resumes" | "cover-letters">("resumes");

  return (
    <div className="bg-background min-h-screen">
      {/* Top nav bar */}
      <nav className="border-border bg-background/90 sticky top-0 z-40 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md md:px-12">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-foreground font-sans text-sm font-bold tracking-widest uppercase"
          >
            {t("appName")}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>

      {/* Sticky tabs bar */}
      <div className="bg-background/95 border-border sticky top-14.25 z-30 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl gap-1 px-6 md:px-12">
          <button
            onClick={() => setActiveTab("resumes")}
            className={`relative px-4 py-3 font-sans text-sm tracking-widest uppercase transition-colors ${
              activeTab === "resumes"
                ? "text-foreground after:bg-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {td("resumesTab")}
          </button>
          <button
            onClick={() => setActiveTab("cover-letters")}
            className={`relative px-4 py-3 font-sans text-sm tracking-widest uppercase transition-colors ${
              activeTab === "cover-letters"
                ? "text-foreground after:bg-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {td("coverLettersTab")}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <Suspense>
          <DashboardHeader activeTab={activeTab} />
        </Suspense>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            {activeTab === "resumes" && <ResumeGrid resumes={resumes} />}
            {activeTab === "cover-letters" && <CoverLetterGrid coverLetters={coverLetters} />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
