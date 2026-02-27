"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useMyPortfolio } from "@/hooks/usePortfolio";
import { useCvSections, useCreateCvSection, useUpdateCvSection, useDeleteCvSection, useReorderCvSections } from "@/hooks/useCvSections";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical, Download, ChevronDown, ChevronUp, Save, ArrowUp, ArrowDown } from "lucide-react";
import type { CvSection, CvEntry } from "@/types/portfolio";

const SECTION_TYPES = [
  { value: "education", label: "השכלה" },
  { value: "experience", label: "ניסיון" },
  { value: "skills", label: "כישורים" },
  { value: "awards", label: "פרסים והישגים" },
  { value: "custom", label: "מותאם אישית" },
];

function EntryEditor({
  entry,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  entry: CvEntry;
  index: number;
  total: number;
  onChange: (updated: CvEntry) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="border rounded p-3 space-y-2 bg-muted/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" onClick={onMoveUp} disabled={index === 0} className="h-7 w-7">
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onMoveDown} disabled={index === total - 1} className="h-7 w-7">
            <ArrowDown className="h-3 w-3" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={onRemove} className="h-7 w-7">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      {/* Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Input
          placeholder="כותרת"
          value={entry.title}
          onChange={(e) => onChange({ ...entry, title: e.target.value })}
        />
        <Input
          dir="ltr"
          placeholder="Title"
          value={entry.titleEn ?? ""}
          onChange={(e) => onChange({ ...entry, titleEn: e.target.value })}
        />
      </div>
      {/* Subtitle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Input
          placeholder="תת-כותרת (מקום עבודה, מוסד לימודים...)"
          value={entry.subtitle ?? ""}
          onChange={(e) => onChange({ ...entry, subtitle: e.target.value })}
        />
        <Input
          dir="ltr"
          placeholder="Subtitle (workplace, institution...)"
          value={entry.subtitleEn ?? ""}
          onChange={(e) => onChange({ ...entry, subtitleEn: e.target.value })}
        />
      </div>
      {/* Date range - same for both languages */}
      <Input
        placeholder="תקופה (למשל: 2020-2023)"
        value={entry.dateRange ?? ""}
        onChange={(e) => onChange({ ...entry, dateRange: e.target.value })}
      />
      {/* Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Textarea
          placeholder="תיאור"
          value={entry.description ?? ""}
          onChange={(e) => onChange({ ...entry, description: e.target.value })}
          rows={2}
        />
        <Textarea
          dir="ltr"
          placeholder="Description"
          value={entry.descriptionEn ?? ""}
          onChange={(e) => onChange({ ...entry, descriptionEn: e.target.value })}
          rows={2}
        />
      </div>
    </div>
  );
}

function SectionEditor({
  section,
  onSave,
  onDelete,
  isSaving,
}: {
  section: CvSection;
  onSave: (updates: Partial<{ title: string; title_en: string; entries: CvEntry[]; entries_en: CvEntry[] }>) => void;
  onDelete: () => void;
  isSaving: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [localTitle, setLocalTitle] = useState(section.title);
  const [localTitleEn, setLocalTitleEn] = useState(section.titleEn ?? "");
  // Merge Hebrew entries with English overlays for unified editing
  const mergeEntries = useCallback((he: CvEntry[], en: CvEntry[]): CvEntry[] =>
    he.map((h, i) => ({
      ...h,
      titleEn: en[i]?.title ?? "",
      subtitleEn: en[i]?.subtitle ?? "",
      descriptionEn: en[i]?.description ?? "",
    })), []);
  const [localEntries, setLocalEntries] = useState<CvEntry[]>(
    mergeEntries(section.entries, section.entriesEn ?? [])
  );
  const [dirty, setDirty] = useState(false);

  // Sync from server when section data changes (e.g., after save)
  const lastSectionRef = useRef(section);
  useEffect(() => {
    if (lastSectionRef.current.id !== section.id || (!dirty && lastSectionRef.current !== section)) {
      setLocalTitle(section.title);
      setLocalTitleEn(section.titleEn ?? "");
      setLocalEntries(mergeEntries(section.entries, section.entriesEn ?? []));
      setDirty(false);
    }
    lastSectionRef.current = section;
  }, [section, dirty, mergeEntries]);

  const updateTitle = (val: string) => {
    setLocalTitle(val);
    setDirty(true);
  };

  const updateEntry = (idx: number, updated: CvEntry) => {
    const entries = [...localEntries];
    entries[idx] = updated;
    setLocalEntries(entries);
    setDirty(true);
  };

  const removeEntry = (idx: number) => {
    setLocalEntries(localEntries.filter((_, i) => i !== idx));
    setDirty(true);
  };

  const addEntry = () => {
    setLocalEntries([...localEntries, { title: "", subtitle: "", dateRange: "", description: "", titleEn: "", subtitleEn: "", descriptionEn: "" }]);
    setDirty(true);
  };

  const moveEntry = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= localEntries.length) return;
    const items = [...localEntries];
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    setLocalEntries(items);
    setDirty(true);
  };

  const handleSave = () => {
    // Split merged entries into Hebrew and English arrays for DB
    const heEntries: CvEntry[] = localEntries.map(({ title, subtitle, dateRange, description }) => ({
      title, subtitle, dateRange, description,
    }));
    const enEntries: CvEntry[] = localEntries.map((e) => ({
      title: e.titleEn ?? "",
      subtitle: e.subtitleEn ?? "",
      dateRange: e.dateRange,
      description: e.descriptionEn ?? "",
    }));
    onSave({ title: localTitle, title_en: localTitleEn, entries: heEntries, entries_en: enEntries });
    setDirty(false);
  };

  const typeLabel = SECTION_TYPES.find((t) => t.value === section.sectionType)?.label ?? section.sectionType;

  return (
    <div className={`border rounded-lg bg-background overflow-hidden ${dirty ? "border-primary/50" : ""}`}>
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
          <span className="text-xs bg-muted px-2 py-0.5 rounded">{typeLabel}</span>
          <h3 className="font-medium">{localTitle || "ללא שם"}</h3>
          <span className="text-xs text-muted-foreground">({localEntries.length} רשומות)</span>
          {dirty && <span className="text-xs text-primary">● שינויים שלא נשמרו</span>}
        </div>
        <div className="flex items-center gap-1">
          {dirty && (
            <Button
              variant="default"
              size="sm"
              onClick={(e) => { e.stopPropagation(); handleSave(); }}
              disabled={isSaving}
              className="h-8 gap-1"
            >
              <Save className="h-3 w-3" />
              שמור
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(); }} className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
          </Button>
          {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </div>
      </div>

      {!collapsed && (
        <div className="px-4 pb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>כותרת המחלקה</Label>
              <Input
                value={localTitle}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="למשל: השכלה אקדמית"
              />
            </div>
            <div className="space-y-2" dir="ltr">
              <Label>Section Title</Label>
              <Input
                value={localTitleEn}
                onChange={(e) => { setLocalTitleEn(e.target.value); setDirty(true); }}
                placeholder="e.g. Academic Education"
              />
            </div>
          </div>

          <div className="space-y-2">
            {localEntries.map((entry, idx) => (
              <EntryEditor
                key={idx}
                entry={entry}
                index={idx}
                total={localEntries.length}
                onChange={(updated) => updateEntry(idx, updated)}
                onRemove={() => removeEntry(idx)}
                onMoveUp={() => moveEntry(idx, idx - 1)}
                onMoveDown={() => moveEntry(idx, idx + 1)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={addEntry}>
              <Plus className="h-3 w-3 ml-1" />
              הוסף רשומה
            </Button>
            {dirty && (
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="h-3 w-3 ml-1" />
                שמור שינויים
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CvPage() {
  const { data: portfolioData, isLoading: loadingPortfolio } = useMyPortfolio();
  const portfolio = portfolioData?.portfolio;
  const { data: cvSections, isLoading: loadingSections } = useCvSections(portfolio?.id);
  const createSection = useCreateCvSection();
  const updateSection = useUpdateCvSection();
  const deleteSection = useDeleteCvSection();
  const reorderSections = useReorderCvSections();
  const { toast } = useToast();

  const [newSectionType, setNewSectionType] = useState("experience");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleAddSection = async () => {
    if (!portfolio) return;
    const label = SECTION_TYPES.find((t) => t.value === newSectionType)?.label ?? "";
    try {
      await createSection.mutateAsync({
        portfolio_id: portfolio.id,
        section_type: newSectionType,
        title: label,
        sort_order: cvSections?.length ?? 0,
      });
      toast({ title: "נוסף", description: "המחלקה נוספה" });
    } catch {
      toast({ title: "שגיאה", description: "ההוספה נכשלה", variant: "destructive" });
    }
  };

  const handleSave = async (section: CvSection, updates: Partial<{ title: string; title_en: string; entries: CvEntry[]; entries_en: CvEntry[] }>) => {
    try {
      await updateSection.mutateAsync({
        id: section.id,
        portfolio_id: section.portfolioId,
        ...updates,
      });
      toast({ title: "נשמר", description: "השינויים נשמרו" });
    } catch {
      toast({ title: "שגיאה", description: "השמירה נכשלה", variant: "destructive" });
    }
  };

  const handleDelete = async (section: CvSection) => {
    try {
      await deleteSection.mutateAsync({ id: section.id, portfolioId: section.portfolioId });
      toast({ title: "נמחק", description: "המחלקה נמחקה" });
    } catch {
      toast({ title: "שגיאה", description: "המחיקה נכשלה", variant: "destructive" });
    }
  };

  if (loadingPortfolio || loadingSections) {
    return (
      <div className="space-y-4 max-w-5xl">
        <Skeleton className="h-8 w-48" />
        {[1, 2].map((i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik">קורות חיים</h1>
        {portfolio && (
          <Button variant="outline" asChild>
            <a href={`/api/cv/pdf?portfolioId=${portfolio.id}`} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 ml-2" />
              הורד PDF
            </a>
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {(cvSections ?? []).map((section, idx) => (
          <div
            key={section.id}
            draggable
            onDragStart={(e) => {
              setDragIndex(idx);
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              setDragOverIndex(idx);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIndex === null || dragIndex === idx) { setDragIndex(null); setDragOverIndex(null); return; }
              const items = [...(cvSections ?? [])];
              const [moved] = items.splice(dragIndex, 1);
              items.splice(idx, 0, moved);
              const updates = items.map((s, i) => ({ id: s.id, sort_order: i }));
              reorderSections.mutate({ portfolioId: portfolio!.id, updates });
              setDragIndex(null);
              setDragOverIndex(null);
            }}
            onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
            className={cn(
              "transition-opacity",
              dragIndex === idx && "opacity-40",
              dragOverIndex === idx && dragIndex !== idx && "border-t-2 border-primary"
            )}
          >
            <SectionEditor
              key={section.id}
              section={section}
              onSave={(updates) => handleSave(section, updates)}
              onDelete={() => handleDelete(section)}
              isSaving={updateSection.isPending}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border rounded-lg p-4 bg-background">
        <Select value={newSectionType} onValueChange={setNewSectionType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SECTION_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAddSection} disabled={createSection.isPending}>
          <Plus className="h-4 w-4 ml-2" />
          הוסף מחלקה
        </Button>
      </div>
    </div>
  );
}
