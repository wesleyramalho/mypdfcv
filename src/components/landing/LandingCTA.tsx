"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import GlowBorderCanvas from "@/components/ui/GlowBorderCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LandingCTA() {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("landing");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.96, y: 24 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }
  }, []);

  return (
    <section className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <div ref={cardRef} className="relative inline-block w-full" style={{ opacity: 0 }}>
          <GlowBorderCanvas
            borderRadius={12}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />

          <div className="bg-card border-border relative rounded-xl border p-6 shadow-sm sm:p-12">
            <p className="text-text-subtle mb-4 font-sans text-xs tracking-[0.2em] uppercase">
              {t("ctaLabel")}
            </p>
            <h2
              className="text-foreground mb-6 font-sans font-bold"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
            >
              {t("ctaHeading")}
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-sm leading-relaxed">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="bg-foreground text-background hover:bg-foreground/90 px-10 font-sans text-xs tracking-widest uppercase"
              >
                {t("ctaButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
