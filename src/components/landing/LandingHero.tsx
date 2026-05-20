"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Eye, User, Briefcase, GraduationCap } from "lucide-react";

export default function LandingHero() {
  const hasAnimated = useRef(false);
  const mockupRef = useRef<HTMLDivElement>(null);
  const heroCardsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("landing");

  const HEADLINE_WORDS = [
    { text: t("headlineYour"), teal: false },
    { text: t("headlineResume"), teal: false },
    { text: t("headlineFree"), teal: true },
    { text: t("headlineForever"), teal: false },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.from(".hero-char", {
      opacity: 0,
      y: 50,
      rotateX: -90,
      duration: 0.45,
      ease: "power3.out",
      stagger: 0.025,
      delay: 0.2,
      transformOrigin: "0% 50% -40px",
    });

    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.9 },
    );

    gsap.fromTo(
      ".hero-cta",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.1 },
    );

    gsap.fromTo(
      ".hero-mockup",
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power2.out", delay: 0.5 },
    );

    if (mockupRef.current) {
      gsap.to(mockupRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (heroCardsRef.current) {
      const cards = heroCardsRef.current.querySelectorAll<HTMLElement>(".hero-card");
      if (cards.length >= 2) {
        const card1 = cards[0];
        const card2 = cards[1];
        const gap = 8;
        const h1 = card1.offsetHeight + gap;
        const h2 = card2.offsetHeight + gap;

        gsap
          .timeline({ repeat: -1, repeatDelay: 2, delay: 2 })
          .to(card1, { y: h2, duration: 0.5, ease: "power2.inOut" }, "swap")
          .to(card2, { y: -h1, duration: 0.5, ease: "power2.inOut" }, "swap")
          .to({}, { duration: 2 })
          .to(card1, { y: 0, duration: 0.5, ease: "power2.inOut" }, "back")
          .to(card2, { y: 0, duration: 0.5, ease: "power2.inOut" }, "back");
      }
    }
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 md:px-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, color-mix(in srgb, var(--brand-primary) 18%, transparent) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <h1
            className="mb-6 overflow-hidden font-sans leading-[1.05] font-bold tracking-tight [perspective:800px]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            {HEADLINE_WORDS.map((word, wi) => (
              <React.Fragment key={wi}>
                <span
                  className={`inline-block whitespace-nowrap ${word.teal ? "text-brand-primary" : "text-foreground"}`}
                >
                  {word.text.split("").map((char, ci) => (
                    <span key={ci} className="hero-char inline-block" aria-hidden="true">
                      {char}
                    </span>
                  ))}
                </span>
                {wi < HEADLINE_WORDS.length - 1 && (
                  <span className="hero-char text-foreground inline-block" aria-hidden="true">
                    &nbsp;
                  </span>
                )}
              </React.Fragment>
            ))}
            <span className="sr-only">{t("headlineSr")}</span>
          </h1>

          <p className="hero-subtitle text-muted-foreground mb-8 max-w-lg text-base leading-relaxed md:text-lg">
            {t("subtitle")}
          </p>

          <div className="hero-cta flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="bg-foreground text-background hover:bg-foreground/90 font-sans text-xs tracking-widest uppercase"
            >
              {t("cta")}
            </Button>
          </div>
        </div>

        <div ref={mockupRef} className="hero-mockup hidden lg:block">
          <div className="bg-surface-soft border-border animate-glow-border rounded-xl border p-3 shadow-lg">
            <div className="flex h-[340px] gap-2">
              <div className="bg-card border-border flex w-[30%] flex-col gap-1.5 rounded-lg border p-3">
                <div className="bg-surface-strong mb-3 h-1.5 w-20 rounded" />
                {[User, Briefcase, GraduationCap].map((Icon, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 rounded-md px-2 py-2 ${i === 0 ? "bg-surface-strong" : ""}`}
                  >
                    <Icon
                      className="text-muted-foreground h-3.5 w-3.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <div className="bg-surface-strong h-1.5 flex-1 rounded" />
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="bg-card border-border rounded-lg border p-3">
                  <div className="mb-2 flex items-start gap-2">
                    <div className="bg-foreground/20 h-8 w-px rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <div className="bg-surface-strong h-1.5 w-24 rounded" />
                      <div className="bg-foreground/70 h-3 w-40 rounded" />
                      <div className="bg-surface-strong h-1.5 w-full rounded" />
                      <div className="bg-surface-strong h-1.5 w-4/5 rounded" />
                    </div>
                  </div>
                </div>

                <div ref={heroCardsRef} className="flex flex-col gap-2">
                  <div className="hero-card bg-accent/40 border-brand-primary/20 relative rounded-lg border p-3">
                    <div className="bg-muted-foreground/20 mb-2 h-1.5 w-16 rounded" />
                    <div className="bg-foreground/50 mb-1.5 h-3 w-36 rounded" />
                    <div className="bg-muted-foreground/20 h-1.5 w-3/4 rounded" />
                    <div className="absolute top-3 right-3 grid grid-cols-2 gap-[3px]">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-muted-foreground/40 h-1 w-1 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <div className="hero-card bg-card border-border rounded-lg border p-3">
                    <div className="bg-surface-strong mb-2 h-1.5 w-20 rounded" />
                    <div className="bg-surface-strong h-2.5 w-28 rounded" />
                  </div>
                </div>

                <div className="mt-auto flex justify-end">
                  <div className="bg-surface-soft border-border flex items-center gap-1.5 rounded-lg border px-3 py-1.5">
                    <Eye className="text-foreground h-3 w-3" strokeWidth={1.5} />
                    <span className="text-foreground font-sans text-[9px] tracking-widest uppercase">
                      {t("livePreview")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
