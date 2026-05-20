"use client";

import { CoverLetterData } from "@/types/coverLetter";
import { getCoverLetterStyle } from "@mypdfcv/pdf-core";

interface Props {
  data: CoverLetterData;
  templateId?: string;
}

export default function CoverLetterThumbnail({ data, templateId }: Props) {
  const style = getCoverLetterStyle(templateId);
  const { accentColor } = style;
  const isCentered = style.headerLayout === "centered";

  const contactParts = [
    data.senderContact.email,
    data.senderContact.phone,
    data.senderContact.location,
  ].filter(Boolean);

  return (
    <div className="pointer-events-none relative aspect-[3/4] w-full overflow-hidden rounded bg-white select-none">
      <div
        className="absolute origin-top-left"
        style={{
          width: "400%",
          height: "400%",
          transform: "scale(0.25)",
          padding: "3rem",
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#1a1a1a",
        }}
      >
        {/* Sender header */}
        <div style={{ marginBottom: "1.2rem", textAlign: isCentered ? "center" : "left" }}>
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: accentColor,
              marginBottom: "0.3rem",
            }}
          >
            {data.senderName || "Your Name"}
          </p>
          {contactParts.length > 0 && (
            <p style={{ fontSize: "0.6rem", color: "#6b7280" }}>{contactParts.join("  ·  ")}</p>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            borderBottom: `1px solid ${accentColor}`,
            opacity: 0.3,
            marginBottom: "1rem",
          }}
        />

        {/* Recipient */}
        {(data.recipient.name || data.recipient.company) && (
          <div style={{ marginBottom: "1rem" }}>
            {data.recipient.name && (
              <p style={{ fontSize: "0.7rem", color: "#374151", lineHeight: 1.6 }}>
                {data.recipient.name}
              </p>
            )}
            {data.recipient.title && (
              <p style={{ fontSize: "0.7rem", color: "#374151", lineHeight: 1.6 }}>
                {data.recipient.title}
              </p>
            )}
            {data.recipient.company && (
              <p style={{ fontSize: "0.7rem", color: "#374151", lineHeight: 1.6 }}>
                {data.recipient.company}
              </p>
            )}
          </div>
        )}

        {/* Salutation */}
        {data.salutation && (
          <p style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.8rem" }}>
            {data.salutation}
          </p>
        )}

        {/* Body preview */}
        {data.bodyParagraphs
          .filter((p) => p.trim())
          .slice(0, 2)
          .map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontSize: "0.7rem",
                color: "#374151",
                lineHeight: 1.6,
                marginBottom: "0.6rem",
              }}
            >
              {paragraph.slice(0, 150)}
              {paragraph.length > 150 ? "..." : ""}
            </p>
          ))}

        {/* Closing */}
        {data.closing && (
          <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
            {data.closing}
          </p>
        )}

        {/* Signature */}
        {data.senderName && (
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: accentColor }}>
            {data.senderName}
          </p>
        )}
      </div>
    </div>
  );
}
