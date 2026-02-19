"use client";

import { useState, useEffect } from "react";
import { useMyPortfolio, useUpdatePortfolio } from "@/hooks/usePortfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Globe, ExternalLink, AlertTriangle } from "lucide-react";

export default function PublishPage() {
  const { data: portfolio, isLoading } = useMyPortfolio();
  const updatePortfolio = useUpdatePortfolio();
  const { toast } = useToast();

  const [slug, setSlug] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (portfolio) {
      setSlug(portfolio.slug ?? "");
      setIsPublished(portfolio.status === "published");
    }
  }, [portfolio]);

  const slugValid = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(slug) && slug.length >= 3;

  const handleSaveSlug = async () => {
    if (!portfolio || !slugValid) return;
    try {
      await updatePortfolio.mutateAsync({ id: portfolio.id, slug });
      toast({ title: "נשמר", description: "הכתובת עודכנה" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "השמירה נכשלה";
      toast({ title: "שגיאה", description: msg.includes("duplicate") ? "הכתובת כבר תפוסה" : msg, variant: "destructive" });
    }
  };

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    const newStatus = isPublished ? "draft" : "published";

    if (newStatus === "published" && !portfolio.slug) {
      toast({ title: "שגיאה", description: "יש להגדיר כתובת לפני הפרסום", variant: "destructive" });
      return;
    }

    try {
      await updatePortfolio.mutateAsync({ id: portfolio.id, status: newStatus });
      setIsPublished(!isPublished);
      toast({
        title: newStatus === "published" ? "פורסם" : "הוסתר",
        description: newStatus === "published"
          ? "הפורטפוליו פורסם בהצלחה"
          : "הפורטפוליו הוחזר לטיוטה",
      });
    } catch {
      toast({ title: "שגיאה", description: "הפעולה נכשלה", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-lg">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
      </div>
    );
  }

  if (!portfolio) {
    return <p className="text-muted-foreground">לא נמצא פורטפוליו</p>;
  }

  const missingFields: string[] = [];
  if (!portfolio.aboutTitle && !portfolio.aboutBody) missingFields.push("אודות");
  if (!portfolio.templateId) missingFields.push("תבנית עיצוב");

  return (
    <div className="max-w-lg space-y-8">
      <h1 className="text-2xl font-bold font-rubik">פרסום</h1>

      {/* Slug editor */}
      <section className="space-y-3 border rounded-lg p-4 bg-background">
        <Label>כתובת הפורטפוליו</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground shrink-0" dir="ltr">/p/</span>
          <Input
            dir="ltr"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            placeholder="my-portfolio"
            className="flex-1"
          />
          <Button onClick={handleSaveSlug} disabled={!slugValid || slug === portfolio.slug}>
            שמור
          </Button>
        </div>
        {slug && !slugValid && (
          <p className="text-xs text-destructive">
            הכתובת חייבת להכיל לפחות 3 תווים, רק אותיות קטנות באנגלית, מספרים ומקפים
          </p>
        )}
        {portfolio.slug && isPublished && (
          <a
            href={`/p/${portfolio.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            /p/{portfolio.slug}
          </a>
        )}
      </section>

      {/* Publish toggle */}
      <section className="space-y-3 border rounded-lg p-4 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <div>
              <p className="font-medium">סטטוס פרסום</p>
              <p className="text-sm text-muted-foreground">
                {isPublished ? "הפורטפוליו גלוי לכולם" : "הפורטפוליו במצב טיוטה"}
              </p>
            </div>
          </div>
          <Switch
            checked={isPublished}
            onCheckedChange={handleTogglePublish}
          />
        </div>
      </section>

      {/* Warnings */}
      {missingFields.length > 0 && (
        <section className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            <p className="font-medium">שדות חסרים</p>
          </div>
          <ul className="text-sm text-yellow-700 list-disc list-inside">
            {missingFields.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="text-xs text-yellow-600">
            מומלץ למלא שדות אלו לפני הפרסום
          </p>
        </section>
      )}
    </div>
  );
}
