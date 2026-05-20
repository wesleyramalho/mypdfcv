"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useConsentOptional } from "@/components/providers/ConsentProvider";

export default function ManageConsentButton() {
  const consent = useConsentOptional();
  const t = useTranslations("consent");
  const [revoked, setRevoked] = useState(false);

  function handleClick() {
    consent?.revoke();
    setRevoked(true);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="sm"
        variant="outline"
        onClick={handleClick}
        className="font-sans text-xs tracking-widest uppercase"
      >
        {t("managePreferences")}
      </Button>
      {revoked && (
        <span className="text-muted-foreground text-xs" role="status">
          {t("revoked")}
        </span>
      )}
    </div>
  );
}
