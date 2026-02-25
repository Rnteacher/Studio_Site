"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useMyPortfolio, useUpdatePortfolio } from "@/hooks/usePortfolio";
import { useTemplates } from "@/hooks/useTemplates";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, RotateCcw, Palette, Type, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TemplateCustomSettings } from "@/types/portfolio";

const CARD_COLORS = [
  "#D946EF", "#F97316", "#06B6D4", "#10B981",
  "#8B5CF6", "#EF4444", "#3B82F6", "#F59E0B",
];

const AVAILABLE_FONTS = [
  { key: "heebo", label: "Heebo" },
  { key: "rubik", label: "Rubik" },
  { key: "karantina", label: "Karantina" },
  { key: "amatic-sc", label: "Amatic SC" },
  { key: "open-sans", label: "Open Sans" },
  { key: "fredoka", label: "Fredoka" },
  { key: "playpen-sans", label: "Playpen Sans" },
  { key: "rubik-pixels", label: "Rubik Pixels" },
  { key: "rubik-dirt", label: "Rubik Dirt" },
  { key: "rubik-glitch", label: "Rubik Glitch" },
  { key: "rubik-bubbles", label: "Rubik Bubbles" },
  { key: "rubik-doodle", label: "Rubik Doodle" },
];

const COLOR_FIELDS: { key: keyof NonNullable<TemplateCustomSettings["colors"]>; label: string }[] = [
  { key: "primary", label: "צבע ראשי" },
  { key: "accent", label: "צבע הדגשה" },
  { key: "bg", label: "רקע" },
  { key: "text", label: "טקסט" },
];

const LABEL_FIELDS: { key: keyof NonNullable<TemplateCustomSettings["sectionLabels"]>; label: string; placeholder: string }[] = [
  { key: "about", label: "אודות", placeholder: "אודות" },
  { key: "projects", label: "פרויקטים", placeholder: "פרויקטים" },
  { key: "cv", label: "קורות חיים", placeholder: "קורות חיים" },
  { key: "contact", label: "יצירת קשר", placeholder: "צור קשר" },
];

function ColorInput({
  color,
  onChange,
  label,
}: {
  color: string;
  onChange: (val: string) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={color || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border cursor-pointer shrink-0 p-0.5"
      />
      <div className="flex-1 space-y-1">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <Input
          value={color}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          dir="ltr"
          className="h-8 text-xs font-mono"
        />
      </div>
    </div>
  );
}

export default function DesignPage() {
  const { data, isLoading: loadingPortfolio } = useMyPortfolio();
  const portfolio = data?.portfolio;
  const { data: templates, isLoading: loadingTemplates } = useTemplates();
  const updatePortfolio = useUpdatePortfolio();
  const { toast } = useToast();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Local state for customization (to enable optimistic / debounced updates)
  const [settings, setSettings] = useState<TemplateCustomSettings>({});

  // Sync from DB on first load
  useEffect(() => {
    if (portfolio?.customSettings) {
      setSettings(portfolio.customSettings);
    }
  }, [portfolio?.customSettings]);

  // Auto-save with debounce
  const saveSettings = useCallback(
    (newSettings: TemplateCustomSettings) => {
      if (!portfolio) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        try {
          await updatePortfolio.mutateAsync({
            id: portfolio.id,
            custom_settings: newSettings as unknown as Record<string, unknown>,
          });
        } catch {
          toast({ title: "שגיאה", description: "השמירה נכשלה", variant: "destructive" });
        }
      }, 600);
    },
    [portfolio, updatePortfolio, toast],
  );

  const updateSettings = useCallback(
    (updater: (prev: TemplateCustomSettings) => TemplateCustomSettings) => {
      setSettings((prev) => {
        const next = updater(prev);
        saveSettings(next);
        return next;
      });
    },
    [saveSettings],
  );

  const updateColor = useCallback(
    (key: string, value: string) => {
      updateSettings((prev) => ({
        ...prev,
        colors: { ...prev.colors, [key]: value },
      }));
    },
    [updateSettings],
  );

  const updateFont = useCallback(
    (key: "bodyFont" | "headingFont", value: string) => {
      updateSettings((prev) => ({ ...prev, [key]: value }));
    },
    [updateSettings],
  );

  const updateLabel = useCallback(
    (key: string, value: string) => {
      updateSettings((prev) => ({
        ...prev,
        sectionLabels: { ...prev.sectionLabels, [key]: value },
      }));
    },
    [updateSettings],
  );

  const handleReset = async () => {
    if (!portfolio) return;
    setSettings({});
    try {
      await updatePortfolio.mutateAsync({
        id: portfolio.id,
        custom_settings: {} as unknown as Record<string, unknown>,
      });
      toast({ title: "אופס", description: "ההתאמות אופסו לברירת מחדל" });
    } catch {
      toast({ title: "שגיאה", description: "האיפוס נכשל", variant: "destructive" });
    }
  };

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
    <div className="space-y-8">
      {/* ── Template Picker ── */}
      <section>
        <h1 className="text-2xl font-bold font-rubik mb-4">בחר תבנית עיצוב</h1>
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
      </section>

      {/* ── Customization Panel ── */}
      <section className="border rounded-xl p-5 bg-muted/30 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-rubik flex items-center gap-2">
            <Palette className="h-5 w-5" />
            התאמה אישית
          </h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            איפוס לברירת מחדל
          </button>
        </div>

        {/* Colors */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-1.5">
            <Palette className="h-4 w-4 text-muted-foreground" />
            צבעים
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COLOR_FIELDS.map((field) => (
              <ColorInput
                key={field.key}
                label={field.label}
                color={settings.colors?.[field.key] ?? ""}
                onChange={(val) => updateColor(field.key, val)}
              />
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-1.5">
            <Type className="h-4 w-4 text-muted-foreground" />
            פונטים
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">פונט גוף</Label>
              <Select
                value={settings.bodyFont ?? ""}
                onValueChange={(val) => updateFont("bodyFont", val)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="ברירת מחדל של התבנית" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_FONTS.map((f) => (
                    <SelectItem key={f.key} value={f.key}>
                      <span className={`font-${f.key}`}>{f.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">פונט כותרות</Label>
              <Select
                value={settings.headingFont ?? ""}
                onValueChange={(val) => updateFont("headingFont", val)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="ברירת מחדל של התבנית" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_FONTS.map((f) => (
                    <SelectItem key={f.key} value={f.key}>
                      <span className={`font-${f.key}`}>{f.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Section Labels */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-muted-foreground" />
            כותרות סקשנים
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LABEL_FIELDS.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">{field.label}</Label>
                <Input
                  value={settings.sectionLabels?.[field.key] ?? ""}
                  onChange={(e) => updateLabel(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="h-8 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
