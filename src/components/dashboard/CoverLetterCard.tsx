"use client";

import { useState } from "react";
import { Pencil, Copy, Trash2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import MoreMenuTrigger from "@/components/ui/MoreMenuTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CoverLetter } from "@/types/coverLetter";
import { useCoverLetterStore } from "@/store/useCoverLetterStore";
import { formatDate } from "@/lib/utils";
import CoverLetterThumbnail from "./CoverLetterThumbnail";

interface Props {
  coverLetter: CoverLetter;
}

export default function CoverLetterCard({ coverLetter }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("coverLetter");
  const tc = useTranslations("common");
  const [showDelete, setShowDelete] = useState(false);
  const deleteCoverLetter = useCoverLetterStore((s) => s.deleteCoverLetter);
  const duplicateCoverLetter = useCoverLetterStore((s) => s.duplicateCoverLetter);

  function handleEdit() {
    router.push(`/cover-letter/${coverLetter.id}`);
  }

  function handleDuplicate() {
    duplicateCoverLetter(coverLetter.id);
  }

  function handleDelete() {
    deleteCoverLetter(coverLetter.id);
    setShowDelete(false);
  }

  return (
    <>
      <div className="group bg-card border-border hover:border-brand-secondary/50 overflow-hidden rounded-lg border shadow-sm transition-colors">
        <div className="bg-surface-soft/70 relative cursor-pointer p-3" onClick={handleEdit}>
          <CoverLetterThumbnail data={coverLetter.data} templateId={coverLetter.templateId} />
          {coverLetter.status === "draft" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/90 border-border flex items-center gap-1.5 rounded-full border px-3 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                <span className="font-sans text-[10px] tracking-widest text-amber-400 uppercase">
                  {t("drafting")}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3
              className="text-foreground hover:text-foreground/80 cursor-pointer truncate font-sans text-sm font-semibold transition-colors"
              onClick={handleEdit}
            >
              {coverLetter.name}
            </h3>
            <Badge
              variant={coverLetter.status === "complete" ? "default" : "secondary"}
              className={`flex-shrink-0 font-sans text-[10px] tracking-widest uppercase ${
                coverLetter.status === "complete"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300"
              }`}
            >
              {coverLetter.data.recipient.company ||
                (coverLetter.status === "draft" ? t("drafting") : t("lastEdited"))}
            </Badge>
          </div>
          <p className="text-muted-foreground mb-3 font-sans text-[11px]">
            {coverLetter.status === "draft" ? t("created") : t("lastEdited")}{" "}
            {formatDate(coverLetter.updatedAt, locale)}
          </p>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleEdit}
              className="h-8 flex-1 font-sans text-xs tracking-widest uppercase"
            >
              {coverLetter.status === "draft" ? t("continueDrafting") : tc("edit")}
            </Button>

            <DropdownMenu>
              <MoreMenuTrigger className="h-9 w-9 sm:h-8 sm:w-8" />
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem onClick={handleEdit} className="gap-2">
                  <Pencil className="h-4 w-4" />
                  {tc("edit")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate} className="gap-2">
                  <Copy className="h-4 w-4" />
                  {t("duplicate")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDelete(true)}
                  className="text-destructive focus:text-destructive gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {tc("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>{t("deleteCoverLetter")}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t("deleteConfirmation", { name: coverLetter.name })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDelete(false)}>
              {tc("cancel")}
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              {tc("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
