import { ExperienceEntry } from "@/types/resume";
import { formatMonthYear, toLocaleTag } from "@mypdfcv/pdf-core";
import { useTranslations, useLocale } from "next-intl";
import { hexWithAlpha, type ResumeStyle } from "@/lib/resumeTemplates";

interface Props {
  experience: ExperienceEntry[];
  style: ResumeStyle;
}

export default function PreviewExperience({ experience, style: tmpl }: Props) {
  const t = useTranslations("resume");
  const locale = useLocale();
  const localeTag = toLocaleTag(locale);

  if (experience.length === 0) return null;

  return (
    <div style={{ marginBottom: "10pt" }}>
      <h2
        style={{
          fontSize: "7pt",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "1.5pt",
          color: hexWithAlpha(tmpl.accentColor, 0.4),
          borderBottom:
            tmpl.sectionDivider === "line"
              ? `0.5pt solid ${hexWithAlpha(tmpl.accentColor, 0.15)}`
              : "none",
          paddingBottom: "3pt",
          marginBottom: "6pt",
        }}
      >
        {t("professionalExperience")}
      </h2>
      {experience.map((exp) => (
        <div key={exp.id} style={{ marginBottom: "8pt" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <p
                style={{
                  fontSize: "9pt",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5pt",
                  color: tmpl.accentColor,
                }}
              >
                {exp.company}
              </p>
              <p style={{ fontSize: "8pt", color: "#6b7280", marginTop: "1pt" }}>
                {exp.title}
                {exp.location ? ` · ${exp.location}` : ""}
              </p>
            </div>
            <span
              style={{
                fontSize: "7.5pt",
                color: "#9ca3af",
                textAlign: "right",
                whiteSpace: "nowrap",
              }}
            >
              {formatMonthYear(exp.startDate, localeTag, t("present"))} –{" "}
              {exp.current ? t("present") : formatMonthYear(exp.endDate, localeTag, t("present"))}
            </span>
          </div>
          {exp.description &&
            exp.description
              .split("\n")
              .filter(Boolean)
              .map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "4pt",
                    marginTop: "2pt",
                  }}
                >
                  <span style={{ fontSize: "9pt", color: "#d1d5db", marginTop: "0.5pt" }}>•</span>
                  <span style={{ fontSize: "8.5pt", color: "#374151", lineHeight: 1.4 }}>
                    {line}
                  </span>
                </div>
              ))}
        </div>
      ))}
    </div>
  );
}
