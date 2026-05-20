"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { CoverLetterData } from "@/types/coverLetter";
import { getCoverLetterStyle, toLocaleTag } from "@mypdfcv/pdf-core";

const PAPER_WIDTH_PX = 793.7;

interface Props {
  data: CoverLetterData;
  templateId?: string;
}

export default function CoverLetterPreview({ data, templateId }: Props) {
  const locale = useLocale();
  const style = getCoverLetterStyle(templateId);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(PAPER_WIDTH_PX);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function updateScale() {
      const padding = 32;
      const w = el!.clientWidth;
      const available = w - padding;
      setContainerWidth(w);
      setScale(Math.min(1, available / PAPER_WIDTH_PX));
    }

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const contactParts = [
    data.senderContact.email,
    data.senderContact.phone,
    data.senderContact.location,
    data.senderContact.linkedin,
    data.senderContact.website,
  ].filter(Boolean);

  const formattedDate = data.date
    ? new Date(data.date + "T00:00:00").toLocaleDateString(toLocaleTag(locale), {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const isCentered = style.headerLayout === "centered";

  return (
    <div
      ref={containerRef}
      className="scrollbar-none h-full w-full overflow-auto bg-zinc-100"
      style={{ padding: "16px" }}
    >
      <div
        className="bg-white shadow-lg"
        style={{
          width: `${PAPER_WIDTH_PX}px`,
          minHeight: "1122.5px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: "10pt",
          color: "#1a1a1a",
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          marginLeft:
            scale < 1 ? `${containerWidth / 2 - (PAPER_WIDTH_PX * scale) / 2 - 16}px` : "auto",
          marginRight: scale < 1 ? "0" : "auto",
          paddingLeft: "60pt",
          paddingRight: "60pt",
          paddingTop: "50pt",
          paddingBottom: "50pt",
        }}
      >
        {/* Sender header */}
        <div
          style={{
            marginBottom: "20pt",
            textAlign: isCentered ? "center" : "left",
          }}
        >
          <p
            style={{
              fontSize: "14pt",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.5pt",
              color: style.accentColor,
              marginBottom: "4pt",
            }}
          >
            {data.senderName || "Your Name"}
          </p>
          {contactParts.length > 0 && (
            <p style={{ fontSize: "8pt", color: "#6b7280", lineHeight: 1.6 }}>
              {contactParts.join("  ·  ")}
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            borderBottom: `0.5pt solid ${style.accentColor}`,
            opacity: 0.3,
            marginTop: "14pt",
            marginBottom: "14pt",
          }}
        />

        {/* Date */}
        {formattedDate && (
          <p style={{ fontSize: "9pt", color: "#6b7280", marginBottom: "16pt" }}>{formattedDate}</p>
        )}

        {/* Recipient */}
        {(data.recipient.name || data.recipient.company) && (
          <div style={{ marginBottom: "16pt" }}>
            {data.recipient.name && (
              <p style={{ fontSize: "9pt", color: "#374151", lineHeight: 1.6 }}>
                {data.recipient.name}
              </p>
            )}
            {data.recipient.title && (
              <p style={{ fontSize: "9pt", color: "#374151", lineHeight: 1.6 }}>
                {data.recipient.title}
              </p>
            )}
            {data.recipient.company && (
              <p style={{ fontSize: "9pt", color: "#374151", lineHeight: 1.6 }}>
                {data.recipient.company}
              </p>
            )}
          </div>
        )}

        {/* Salutation */}
        {data.salutation && (
          <p
            style={{
              fontSize: "10pt",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "12pt",
            }}
          >
            {data.salutation}
          </p>
        )}

        {/* Body paragraphs */}
        {data.bodyParagraphs
          .filter((p) => p.trim())
          .map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontSize: "10pt",
                color: "#374151",
                lineHeight: 1.6,
                marginBottom: "10pt",
              }}
            >
              {paragraph}
            </p>
          ))}

        {/* Closing */}
        {data.closing && (
          <p
            style={{
              fontSize: "10pt",
              color: "#1a1a1a",
              marginTop: "8pt",
              marginBottom: "24pt",
            }}
          >
            {data.closing}
          </p>
        )}

        {/* Signature */}
        {data.senderName && (
          <p
            style={{
              fontSize: "10pt",
              fontWeight: 700,
              color: style.accentColor,
            }}
          >
            {data.senderName}
          </p>
        )}
      </div>
    </div>
  );
}
