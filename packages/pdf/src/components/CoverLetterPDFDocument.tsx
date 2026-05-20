import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CoverLetter } from "../types/coverLetter";
import { getCoverLetterStyle, type CoverLetterStyle } from "../lib/coverLetterTemplates";
import { toLocaleTag } from "../lib/utils";
import { getPdfFont } from "../lib/pdfFonts";

const PDF_FONT = "Helvetica";

function buildStyles(tmpl: CoverLetterStyle, font: string = PDF_FONT) {
  const { accentColor: accent } = tmpl;
  const isCentered = tmpl.headerLayout === "centered";

  return StyleSheet.create({
    page: {
      fontFamily: font,
      fontSize: 10,
      color: "#1a1a1a",
      paddingHorizontal: 60,
      paddingVertical: 50,
      backgroundColor: "#ffffff",
    },
    senderBlock: {
      marginBottom: 20,
      ...(isCentered ? { alignItems: "center" as const } : {}),
    },
    senderName: {
      fontSize: 14,
      fontFamily: font,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: accent,
      marginBottom: 4,
    },
    senderContact: {
      fontSize: 8,
      fontFamily: font,
      color: "#6b7280",
      lineHeight: 1.6,
      ...(isCentered ? { textAlign: "center" as const } : {}),
    },
    divider: {
      borderBottomWidth: 0.5,
      borderBottomColor: accent,
      marginVertical: 14,
      opacity: 0.3,
    },
    date: {
      fontSize: 9,
      fontFamily: font,
      color: "#6b7280",
      marginBottom: 16,
    },
    recipientBlock: {
      marginBottom: 16,
    },
    recipientText: {
      fontSize: 9,
      fontFamily: font,
      color: "#374151",
      lineHeight: 1.6,
    },
    salutation: {
      fontSize: 10,
      fontFamily: font,
      fontWeight: 700,
      color: "#1a1a1a",
      marginBottom: 12,
    },
    bodyParagraph: {
      fontSize: 10,
      fontFamily: font,
      color: "#374151",
      lineHeight: 1.6,
      marginBottom: 10,
    },
    closing: {
      fontSize: 10,
      fontFamily: font,
      color: "#1a1a1a",
      marginTop: 8,
      marginBottom: 24,
    },
    signature: {
      fontSize: 10,
      fontFamily: font,
      fontWeight: 700,
      color: accent,
    },
  });
}

interface Props {
  coverLetter: CoverLetter;
  locale?: string;
}

export default function CoverLetterPDFDocument({ coverLetter, locale = "en" }: Props) {
  const { data } = coverLetter;
  const tmpl = getCoverLetterStyle(coverLetter.templateId);
  const font = getPdfFont(locale);
  const s = buildStyles(tmpl, font);

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

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Sender header */}
        <View style={s.senderBlock}>
          <Text style={s.senderName}>{data.senderName}</Text>
          {contactParts.length > 0 && (
            <Text style={s.senderContact}>{contactParts.join("  ·  ")}</Text>
          )}
        </View>

        <View style={s.divider} />

        {/* Date */}
        {formattedDate && <Text style={s.date}>{formattedDate}</Text>}

        {/* Recipient */}
        {(data.recipient.name || data.recipient.company) && (
          <View style={s.recipientBlock}>
            {data.recipient.name && <Text style={s.recipientText}>{data.recipient.name}</Text>}
            {data.recipient.title && <Text style={s.recipientText}>{data.recipient.title}</Text>}
            {data.recipient.company && (
              <Text style={s.recipientText}>{data.recipient.company}</Text>
            )}
          </View>
        )}

        {/* Salutation */}
        {data.salutation && <Text style={s.salutation}>{data.salutation}</Text>}

        {/* Body paragraphs */}
        {data.bodyParagraphs
          .filter((p) => p.trim())
          .map((paragraph, i) => (
            <Text key={i} style={s.bodyParagraph}>
              {paragraph}
            </Text>
          ))}

        {/* Closing */}
        {data.closing && <Text style={s.closing}>{data.closing}</Text>}

        {/* Signature */}
        {data.senderName && <Text style={s.signature}>{data.senderName}</Text>}
      </Page>
    </Document>
  );
}
