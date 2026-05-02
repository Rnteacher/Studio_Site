"use client";

import { useState } from "react";
import { useMyPortfolio } from "@/hooks/usePortfolio";
import { useCvSections, useCreateCvSection, useUpdateCvSection, useDeleteCvSection, useReorderCvSections } from "@/hooks/useCvSections";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionEditor } from "@/components/shared/CvSectionEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Download } from "lucide-react";
import type { CvSection, CvEntry } from "@/types/portfolio";

const SECTION_TYPES = [
  { value: "education", label: "השכלה" },
  { value: "experience", label: "ניסיון" },
  { value: "skills", label: "כישורים" },
  { value: "awards", label: "פרסים והישגים" },
  { value: "custom", label: "מותאם אישית" },
];

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
