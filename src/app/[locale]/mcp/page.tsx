"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check } from "lucide-react";
import Footer from "@/components/Footer";
import SiteNav from "@/components/SiteNav";

const CONFIG_JSON = `{
  "mcpServers": {
    "mypdfcv": {
      "command": "npx",
      "args": ["-y", "@mypdfcv/mcp-server"]
    }
  }
}`;

const CLAUDE_CODE_CMD = "claude mcp add mypdfcv -- npx -y @mypdfcv/mcp-server";

export default function McpPage() {
  const t = useTranslations("mcp");

  return (
    <div className="bg-background flex min-h-screen flex-col overflow-x-hidden">
      <SiteNav />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-24 pb-12 sm:px-6">
        <h1 className="text-foreground mb-2 font-sans text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mb-8 text-sm">{t("subtitle")}</p>

        <div className="prose prose-sm text-muted-foreground max-w-none min-w-0 space-y-6">
          <Section heading={t("s1h")} content={t("s1")} />

          <section>
            <h2 className="text-foreground text-lg font-semibold">{t("s2h")}</h2>
            <p>{t("s2intro")}</p>

            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-foreground text-sm font-semibold">{t("s2claudeDesktop")}</h3>
                <p className="text-muted-foreground mb-1 text-xs">{t("s2claudeDesktopDesc")}</p>
                <CodeBlock code={CONFIG_JSON} />
              </div>

              <div>
                <h3 className="text-foreground text-sm font-semibold">{t("s2cursor")}</h3>
                <p className="text-muted-foreground mb-1 text-xs">{t("s2cursorDesc")}</p>
                <CodeBlock code={CONFIG_JSON} />
              </div>

              <div>
                <h3 className="text-foreground text-sm font-semibold">{t("s2claudeCode")}</h3>
                <p className="text-muted-foreground mb-1 text-xs">{t("s2claudeCodeDesc")}</p>
                <CodeBlock code={CLAUDE_CODE_CMD} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-foreground text-lg font-semibold">{t("s3h")}</h2>
            <p>{t("s3intro")}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {(t.raw("s3items") as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <Section heading={t("s4h")} content={t("s4")} />
          <Section heading={t("s5h")} content={t("s5")} />

          <section>
            <h2 className="text-foreground text-lg font-semibold">{t("s6h")}</h2>
            <p>{t("s6intro")}</p>
            <blockquote className="border-foreground/20 mt-2 border-l-2 pl-4 italic">
              &ldquo;{t("s6example")}&rdquo;
            </blockquote>
            <blockquote className="border-foreground/20 mt-2 border-l-2 pl-4 italic">
              &ldquo;{t("s6example2")}&rdquo;
            </blockquote>
          </section>

          <section>
            <h2 className="text-foreground text-lg font-semibold">{t("s7h")}</h2>
            <p>{t("s7")}</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <a
                  href="https://www.npmjs.com/package/@mypdfcv/mcp-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2"
                >
                  @mypdfcv/mcp-server
                </a>
                {" — MCP server"}
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@mypdfcv/pdf-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2"
                >
                  @mypdfcv/pdf-core
                </a>
                {" — PDF generation"}
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@mypdfcv/i18n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2"
                >
                  @mypdfcv/i18n
                </a>
                {" — Translations"}
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ heading, content }: { heading: string; content: string }) {
  return (
    <section>
      <h2 className="text-foreground text-lg font-semibold">{heading}</h2>
      <p>{content}</p>
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative mt-1">
      <button
        onClick={handleCopy}
        className="bg-foreground/10 hover:bg-foreground/20 text-muted-foreground hover:text-foreground absolute top-2 right-2 cursor-pointer rounded-md p-1.5 transition-colors"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre className="bg-foreground/5 text-foreground overflow-x-auto rounded-md p-3 pr-10 text-xs">
        <code>{code}</code>
      </pre>
    </div>
  );
}
