"use client";

import { useState, useEffect, useCallback } from "react";
import { useMyPortfolio, useUpdatePortfolio } from "@/hooks/usePortfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";

const SOCIAL_OPTIONS = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "tiktok", label: "TikTok" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
  { key: "twitter", label: "Twitter / X" },
  { key: "behance", label: "Behance" },
  { key: "dribbble", label: "Dribbble" },
];

export default function AboutPage() {
  const { data: portfolio, isLoading } = useMyPortfolio();
  const updatePortfolio = useUpdatePortfolio();
  const { toast } = useToast();

  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutBody, setAboutBody] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactWebsite, setContactWebsite] = useState("");
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (portfolio) {
      setAboutTitle(portfolio.aboutTitle);
      setAboutBody(portfolio.aboutBody);
      setContactEmail(portfolio.contactEmail);
      setContactPhone(portfolio.contactPhone);
      setContactWebsite(portfolio.contactWebsite ?? "");
      setSocialLinks(portfolio.socialLinks ?? {});
      setDirty(false);
    }
  }, [portfolio]);

  const markDirty = useCallback(() => setDirty(true), []);

  const handleSave = async () => {
    if (!portfolio) return;
    try {
      await updatePortfolio.mutateAsync({
        id: portfolio.id,
        about_title: aboutTitle,
        about_body: aboutBody,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        contact_website: contactWebsite || null,
        social_links: socialLinks,
      });
      setDirty(false);
      toast({ title: "נשמר", description: "הפרטים עודכנו בהצלחה" });
    } catch {
      toast({ title: "שגיאה", description: "השמירה נכשלה", variant: "destructive" });
    }
  };

  const handleSocialChange = (key: string, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const handleRemoveSocial = (key: string) => {
    setSocialLinks((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    markDirty();
  };

  const unusedSocials = SOCIAL_OPTIONS.filter((s) => !(s.key in socialLinks));

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!portfolio) {
    return <p className="text-muted-foreground">לא נמצא פורטפוליו</p>;
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik">אודות</h1>
        <Button onClick={handleSave} disabled={!dirty || updatePortfolio.isPending}>
          <Save className="h-4 w-4 ml-2" />
          {updatePortfolio.isPending ? "שומר..." : "שמור"}
        </Button>
      </div>

      {/* About section */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="aboutTitle">כותרת</Label>
          <Input
            id="aboutTitle"
            value={aboutTitle}
            onChange={(e) => { setAboutTitle(e.target.value); markDirty(); }}
            placeholder="למשל: קצת עליי"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="aboutBody">תיאור</Label>
          <Textarea
            id="aboutBody"
            value={aboutBody}
            onChange={(e) => { setAboutBody(e.target.value); markDirty(); }}
            placeholder="ספר על עצמך, על הרקע שלך ומה אתה עושה..."
            rows={6}
          />
        </div>
      </section>

      {/* Contact info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">פרטי קשר</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactEmail">אימייל</Label>
            <Input
              id="contactEmail"
              type="email"
              dir="ltr"
              value={contactEmail}
              onChange={(e) => { setContactEmail(e.target.value); markDirty(); }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">טלפון</Label>
            <Input
              id="contactPhone"
              type="tel"
              dir="ltr"
              value={contactPhone}
              onChange={(e) => { setContactPhone(e.target.value); markDirty(); }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactWebsite">אתר אישי</Label>
          <Input
            id="contactWebsite"
            type="url"
            dir="ltr"
            value={contactWebsite}
            onChange={(e) => { setContactWebsite(e.target.value); markDirty(); }}
            placeholder="https://"
          />
        </div>
      </section>

      {/* Social links */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">רשתות חברתיות</h2>
        {Object.entries(socialLinks).map(([key, value]) => {
          const option = SOCIAL_OPTIONS.find((s) => s.key === key);
          return (
            <div key={key} className="flex items-center gap-2">
              <Label className="w-24 text-sm shrink-0">{option?.label ?? key}</Label>
              <Input
                dir="ltr"
                value={value}
                onChange={(e) => handleSocialChange(key, e.target.value)}
                placeholder={`קישור ל-${option?.label ?? key}`}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSocial(key)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
        {unusedSocials.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {unusedSocials.map((s) => (
              <Button
                key={s.key}
                variant="outline"
                size="sm"
                onClick={() => {
                  handleSocialChange(s.key, "");
                }}
              >
                <Plus className="h-3 w-3 ml-1" />
                {s.label}
              </Button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
