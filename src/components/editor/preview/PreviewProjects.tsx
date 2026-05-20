import { ProjectEntry } from "@/types/resume";
import { formatMonthYear, toLocaleTag } from "@mypdfcv/pdf-core";
import { useTranslations, useLocale } from "next-intl";
import { hexWithAlpha, type ResumeStyle } from "@/lib/resumeTemplates";

interface Props {
  projects: ProjectEntry[];
  style: ResumeStyle;
}

export default function PreviewProjects({ projects, style: tmpl }: Props) {
  const t = useTranslations("resume");
  const locale = useLocale();
  const localeTag = toLocaleTag(locale);
  if (projects.length === 0) return null;

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
        {t("projects")}
      </h2>
      {projects.map((proj) => (
        <div key={proj.id} style={{ marginBottom: "8pt" }}>
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
                {proj.name}
              </p>
              {proj.technologies.length > 0 && (
                <p style={{ fontSize: "8pt", color: "#6b7280", marginTop: "1pt" }}>
                  {proj.technologies.join(" · ")}
                </p>
              )}
              {proj.url && (
                <p style={{ fontSize: "7.5pt", color: "#9ca3af", marginTop: "1pt" }}>{proj.url}</p>
              )}
            </div>
            <span
              style={{
                fontSize: "7.5pt",
                color: "#9ca3af",
                textAlign: "right",
                whiteSpace: "nowrap",
              }}
            >
              {formatMonthYear(proj.startDate, localeTag, t("present"))} –{" "}
              {formatMonthYear(proj.endDate, localeTag, t("present"))}
            </span>
          </div>
          {proj.description && (
            <p style={{ fontSize: "8.5pt", color: "#374151", marginTop: "2pt", lineHeight: 1.4 }}>
              {proj.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
