"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Eye, Download, GripVertical } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ROTATION_PAIRS: [[number, number], [number, number]][] = [
  [
    [0, 1],
    [1, 2],
  ],
  [
    [0, 1],
    [1, 2],
  ],
  [
    [0, 1],
    [1, 2],
  ],
];

export default function LandingFeatures() {
  const reorderRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("landing");

  const SECTION_ROWS = [t("workExperience"), t("skillsExpertise"), t("education")];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      ".features-heading",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-heading",
          start: "top 90%",
          once: true,
        },
      },
    );

    ScrollTrigger.batch(".feature-card-left", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15,
          },
        ),
      once: true,
      start: "top 85%",
    });

    gsap.fromTo(
      ".feature-card-right",
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".feature-card-right",
          start: "top 85%",
          once: true,
        },
      },
    );

    if (reorderRef.current) {
      const items = reorderRef.current.querySelectorAll<HTMLElement>(".reorder-item");
      if (items.length === 3) {
        const ROW_HEIGHT = items[0].offsetHeight + 8;

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0,
          scrollTrigger: {
            trigger: reorderRef.current,
            start: "top 85%",
            once: true,
          },
          delay: 1.5,
        });

        const pos = [0, 1, 2];

        for (const [swap1, swap2] of ROTATION_PAIRS) {
          const [visA1, visB1] = swap1;
          const domA1 = pos.indexOf(visA1);
          const domB1 = pos.indexOf(visB1);
          pos[domA1] = visB1;
          pos[domB1] = visA1;
          tl.to(items[domA1], {
            y: (pos[domA1] - domA1) * ROW_HEIGHT,
            duration: 0.4,
            ease: "power2.inOut",
          });
          tl.to(
            items[domB1],
            {
              y: (pos[domB1] - domB1) * ROW_HEIGHT,
              duration: 0.4,
              ease: "power2.inOut",
            },
            "<",
          );

          const [visA2, visB2] = swap2;
          const domA2 = pos.indexOf(visA2);
          const domB2 = pos.indexOf(visB2);
          pos[domA2] = visB2;
          pos[domB2] = visA2;
          tl.to(items[domA2], {
            y: (pos[domA2] - domA2) * ROW_HEIGHT,
            duration: 0.4,
            ease: "power2.inOut",
          });
          tl.to(
            items[domB2],
            {
              y: (pos[domB2] - domB2) * ROW_HEIGHT,
              duration: 0.4,
              ease: "power2.inOut",
            },
            "<",
          );

          tl.to({}, { duration: 2 });
        }
      }
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="features-heading mb-12">
          <SectionHeading className="mb-3">{t("featuresLabel")}</SectionHeading>
          <h2
            className="text-foreground font-sans font-bold"
            style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)" }}
          >
            {t("featuresHeading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <GlassCard className="feature-card-left flex min-h-65 flex-col gap-4 p-6 opacity-0">
              <div className="bg-surface-soft border-border flex h-10 w-10 items-center justify-center rounded-md border">
                <Eye className="text-foreground h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-sans text-lg font-semibold">
                  {t("previewTitle")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("previewDesc")}</p>
              </div>
              <div className="mt-auto flex gap-2 opacity-60">
                <div className="bg-surface-soft border-border flex-1 space-y-1.5 rounded border p-2">
                  {[70, 50, 85, 45].map((w, i) => (
                    <div
                      key={i}
                      className="bg-surface-strong h-1 rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
                <div className="bg-surface-soft border-border flex-1 space-y-1.5 rounded border p-2">
                  {[80, 55, 70, 40].map((w, i) => (
                    <div
                      key={i}
                      className="bg-surface-strong h-1 rounded"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="feature-card-left flex min-h-65 flex-col gap-4 p-6 opacity-0">
              <div className="bg-surface-soft border-border flex h-10 w-10 items-center justify-center rounded-md border">
                <Download className="text-foreground h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-foreground mb-2 font-sans text-lg font-semibold">
                  {t("exportTitle")}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("exportDesc")}</p>
              </div>
              <div className="mt-auto">
                <Link
                  href="/dashboard"
                  className="bg-foreground text-background inline-flex cursor-pointer items-center gap-2 rounded px-3 py-2 font-sans text-[10px] tracking-widest uppercase"
                >
                  <Download className="h-3 w-3" strokeWidth={2} />
                  {t("downloadPdf")}
                </Link>
              </div>
            </GlassCard>
          </div>

          <div className="feature-card-right bg-foreground text-background flex min-h-135 flex-col gap-4 rounded-xl p-6 opacity-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/10">
              <GripVertical className="text-background/70 h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-background mb-2 font-sans text-lg font-semibold">
                {t("reorderTitle")}
              </h3>
              <p className="text-background/60 text-sm leading-relaxed">{t("reorderDesc")}</p>
            </div>

            <div ref={reorderRef} className="mt-auto space-y-2">
              {SECTION_ROWS.map((label, i) => (
                <div
                  key={label}
                  className={`reorder-item flex items-center justify-between rounded-lg border px-4 py-3 ${
                    i === 0 ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5"
                  }`}
                >
                  <span className="text-background/70 font-sans text-xs tracking-widest uppercase">
                    {label}
                  </span>
                  <span className="text-background/30 font-sans text-sm">—</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
