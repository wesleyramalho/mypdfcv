"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  User,
  Briefcase,
  GraduationCap,
  Zap,
  Code,
  FileText,
  Award,
  GripVertical,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useResumeStore } from "@/store/useResumeStore";

const SECTION_ICONS: Record<string, React.ElementType> = {
  personal: User,
  experience: Briefcase,
  education: GraduationCap,
  certifications: Award,
  skills: Zap,
  projects: Code,
  summary: FileText,
};

const SECTION_KEYS: Record<string, string> = {
  personal: "personalInfo",
  experience: "experience",
  education: "education",
  certifications: "certifications",
  skills: "skills",
  projects: "projects",
  summary: "summary",
};

const DEFAULT_ORDER = [
  "summary",
  "experience",
  "education",
  "certifications",
  "skills",
  "projects",
];

interface SortableItemProps {
  id: string;
  activeSection: string;
  onSelect: (id: string) => void;
}

function SortableItem({ id, activeSection, onSelect }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const t = useTranslations("editor");
  const tc = useTranslations("common");

  const Icon = SECTION_ICONS[id];
  const labelKey = SECTION_KEYS[id];
  if (!Icon || !labelKey) return null;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-1 rounded-md transition-colors",
        isDragging && "bg-surface-strong opacity-50",
      )}
    >
      {/* Drag handle */}
      <button
        {...listeners}
        {...attributes}
        tabIndex={-1}
        aria-label={tc("dragToReorder")}
        className="text-muted-foreground/40 hover:text-muted-foreground shrink-0 cursor-grab p-1 active:cursor-grabbing"
      >
        <GripVertical className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>

      {/* Section button */}
      <button
        onClick={() => onSelect(id)}
        className={cn(
          "flex flex-1 items-center gap-2.5 rounded-md px-2 py-2.5 text-left font-sans text-xs tracking-widest uppercase transition-colors",
          activeSection === id
            ? "bg-surface-strong text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-surface-soft",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        {t(labelKey)}
      </button>
    </div>
  );
}

interface Props {
  resumeId: string;
  sectionOrder: string[];
  activeSection: string;
  onSelect: (id: string) => void;
}

export default function EditorNav({ resumeId, sectionOrder, activeSection, onSelect }: Props) {
  const reorderSections = useResumeStore((s) => s.reorderSections);
  const t = useTranslations("editor");
  const order = sectionOrder.length > 0 ? sectionOrder : DEFAULT_ORDER;

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(String(active.id));
    const newIndex = order.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    reorderSections(resumeId, arrayMove(order, oldIndex, newIndex));
  }

  return (
    <nav className="flex flex-col gap-0.5 py-4">
      {/* Personal Info is always pinned at top, non-draggable */}
      <button
        onClick={() => onSelect("personal")}
        className={cn(
          "ml-5 flex items-center gap-2.5 rounded-md px-3 py-2.5 text-left font-sans text-xs tracking-widest uppercase transition-colors",
          activeSection === "personal"
            ? "bg-surface-strong text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-surface-soft",
        )}
      >
        <User className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        {t("personalInfo")}
      </button>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {order.map((id) => (
            <SortableItem key={id} id={id} activeSection={activeSection} onSelect={onSelect} />
          ))}
        </SortableContext>
      </DndContext>
    </nav>
  );
}
