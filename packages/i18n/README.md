# @mypdfcv/i18n

Internationalization package for [MyPDFCV](https://mypdfcv.com) — 7 bundled locales with server and client entry points.

## Supported Locales

| Code    | Language            |
| ------- | ------------------- |
| `en`    | English             |
| `pt-BR` | Portuguese (Brazil) |
| `es`    | Spanish             |
| `it`    | Italian             |
| `zh`    | Chinese             |
| `ja`    | Japanese            |
| `de`    | German              |

## Installation

```bash
npm install @mypdfcv/i18n
```

## Usage

### Client (browser-safe)

```typescript
import { locales, defaultLocale, type Locale } from "@mypdfcv/i18n";

console.log(locales); // ["en", "pt-BR", "es", "it", "zh", "ja", "de"]
console.log(defaultLocale); // "en"
```

### Server

```typescript
import { getMessages, getNamespace } from "@mypdfcv/i18n/server";

// Get all messages for a locale
const messages = getMessages("ja");

// Get a specific namespace
const resume = getNamespace("ja", "resume");
console.log(resume.profile); // "プロフィール"
```

## Message Namespaces

Messages are organized by namespace: `common`, `landing`, `dashboard`, `editor`, `resume`, `ai`, `templates`, `footer`, `privacy`, `terms`, `cookies`, `contactPage`, `validation`, `mcp`.

## Related

- [@mypdfcv/pdf-core](https://www.npmjs.com/package/@mypdfcv/pdf-core) — Resume types, templates, and PDF generation
- [@mypdfcv/mcp-server](https://www.npmjs.com/package/@mypdfcv/mcp-server) — MCP server for AI-powered resume generation
- [MyPDFCV](https://mypdfcv.com) — The full resume builder app

## License

MIT
