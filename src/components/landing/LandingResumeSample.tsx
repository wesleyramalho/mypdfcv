"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LandingResumeSample() {
  const sampleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (sampleRef.current) {
      gsap.fromTo(
        sampleRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sampleRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }

    gsap.fromTo(
      ".sample-label",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sample-label",
          start: "top 90%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <section id="sample" className="bg-surface-soft/70 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <SectionHeading className="sample-label mb-4 justify-center">
            Privacy First
          </SectionHeading>
          <h2
            className="text-foreground font-sans font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Your Data Never Leaves Your Browser.
          </h2>
        </div>

        {/* Resume sample mockup */}
        <div
          ref={sampleRef}
          className="bg-card text-card-foreground border-border mx-auto max-w-2xl rounded-lg border p-10 font-sans shadow-xl"
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="border-border mb-6 border-b pb-6">
            <h3 className="text-card-foreground text-2xl font-bold tracking-widest uppercase">
              Alexander Vaughn
            </h3>
            <p className="text-muted-foreground mt-1 font-sans text-xs tracking-[0.15em] uppercase">
              Senior Technical Architect | New York City
            </p>
            <div className="text-text-subtle mt-3 flex flex-wrap gap-4 text-xs">
              <span>alex.vaughn@mypdfcv.com</span>
              <span>+1 (555) 847 3441</span>
              <span>New York, NY</span>
            </div>
          </div>

          {/* Profile */}
          <div className="mb-6">
            <h4 className="text-text-subtle mb-2 font-sans text-[10px] tracking-[0.2em] uppercase">
              Profile
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dedicated to the intersection of art and infrastructure. Over 12 years of experience
              building scalable, design-forward frameworks.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h4 className="text-text-subtle mb-3 font-sans text-[10px] tracking-[0.2em] uppercase">
              Professional Experience
            </h4>
            <div className="mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-card-foreground text-sm font-bold tracking-wide uppercase">
                    Metropolis Design Group
                  </p>
                  <p className="text-muted-foreground text-xs">Principal Systems Lead</p>
                </div>
                <span className="text-text-subtle font-sans text-[10px]">Jan 2019 – Present</span>
              </div>
              <ul className="mt-2 space-y-1">
                {[
                  "Associated large-scale urban development projects with budgets exceeding $40M.",
                  "Pioneered BIM detailing information modeling workflows that reduced design errors by 32%.",
                  "Maintained a team of 12 architects, fostering a culture of editorial design excellence.",
                ].map((item, i) => (
                  <li key={i} className="text-muted-foreground flex gap-2 text-xs">
                    <span className="text-border mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h4 className="text-text-subtle mb-2 font-sans text-[10px] tracking-[0.2em] uppercase">
              Education
            </h4>
            <div className="flex justify-between">
              <div>
                <p className="text-card-foreground text-sm font-bold">Pratt Institute</p>
                <p className="text-muted-foreground text-xs">Bachelor of Architecture & Art</p>
              </div>
              <span className="text-text-subtle font-sans text-[10px]">Sep – 2008</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-text-subtle mb-2 font-sans text-[10px] tracking-[0.2em] uppercase">
              Technical Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Revit", "AutoCAD", "Rhino 3D", "V-Ray", "Grasshopper"].map((s) => (
                <span
                  key={s}
                  className="border-border text-muted-foreground rounded border px-2 py-0.5 font-sans text-[10px] tracking-wider uppercase"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Quote */}
          <p className="border-border text-text-subtle mt-8 border-t pt-6 text-center text-xs italic">
            Everything runs locally in your browser. No data is sent to any server. No account
            needed. Just build and export.
          </p>
        </div>
      </div>
    </section>
  );
}
