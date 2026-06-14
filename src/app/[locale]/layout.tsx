import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { headers } from "next/headers";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import ConsentBanner from "@/components/ConsentBanner";
import SubscribePromptModal from "@/components/SubscribePromptModal";
import RatingPromptModal from "@/components/RatingPromptModal";
import { locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const h = await headers();
  const country = h.get("x-vercel-ip-country") ?? process.env.DEV_COUNTRY ?? null;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ConsentProvider country={country}>
        <ThemeProvider>
          <SessionProvider>
            <TooltipProvider>
              {children}
              <ConsentBanner />
              <SubscribePromptModal />
              <RatingPromptModal />
              <Toaster richColors position="bottom-right" />
            </TooltipProvider>
          </SessionProvider>
        </ThemeProvider>
      </ConsentProvider>
    </NextIntlClientProvider>
  );
}
