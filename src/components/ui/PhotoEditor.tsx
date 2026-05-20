"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

interface PhotoEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onSave: (croppedDataUrl: string) => void;
}

const OUTPUT_SIZE = 256; // px — exported image resolution
const PREVIEW_SIZE = 200; // px — visible circle size

export default function PhotoEditor({ open, onOpenChange, imageSrc, onSave }: PhotoEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImg, setLoadedImg] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  // Load image when src changes
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      setLoadedImg(img);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    const img = loadedImg;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = PREVIEW_SIZE;
    canvas.height = PREVIEW_SIZE;

    ctx.clearRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);

    // Draw circle clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(PREVIEW_SIZE / 2, PREVIEW_SIZE / 2, PREVIEW_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    // Scale image to cover the preview area
    const scale = Math.max(PREVIEW_SIZE / img.width, PREVIEW_SIZE / img.height) * zoom;
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (PREVIEW_SIZE - w) / 2 + offset.x;
    const y = (PREVIEW_SIZE - h) / 2 + offset.y;

    ctx.drawImage(img, x, y, w, h);
    ctx.restore();

    // Draw circle border
    ctx.beginPath();
    ctx.arc(PREVIEW_SIZE / 2, PREVIEW_SIZE / 2, PREVIEW_SIZE / 2 - 1, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [zoom, offset, loadedImg]);

  useEffect(() => {
    drawPreview();
  }, [drawPreview]);

  function handleMouseDown(e: React.MouseEvent) {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging) return;
    setOffset({
      x: offsetStart.current.x + (e.clientX - dragStart.current.x),
      y: offsetStart.current.y + (e.clientY - dragStart.current.y),
    });
  }

  function handleMouseUp() {
    setDragging(false);
  }

  function handleSave() {
    const img = loadedImg;
    if (!img) return;

    // Render at higher resolution for export
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = OUTPUT_SIZE;
    exportCanvas.height = OUTPUT_SIZE;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, OUTPUT_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    const ratio = OUTPUT_SIZE / PREVIEW_SIZE;
    const scale = Math.max(PREVIEW_SIZE / img.width, PREVIEW_SIZE / img.height) * zoom;
    const w = img.width * scale * ratio;
    const h = img.height * scale * ratio;
    const x = (OUTPUT_SIZE - w) / 2 + offset.x * ratio;
    const y = (OUTPUT_SIZE - h) / 2 + offset.y * ratio;

    ctx.drawImage(img, x, y, w, h);

    onSave(exportCanvas.toDataURL("image/jpeg", 0.85));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle>Edit Photo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          {/* Preview canvas */}
          <div
            className="cursor-grab overflow-hidden rounded-full active:cursor-grabbing"
            style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas
              ref={canvasRef}
              width={PREVIEW_SIZE}
              height={PREVIEW_SIZE}
              style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
            />
          </div>

          <p className="text-muted-foreground font-sans text-[10px]">Drag to reposition</p>

          {/* Zoom controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
              className="border-border hover:bg-surface-soft rounded-md border p-1.5 transition-colors"
            >
              <ZoomOut className="text-muted-foreground h-4 w-4" />
            </button>
            <span className="text-muted-foreground w-10 text-center font-sans text-xs">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              className="border-border hover:bg-surface-soft rounded-md border p-1.5 transition-colors"
            >
              <ZoomIn className="text-muted-foreground h-4 w-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              className="flex-1 font-sans text-xs tracking-widest uppercase"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-foreground text-background hover:bg-foreground/90 flex-1 font-sans text-xs tracking-widest uppercase"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
