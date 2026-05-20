import { SkillGroup } from "@/types/resume";
import { useTranslations } from "next-intl";
import { hexWithAlpha, type ResumeStyle } from "@/lib/resumeTemplates";

interface Props {
  skillGroups: SkillGroup[];
  style: ResumeStyle;
}

export default function PreviewSkills({ skillGroups, style: tmpl }: Props) {
  const t = useTranslations("resume");
  if (skillGroups.length === 0) return null;

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
        {t("technicalSkills")}
      </h2>
      {skillGroups.map((group) => (
        <div
          key={group.id}
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "3pt",
          }}
        >
          {group.category && (
            <span
              style={{
                fontSize: "7.5pt",
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.5pt",
                marginRight: "4pt",
                marginTop: "2pt",
                flexShrink: 0,
              }}
            >
              {group.category}
            </span>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4pt", marginTop: "2pt" }}>
            {group.skills.map((skill, i) => (
              <span
                key={i}
                style={{
                  fontSize: "7.5pt",
                  border: `0.5pt solid ${hexWithAlpha(tmpl.accentColor, 0.2)}`,
                  color: "#6b7280",
                  paddingLeft: "4pt",
                  paddingRight: "4pt",
                  paddingTop: "1.5pt",
                  paddingBottom: "1.5pt",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
