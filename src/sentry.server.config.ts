import * as Sentry from "@sentry/nextjs";
import { SERVER_DSN, getCommonSentryOptions } from "@/lib/sentry/config";

if (SERVER_DSN) {
  Sentry.init({
    ...getCommonSentryOptions(),
    dsn: SERVER_DSN,
  });
}
