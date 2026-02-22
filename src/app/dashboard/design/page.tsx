"use client";

import { useMyPortfolio, useUpdatePortfolio } from "@/hooks/usePortfolio";
import { useTemplates } from "@/hooks/useTemplates";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_COLORS = [
  "#D946EF", "#F97316", "#06B6D4", "#10B981",
  "#8B5CF6", "#EF4444", "#3B82F6", "#F59E0B",
];

export default function DesignPage() {
  const { data, isLoading: loadingPortfolio } = useMyPortfolio();
  const portfolio = data?.portfolio;
  const { data: templates, isLoading: loadingTemplates } = useTemplates();
  const updatePortfolio = useUpdatePortfolio();
  const { toast } = useToast();

  const handleSelect = async (templateId: string) => {
    if (!portfolio) return;
    try {
      await updatePortfolio.mutateAsync({
        id: portfolio.id,
        template_id: templateId,
      });
      toast({ title: "עודכן", description: "התבנית נבחרה בהצלחה" });
    } catch {
      toast({ title: "שגיאה", description: "הבחירה נכשלה", variant: "destructive" });
    }
  };

  if (loadingPortfolio || loadingTemplates) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <Skeleton key={i} className="h-20 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-rubik">בחר תבנית עיצוב</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {(templates ?? []).map((template, idx) => {
          const isSelected = portfolio?.templateId === template.id;
          return (
            <button
              key={template.id}
              onClick={() => handleSelect(template.id)}
              className={cn(
                "relative border rounded-lg overflow-hidden text-right transition-all hover:shadow-md",
                isSelected ? "border-primary ring-2 ring-primary/20" : "border-muted hover:border-muted-foreground/30"
              )}
            >
              <div
                className="h-1.5"
                style={{ backgroundColor: CARD_COLORS[idx % CARD_COLORS.length] }}
              />
              <div className="p-2.5">
                <h3 className="font-medium text-sm">{template.label}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{template.description}</p>
              </div>
              {isSelected && (
                <div className="absolute top-3 left-1.5 bg-primary text-primary-foreground rounded-full p-0.5">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
