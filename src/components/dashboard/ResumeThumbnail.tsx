"use client";

import { useTranslations } from "next-intl";
import { ResumeData } from "@/types/resume";
import { getResumeStyle, hexWithAlpha } from "@/lib/resumeTemplates";

interface Props {
  data: ResumeData;
  templateId?: string;
}

export default function ResumeThumbnail({ data, templateId }: Props) {
  const t = useTranslations("resume");
  const style = getResumeStyle(templateId);
  const { accentColor, sectionDivider, sidebarColor, headerBgColor, headerLayout } = style;
  const dividerBorder =
    sectionDivider === "line" ? `1px solid ${hexWithAlpha(accentColor, 0.15)}` : "none";
  const isCentered = headerLayout === "centered";

  // Content block shared by both sidebar and standard layouts
  const contentBlock = (
    <>
      {/* Header — only for non-sidebar layouts */}
      {!sidebarColor && (
        <div
          style={{
            borderBottom: headerBgColor ? "none" : `1px solid ${hexWithAlpha(accentColor, 0.25)}`,
            paddingBottom: "1rem",
            marginBottom: "1rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            flexDirection: isCentered ? "column" : "row",
            ...(isCentered ? { alignItems: "center", textAlign: "center" } : {}),
            ...(headerBgColor
              ? {
                  backgroundColor: headerBgColor,
                  margin: "-2rem -2rem 1rem -2rem",
                  padding: "1.5rem 2rem",
                }
              : {}),
          }}
        >
          {data.photo && !isCentered && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.photo}
              alt=""
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          )}
          <div style={{ textAlign: isCentered ? "center" : "left" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: headerBgColor ? "#ffffff" : accentColor,
              }}
            >
              {data.fullName || "Your Name"}
            </h1>
            <p
              style={{
                fontSize: "0.75rem",
                color: headerBgColor ? "rgba(255,255,255,0.7)" : "#6b7280",
                marginTop: "0.15rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {data.headline || "Your Headline"}
            </p>
            {/* Contact row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "0.3rem",
                fontSize: "0.5rem",
                color: headerBgColor ? "rgba(255,255,255,0.5)" : "#9ca3af",
                ...(isCentered ? { justifyContent: "center" } : {}),
              }}
            >
              {[data.contact.email, data.contact.location, data.contact.phone]
                .filter(Boolean)
                .map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div style={{ marginBottom: "0.75rem" }}>
          <p
            style={{
              fontSize: "0.6rem",
              color: hexWithAlpha(accentColor, 0.4),
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "0.35rem",
              borderBottom: dividerBorder,
              paddingBottom: "0.2rem",
            }}
          >
            {t("profile")}
          </p>
          <p style={{ fontSize: "0.7rem", color: "#4b5563", lineHeight: 1.5 }}>
            {data.summary.slice(0, 120)}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div style={{ marginBottom: "0.75rem" }}>
          <p
            style={{
              fontSize: "0.6rem",
              color: hexWithAlpha(accentColor, 0.4),
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "0.35rem",
              borderBottom: dividerBorder,
              paddingBottom: "0.2rem",
            }}
          >
            {t("professionalExperience")}
          </p>
          {data.experience.slice(0, 3).map((exp) => (
            <div key={exp.id} style={{ marginBottom: "0.5rem" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
              >
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: accentColor,
                  }}
                >
                  {exp.company}
                </p>
                <p style={{ fontSize: "0.45rem", color: "#9ca3af", whiteSpace: "nowrap" }}>
                  {exp.startDate} — {exp.current ? t("present") : exp.endDate}
                </p>
              </div>
              <p style={{ fontSize: "0.6rem", color: "#6b7280" }}>{exp.title}</p>
              {exp.description && (
                <p
                  style={{
                    fontSize: "0.5rem",
                    color: "#9ca3af",
                    lineHeight: 1.4,
                    marginTop: "0.15rem",
                  }}
                >
                  {exp.description.split("\n")[0]?.slice(0, 80)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div style={{ marginBottom: "0.75rem" }}>
          <p
            style={{
              fontSize: "0.6rem",
              color: hexWithAlpha(accentColor, 0.4),
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "0.35rem",
              borderBottom: dividerBorder,
              paddingBottom: "0.2rem",
            }}
          >
            {t("education")}
          </p>
          {data.education.slice(0, 2).map((edu) => (
            <div key={edu.id} style={{ marginBottom: "0.35rem" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
              >
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: accentColor }}>
                  {edu.school}
                </p>
                <p style={{ fontSize: "0.45rem", color: "#9ca3af", whiteSpace: "nowrap" }}>
                  {edu.startDate} — {edu.endDate}
                </p>
              </div>
              <p style={{ fontSize: "0.6rem", color: "#6b7280" }}>
                {[edu.degree, edu.field].filter(Boolean).join(" · ")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div style={{ marginBottom: "0.75rem" }}>
          <p
            style={{
              fontSize: "0.6rem",
              color: hexWithAlpha(accentColor, 0.4),
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "0.35rem",
              borderBottom: dividerBorder,
              paddingBottom: "0.2rem",
            }}
          >
            {t("projects")}
          </p>
          {data.projects.slice(0, 1).map((proj) => (
            <div key={proj.id}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, color: accentColor }}>{proj.name}</p>
              {proj.description && (
                <p
                  style={{
                    fontSize: "0.5rem",
                    color: "#9ca3af",
                    lineHeight: 1.4,
                    marginTop: "0.1rem",
                  }}
                >
                  {proj.description.slice(0, 80)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );

  // Sidebar layout
  if (sidebarColor) {
    return (
      <div className="pointer-events-none relative aspect-[3/4] w-full overflow-hidden rounded bg-white select-none">
        <div
          className="absolute flex origin-top-left"
          style={{
            width: "400%",
            height: "400%",
            transform: "scale(0.25)",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: "30%",
              backgroundColor: sidebarColor,
              padding: "2rem 1.4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.8rem",
              flexShrink: 0,
            }}
          >
            {data.photo && (
              <div
                style={{
                  width: "4.8rem",
                  height: "4.8rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{ fontSize: "1.4rem", fontWeight: 700, color: "rgba(255,255,255,0.8)" }}
                >
                  {(data.fullName || "?")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
            )}
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                textAlign: "center",
                letterSpacing: "0.03em",
                lineHeight: 1.2,
              }}
            >
              {data.fullName || "Name"}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {data.headline}
            </p>
          </div>
          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: "2rem",
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
            }}
          >
            {contentBlock}
          </div>
        </div>
      </div>
    );
  }

  // Standard layout
  return (
    <div className="pointer-events-none relative aspect-[3/4] w-full overflow-hidden rounded bg-white select-none">
      <div
        className="absolute origin-top-left"
        style={{
          width: "400%",
          height: "400%",
          transform: "scale(0.25)",
          padding: "2rem",
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#1a1a1a",
        }}
      >
        {contentBlock}

        {/* Skills — only in standard layout */}
        {data.skillGroups.length > 0 && (
          <div>
            <p
              style={{
                fontSize: "0.6rem",
                color: hexWithAlpha(accentColor, 0.4),
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "0.35rem",
                borderBottom: dividerBorder,
                paddingBottom: "0.2rem",
              }}
            >
              {t("skills")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
              {data.skillGroups
                .flatMap((g) => g.skills)
                .slice(0, 8)
                .map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.5rem",
                      padding: "0.1rem 0.4rem",
                      border: `1px solid ${hexWithAlpha(accentColor, 0.2)}`,
                      color: "#6b7280",
                      borderRadius: "2px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
