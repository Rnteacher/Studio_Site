"use client";

import { useMyPortfolio, useUpdatePortfolio } from "@/hooks/usePortfolio";
import { useTemplates } from "@/hooks/useTemplates";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  classic: "קלאסי",
  modern: "מודרני",
  experimental: "ניסיוני",
};

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-64 rounded-lg" />)}
        </div>
      </div>
    );
  }

  const grouped = (templates ?? []).reduce(
    (acc, t) => {
      (acc[t.category] ??= []).push(t);
      return acc;
    },
    {} as Record<string, typeof templates extends (infer T)[] | undefined ? T[] : never[]>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold font-rubik">בחר תבנית עיצוב</h1>

      {(["classic", "modern", "experimental"] as const).map((category) => {
        const items = grouped[category];
        if (!items?.length) return null;
        return (
          <div key={category} className="space-y-3">
            <h2 className="text-lg font-semibold">{CATEGORY_LABELS[category]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((template) => {
                const isSelected = portfolio?.templateId === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => handleSelect(template.id)}
                    className={cn(
                      "relative border-2 rounded-lg overflow-hidden text-right transition-all hover:shadow-lg",
                      isSelected ? "border-primary ring-2 ring-primary/20" : "border-muted hover:border-muted-foreground/30"
                    )}
                  >
                    <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                      <span className="text-4xl text-muted-foreground/30">
                        {template.name.includes("clean") && "🎨"}
                        {template.name.includes("elegant") && "✨"}
                        {template.name.includes("bold") && "💪"}
                        {template.name.includes("minimal") && "◻️"}
                        {template.name.includes("creative") && "🎭"}
                        {template.name.includes("avant") && "🔮"}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm">{template.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
