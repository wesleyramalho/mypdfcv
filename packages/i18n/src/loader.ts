import { defaultLocale } from "./config";

import en from "./messages/en.json";
import ptBR from "./messages/pt-BR.json";
import es from "./messages/es.json";
import it from "./messages/it.json";
import zh from "./messages/zh.json";
import ja from "./messages/ja.json";
import de from "./messages/de.json";
import hi from "./messages/hi.json";

type Messages = Record<string, Record<string, string>>;

const allMessages: Record<string, Messages> = {
  en: en as unknown as Messages,
  "pt-BR": ptBR as unknown as Messages,
  es: es as unknown as Messages,
  it: it as unknown as Messages,
  zh: zh as unknown as Messages,
  ja: ja as unknown as Messages,
  de: de as unknown as Messages,
  hi: hi as unknown as Messages,
};

/** Synchronously get all messages for a locale. Falls back to defaultLocale. */
export function getMessages(locale: string): Messages {
  return allMessages[locale] ?? allMessages[defaultLocale];
}

/** Get a specific namespace from messages. */
export function getNamespace(locale: string, ns: string): Record<string, string> {
  const msgs = getMessages(locale);
  return msgs[ns] ?? {};
}
