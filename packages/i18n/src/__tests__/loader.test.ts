import { describe, expect, it } from "vitest";
import { getMessages, getNamespace } from "../loader";

describe("getMessages", () => {
  it("returns messages for a valid locale", () => {
    const messages = getMessages("en");
    expect(messages).toBeDefined();
    expect(typeof messages).toBe("object");
  });

  it("falls back to default locale for unknown locale", () => {
    const messages = getMessages("xx-YY");
    const defaultMessages = getMessages("en");
    expect(messages).toEqual(defaultMessages);
  });

  it("returns messages for all supported locales", () => {
    const locales = ["en", "pt-BR", "es", "it", "zh", "ja", "de", "hi"];
    for (const locale of locales) {
      const messages = getMessages(locale);
      expect(messages).toBeDefined();
      expect(Object.keys(messages).length).toBeGreaterThan(0);
    }
  });
});

describe("getNamespace", () => {
  it("returns a specific namespace", () => {
    const messages = getMessages("en");
    const firstNs = Object.keys(messages)[0];
    const ns = getNamespace("en", firstNs);
    expect(ns).toBeDefined();
    expect(typeof ns).toBe("object");
  });

  it("returns empty object for unknown namespace", () => {
    const ns = getNamespace("en", "nonexistent-ns");
    expect(ns).toEqual({});
  });
});
