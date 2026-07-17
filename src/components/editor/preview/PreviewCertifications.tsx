import { CertificationEntry } from "@/types/resume";
import { useTranslations } from "next-intl";
import { hexWithAlpha, type ResumeStyle } from "@/lib/resumeTemplates";

interface Props {
  certifications: CertificationEntry[];
  style: ResumeStyle;
}

export default function PreviewCertifications({ certifications, style: tmpl }: Props) {
  const t = useTranslations("resume");

  if (certifications.length === 0) return null;

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
        {t("certifications")}
      </h2>
      {certifications.map((cert) => {
        const issuerLine = [cert.issuer, cert.credentialId ? `ID: ${cert.credentialId}` : ""]
          .filter(Boolean)
          .join(" · ");
        return (
          <div key={cert.id} style={{ marginBottom: "6pt" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "8pt" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "9pt", fontWeight: 700, color: tmpl.accentColor }}>
                  {cert.name}
                </p>
                {issuerLine && (
                  <p style={{ fontSize: "8pt", color: "#6b7280", marginTop: "1pt" }}>
                    {issuerLine}
                  </p>
                )}
              </div>
              {cert.year && (
                <span
                  style={{
                    fontSize: "7.5pt",
                    color: "#9ca3af",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cert.year}
                </span>
              )}
            </div>
            {cert.credentialUrl && (
              <p style={{ fontSize: "7.5pt", color: "#9ca3af", marginTop: "2pt" }}>
                {cert.credentialUrl}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
