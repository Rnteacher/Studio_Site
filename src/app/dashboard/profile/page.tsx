"use client";

import { useState, useEffect, useCallback } from "react";
import { useStudentProfile, useUpdateStudentProfile } from "@/hooks/useStudentProfile";
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
  { key: "website", label: "אתר אישי" },
];

export default function ProfilePage() {
  const { data: profile, isLoading } = useStudentProfile();
  const updateProfile = useUpdateStudentProfile();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (profile) {
      setEmail(profile.email);
      setPhone(profile.phone);
      setImage(profile.image);
      setShortDescription(profile.shortDescription);
      setLongDescription(profile.longDescription);
      setSocialLinks(profile.socialLinks ?? {});
      setDirty(false);
    }
  }, [profile]);

  const markDirty = useCallback(() => setDirty(true), []);

  const handleSave = async () => {
    if (!profile) return;
    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        email,
        phone,
        image,
        short_description: shortDescription,
        long_description: longDescription,
        social_links: socialLinks,
      });
      setDirty(false);
      toast({ title: "נשמר", description: "הפרופיל עודכן בהצלחה" });
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
        <Skeleton className="h-32 w-32 rounded-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!profile) {
    return <p className="text-muted-foreground">לא נמצא פרופיל. פנה למנהל המערכת.</p>;
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik">פרופיל</h1>
        <Button onClick={handleSave} disabled={!dirty || updateProfile.isPending}>
          <Save className="h-4 w-4 ml-2" />
          {updateProfile.isPending ? "שומר..." : "שמור"}
        </Button>
      </div>

      {/* Name (read-only) */}
      <section className="space-y-2">
        <Label>שם</Label>
        <p className="text-lg font-semibold text-heading">{profile.name}</p>
        <p className="text-xs text-muted-foreground">השם נקבע על ידי מנהל המערכת</p>
      </section>

      {/* Image */}
      <section className="space-y-2">
        <Label htmlFor="image">תמונת פרופיל (URL)</Label>
        <div className="flex items-center gap-4">
          {image && (
            <img
              src={image}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover border"
            />
          )}
          <Input
            id="image"
            dir="ltr"
            value={image}
            onChange={(e) => { setImage(e.target.value); markDirty(); }}
            placeholder="https://..."
            className="flex-1"
          />
        </div>
      </section>

      {/* Descriptions */}
      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shortDesc">תיאור קצר</Label>
          <Input
            id="shortDesc"
            value={shortDescription}
            onChange={(e) => { setShortDescription(e.target.value); markDirty(); }}
            placeholder="למשל: מעצב גרפי ואנימטור"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longDesc">תיאור מפורט</Label>
          <Textarea
            id="longDesc"
            value={longDescription}
            onChange={(e) => { setLongDescription(e.target.value); markDirty(); }}
            placeholder="ספר על עצמך בהרחבה..."
            rows={5}
          />
        </div>
      </section>

      {/* Contact info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">פרטי קשר</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">אימייל</Label>
            <Input
              id="email"
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => { setEmail(e.target.value); markDirty(); }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">טלפון</Label>
            <Input
              id="phone"
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); markDirty(); }}
            />
          </div>
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
                onClick={() => handleSocialChange(s.key, "")}
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
