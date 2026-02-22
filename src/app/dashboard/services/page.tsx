"use client";

import { useState, useEffect, useMemo } from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useServices, useStudentServices, useUpdateStudentServices } from "@/hooks/useServices";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";

export default function ServicesPage() {
  const { data: profile, isLoading: loadingProfile } = useStudentProfile();
  const { data: allServices = [], isLoading: loadingServices } = useServices();
  const { data: linkedServices = [], isLoading: loadingLinked } = useStudentServices(profile?.id);
  const updateStudentServices = useUpdateStudentServices();
  const { toast } = useToast();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Sync from server once loaded
  useEffect(() => {
    if (!loadingLinked && linkedServices.length >= 0 && !initialized) {
      setSelectedIds(linkedServices.map(s => s.id));
      setInitialized(true);
    }
  }, [loadingLinked, linkedServices, initialized]);

  const serverIds = useMemo(() => linkedServices.map(s => s.id).sort().join(","), [linkedServices]);
  const localIds = useMemo(() => [...selectedIds].sort().join(","), [selectedIds]);
  const isDirty = initialized && serverIds !== localIds;

  const categories = useMemo(() => {
    const cats = new Set(allServices.map(s => s.category).filter(Boolean));
    return Array.from(cats);
  }, [allServices]);

  const toggleService = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!profile) return;
    try {
      await updateStudentServices.mutateAsync({
        studentId: profile.id,
        serviceIds: selectedIds,
      });
      toast({ title: "נשמר", description: "השירותים עודכנו בהצלחה" });
    } catch {
      toast({ title: "שגיאה", description: "השמירה נכשלה", variant: "destructive" });
    }
  };

  if (loadingProfile || loadingServices || loadingLinked) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-10 rounded-lg" />)}
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik">שירותים</h1>
        {isDirty && (
          <Button onClick={handleSave} disabled={updateStudentServices.isPending} size="sm">
            {updateStudentServices.isPending ? (
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 ml-2" />
            )}
            שמור
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        סמן את השירותים שאתה מציע. השינויים יופיעו בפורטפוליו שלך.
      </p>

      {categories.map(category => {
        const items = allServices.filter(s => s.category === category);
        if (items.length === 0) return null;
        return (
          <div key={category} className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground">{category}</h2>
            <div className="space-y-1">
              {items.map(service => (
                <label
                  key={service.id}
                  className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={selectedIds.includes(service.id)}
                    onCheckedChange={() => toggleService(service.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{service.title}</p>
                    {service.shortDescription && (
                      <p className="text-xs text-muted-foreground truncate">{service.shortDescription}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      {/* Services without category */}
      {allServices.filter(s => !s.category).length > 0 && (
        <div className="space-y-1">
          {allServices.filter(s => !s.category).map(service => (
            <label
              key={service.id}
              className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={selectedIds.includes(service.id)}
                onCheckedChange={() => toggleService(service.id)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{service.title}</p>
                {service.shortDescription && (
                  <p className="text-xs text-muted-foreground truncate">{service.shortDescription}</p>
                )}
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
