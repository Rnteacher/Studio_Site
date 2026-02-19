"use client";

import { useState } from "react";
import { useMyPortfolio } from "@/hooks/usePortfolio";
import { useCvSections, useCreateCvSection, useUpdateCvSection, useDeleteCvSection } from "@/hooks/useCvSections";
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
import { Plus, Trash2, GripVertical, Download, ChevronDown, ChevronUp } from "lucide-react";
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
  onChange,
  onRemove,
}: {
  entry: CvEntry;
  onChange: (updated: CvEntry) => void;
  onRemove: () => void;
}) {
  return (
    <div className="border rounded p-3 space-y-2 bg-muted/30">
      <div className="flex items-center justify-between">
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
        <Button variant="ghost" size="icon" onClick={onRemove} className="h-7 w-7">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
      <Input
        placeholder="כותרת"
        value={entry.title}
        onChange={(e) => onChange({ ...entry, title: e.target.value })}
      />
      <Input
        placeholder="תת-כותרת (מקום עבודה, מוסד לימודים...)"
        value={entry.subtitle ?? ""}
        onChange={(e) => onChange({ ...entry, subtitle: e.target.value })}
      />
      <Input
        placeholder="תקופה (למשל: 2020-2023)"
        value={entry.dateRange ?? ""}
        onChange={(e) => onChange({ ...entry, dateRange: e.target.value })}
      />
      <Textarea
        placeholder="תיאור"
        value={entry.description ?? ""}
        onChange={(e) => onChange({ ...entry, description: e.target.value })}
        rows={2}
      />
    </div>
  );
}

function SectionEditor({
  section,
  onUpdate,
  onDelete,
}: {
  section: CvSection;
  onUpdate: (updates: Partial<{ title: string; entries: CvEntry[] }>) => void;
  onDelete: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const addEntry = () => {
    onUpdate({
      entries: [...section.entries, { title: "", subtitle: "", dateRange: "", description: "" }],
    });
  };

  const updateEntry = (idx: number, updated: CvEntry) => {
    const entries = [...section.entries];
    entries[idx] = updated;
    onUpdate({ entries });
  };

  const removeEntry = (idx: number) => {
    onUpdate({ entries: section.entries.filter((_, i) => i !== idx) });
  };

  const typeLabel = SECTION_TYPES.find((t) => t.value === section.sectionType)?.label ?? section.sectionType;

  return (
    <div className="border rounded-lg bg-background overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
          <span className="text-xs bg-muted px-2 py-0.5 rounded">{typeLabel}</span>
          <h3 className="font-medium">{section.title || "ללא שם"}</h3>
          <span className="text-xs text-muted-foreground">({section.entries.length} רשומות)</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(); }} className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
          </Button>
          {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </div>
      </div>

      {!collapsed && (
        <div className="px-4 pb-4 space-y-3">
          <div className="space-y-2">
            <Label>כותרת הסקציה</Label>
            <Input
              value={section.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="למשל: השכלה אקדמית"
            />
          </div>

          <div className="space-y-2">
            {section.entries.map((entry, idx) => (
              <EntryEditor
                key={idx}
                entry={entry}
                onChange={(updated) => updateEntry(idx, updated)}
                onRemove={() => removeEntry(idx)}
              />
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addEntry}>
            <Plus className="h-3 w-3 ml-1" />
            הוסף רשומה
          </Button>
        </div>
      )}
    </div>
  );
}

export default function CvPage() {
  const { data: portfolio, isLoading: loadingPortfolio } = useMyPortfolio();
  const { data: cvSections, isLoading: loadingSections } = useCvSections(portfolio?.id);
  const createSection = useCreateCvSection();
  const updateSection = useUpdateCvSection();
  const deleteSection = useDeleteCvSection();
  const { toast } = useToast();

  const [newSectionType, setNewSectionType] = useState("experience");

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
      toast({ title: "נוסף", description: "הסקציה נוספה" });
    } catch {
      toast({ title: "שגיאה", description: "ההוספה נכשלה", variant: "destructive" });
    }
  };

  const handleUpdate = async (section: CvSection, updates: Partial<{ title: string; entries: CvEntry[] }>) => {
    try {
      await updateSection.mutateAsync({
        id: section.id,
        portfolio_id: section.portfolioId,
        ...updates,
      });
    } catch {
      toast({ title: "שגיאה", description: "העדכון נכשל", variant: "destructive" });
    }
  };

  const handleDelete = async (section: CvSection) => {
    try {
      await deleteSection.mutateAsync({ id: section.id, portfolioId: section.portfolioId });
      toast({ title: "נמחק", description: "הסקציה נמחקה" });
    } catch {
      toast({ title: "שגיאה", description: "המחיקה נכשלה", variant: "destructive" });
    }
  };

  if (loadingPortfolio || loadingSections) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-8 w-48" />
        {[1, 2].map((i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
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
        {(cvSections ?? []).map((section) => (
          <SectionEditor
            key={section.id}
            section={section}
            onUpdate={(updates) => handleUpdate(section, updates)}
            onDelete={() => handleDelete(section)}
          />
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
          הוסף סקציה
        </Button>
      </div>
    </div>
  );
}
