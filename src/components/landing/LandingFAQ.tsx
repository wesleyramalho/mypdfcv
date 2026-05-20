"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQ_KEYS = ["WhatIs", "Free", "Templates", "Privacy", "Export", "Customization"] as const;

export default function LandingFAQ() {
  const t = useTranslations("landing");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      ".faq-heading",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".faq-heading",
          start: "top 90%",
          once: true,
        },
      },
    );

    ScrollTrigger.batch(".faq-item", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          },
        ),
      once: true,
      start: "top 85%",
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="faq-heading mb-12 text-center">
          <SectionHeading className="mb-3">{t("faqLabel")}</SectionHeading>
          <h3
            className="text-foreground font-sans font-bold"
            style={{ fontSize: "clamp(1.6rem, 3vw, 3rem)" }}
          >
            {t("faqHeading")}
          </h3>
        </div>

        <Accordion>
          {FAQ_KEYS.map((key) => (
            <AccordionItem key={key} value={key} className="faq-item border-border opacity-0">
              <AccordionTrigger className="py-4 text-base font-medium">
                {t(`faq${key}Q`)}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">{t(`faq${key}A`)}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
