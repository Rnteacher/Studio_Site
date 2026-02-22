"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useStudents } from "@/hooks/useStudents";
import { useServices } from "@/hooks/useServices";
import { useAllPortfolios, useUpdatePortfolio } from "@/hooks/usePortfolio";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/uploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Plus, LogOut, Upload, Loader2, Globe, GlobeLock, ExternalLink, Settings, Save } from "lucide-react";
import Link from "next/link";
import { useSiteContentWithTypes, useUpdateSiteContent, type SiteContentRow } from "@/hooks/useSiteContent";

// ─── Student Form ───
interface StudentForm {
  id: string;
  name: string;
  short_description: string;
  long_description: string;
  image: string;
  email: string;
  phone: string;
  social_links: Record<string, string>;
  linkedServiceIds: string[];
}

const emptyStudentForm: StudentForm = {
  id: "", name: "", short_description: "", long_description: "",
  image: "/placeholder.svg",
  email: "", phone: "", social_links: {}, linkedServiceIds: [],
};

// ─── Service Form ───
interface ServiceForm {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  image: string;
  category: string;
  linkedStudentIds: string[];
}

const emptyServiceForm: ServiceForm = {
  id: "", slug: "", title: "", short_description: "", long_description: "",
  image: "/placeholder.svg", category: "", linkedStudentIds: [],
};

// ─── Site Content Editor ───
const SECTION_LABELS: Record<string, string> = {
  hero: "עמוד הבית (Hero)",
  footer: "פוטר",
  navbar: "ניווט",
  services_section: "סקציית שירותים",
  about: "עמוד אודות",
  meta: "מטא נתונים (SEO)",
  palette: "צבעי האתר",
};

const KEY_LABELS: Record<string, string> = {
  title: "כותרת", subtitle: "תת-כותרת", description: "תיאור", mission: "משימה",
  badge1: "תג 1", badge2: "תג 2", badge3: "תג 3",
  email: "אימייל", copyright: "זכויות יוצרים", logo: "לוגו",
  value1_title: "ערך 1 - כותרת", value1_desc: "ערך 1 - תיאור",
  value2_title: "ערך 2 - כותרת", value2_desc: "ערך 2 - תיאור",
  value3_title: "ערך 3 - כותרת", value3_desc: "ערך 3 - תיאור",
  value4_title: "ערך 4 - כותרת", value4_desc: "ערך 4 - תיאור",
  image1: "תמונה 1", image2: "תמונה 2", image3: "תמונה 3",
  cta_services: "כפתור שירותים", cta_students: "כפתור חניכים",
  tagline: "שורת סיסמה", mission_line2: "משימה - שורה 2",
  mission_sub: "תיאור משימה", badge1_text: "תג באנר 1", badge2_text: "תג באנר 2",
  background_image: "תמונת רקע",
  value1_icon: "ערך 1 - אייקון", value2_icon: "ערך 2 - אייקון",
  value3_icon: "ערך 3 - אייקון", value4_icon: "ערך 4 - אייקון",
  primary: "ראשי (Primary)", secondary: "משני (Secondary)",
  accent: "הדגשה (Accent)", heading: "כותרות (Heading)",
  background: "רקע (Background)",
};

const ICON_OPTIONS = [
  "Heart", "Shield", "Star", "Rocket", "Zap", "Award", "Target", "Lightbulb",
  "Users", "Handshake", "Sparkles", "Crown", "Trophy", "Flame", "Eye", "Compass",
  "Leaf", "Sun", "Music", "Camera", "Palette", "Brain", "BookOpen", "GraduationCap",
];

function SiteContentEditor({ rows, onSave }: {
  rows: SiteContentRow[];
  onSave: (section: string, key: string, value: string) => Promise<void>;
}) {
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const { toast } = useToast();

  const getKey = (section: string, key: string) => `${section}::${key}`;

  const getValue = (section: string, key: string, serverValue: string) => {
    const k = getKey(section, key);
    return k in editValues ? editValues[k] : serverValue;
  };

  const handleChange = (section: string, key: string, value: string) => {
    setEditValues(prev => ({ ...prev, [getKey(section, key)]: value }));
  };

  const handleSave = async (section: string, key: string, serverValue: string) => {
    const k = getKey(section, key);
    const value = getValue(section, key, serverValue);
    setSaving(k);
    await onSave(section, key, value);
    setSaving(null);
    // Delay clearing editValues to prevent flash during query invalidation
    setTimeout(() => {
      setEditValues(prev => { const n = { ...prev }; delete n[k]; return n; });
    }, 500);
  };

  const handleImageUpload = async (section: string, key: string, file: File) => {
    const k = getKey(section, key);
    setUploading(k);
    const url = await uploadImage(file, "site-content");
    setUploading(null);
    if (url) {
      handleChange(section, key, url);
      toast({ title: "התמונה הועלתה!" });
    } else {
      toast({ title: "שגיאה בהעלאת תמונה", variant: "destructive" });
    }
  };

  // Group rows by section
  const grouped = new Map<string, SiteContentRow[]>();
  for (const row of rows) {
    if (!grouped.has(row.section)) grouped.set(row.section, []);
    grouped.get(row.section)!.push(row);
  }
  const sectionOrder = Object.keys(SECTION_LABELS);
  const sortedSections = [...grouped.keys()].sort((a, b) => {
    const ai = sectionOrder.indexOf(a);
    const bi = sectionOrder.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-6">
      {sortedSections.map(section => {
        const sectionRows = grouped.get(section)!;
        return (
          <div key={section} className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3">
              <h3 className="font-semibold text-heading">{SECTION_LABELS[section] ?? section}</h3>
            </div>
            <div className="p-4 space-y-3">
              {sectionRows.map(row => {
                const k = getKey(row.section, row.key);
                const currentValue = getValue(row.section, row.key, row.value);
                const isDirty = k in editValues && editValues[k] !== row.value;
                return (
                  <div key={row.key} className="flex items-start gap-2">
                    <label className="w-32 text-sm font-medium text-muted-foreground pt-2 shrink-0">
                      {KEY_LABELS[row.key] ?? row.key}
                    </label>
                    <div className="flex-1 space-y-1">
                      {row.type === "image" ? (
                        <>
                          {currentValue && (
                            <img src={currentValue} alt="" className="w-24 h-16 rounded object-cover" />
                          )}
                          <div className="flex gap-2">
                            <Input
                              value={currentValue}
                              onChange={e => handleChange(row.section, row.key, e.target.value)}
                              className="text-sm flex-1"
                              dir="ltr"
                              placeholder="קישור תמונה"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              disabled={uploading === k}
                              onClick={() => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = "image/*";
                                input.onchange = (ev) => {
                                  const file = (ev.target as HTMLInputElement).files?.[0];
                                  if (file) handleImageUpload(row.section, row.key, file);
                                };
                                input.click();
                              }}
                            >
                              {uploading === k ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            </Button>
                          </div>
                        </>
                      ) : row.type === "icon" ? (
                        <select
                          value={currentValue}
                          onChange={e => handleChange(row.section, row.key, e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="">בחר אייקון...</option>
                          {ICON_OPTIONS.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      ) : row.type === "color" ? (
                        <div className="flex gap-2 items-center">
                          <Input
                            value={currentValue}
                            onChange={e => handleChange(row.section, row.key, e.target.value)}
                            className="text-sm flex-1"
                            dir="ltr"
                            placeholder="333 71% 50%"
                          />
                          <div
                            className="w-8 h-8 rounded border shrink-0"
                            style={{ backgroundColor: `hsl(${currentValue})` }}
                            title={`hsl(${currentValue})`}
                          />
                        </div>
                      ) : currentValue.length > 80 ? (
                        <Textarea
                          value={currentValue}
                          onChange={e => handleChange(row.section, row.key, e.target.value)}
                          rows={3}
                          className="text-sm"
                        />
                      ) : (
                        <Input
                          value={currentValue}
                          onChange={e => handleChange(row.section, row.key, e.target.value)}
                          className="text-sm"
                          dir={row.key.includes("image") || row.key === "logo" || row.key === "email" ? "ltr" : undefined}
                        />
                      )}
                    </div>
                    {isDirty && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleSave(row.section, row.key, row.value)}
                        disabled={saving === k}
                        className="shrink-0"
                      >
                        {saving === k ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: portfolios, isLoading: portfoliosLoading } = useAllPortfolios();
  const updatePortfolio = useUpdatePortfolio();
  const { data: siteContentRows, isLoading: contentLoading } = useSiteContentWithTypes();
  const updateContent = useUpdateSiteContent();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  // Student state
  const [studentEditOpen, setStudentEditOpen] = useState(false);
  const [studentForm, setStudentForm] = useState<StudentForm>(emptyStudentForm);
  const [isNewStudent, setIsNewStudent] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [uploadingStudentImage, setUploadingStudentImage] = useState(false);
  const studentImageRef = useRef<HTMLInputElement>(null);

  // Service state
  const [serviceEditOpen, setServiceEditOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState<ServiceForm>(emptyServiceForm);
  const [isNewService, setIsNewService] = useState(false);
  const [uploadingServiceImage, setUploadingServiceImage] = useState(false);
  const serviceImageRef = useRef<HTMLInputElement>(null);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">טוען...</div>;
  if (!user) {
    router.replace("/auth/login");
    return null;
  }
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">אין לך הרשאות מנהל</p>
      </main>
      <Footer />
    </div>
  );

  const handleLogout = async () => { await signOut(); router.push("/"); };

  // ─── Image Upload Handlers ───
  const handleStudentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingStudentImage(true);
    const url = await uploadImage(file, "students");
    setUploadingStudentImage(false);
    if (url) {
      setStudentForm(prev => ({ ...prev, image: url }));
      toast({ title: "התמונה הועלתה בהצלחה!" });
    } else {
      toast({ title: "שגיאה בהעלאת תמונה", variant: "destructive" });
    }
  };

  const handleServiceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingServiceImage(true);
    const url = await uploadImage(file, "services");
    setUploadingServiceImage(false);
    if (url) {
      setServiceForm(prev => ({ ...prev, image: url }));
      toast({ title: "התמונה הועלתה בהצלחה!" });
    } else {
      toast({ title: "שגיאה בהעלאת תמונה", variant: "destructive" });
    }
  };

  // ─── Student CRUD ───
  const existingCategories = [...new Set((services || []).map(s => s.category).filter(Boolean))];

  const openNewStudent = () => { setStudentForm(emptyStudentForm); setIsNewStudent(true); setStudentEditOpen(true); };

  const toggleServiceLink = (serviceId: string) => {
    setStudentForm(prev => ({
      ...prev,
      linkedServiceIds: prev.linkedServiceIds.includes(serviceId)
        ? prev.linkedServiceIds.filter(id => id !== serviceId)
        : [...prev.linkedServiceIds, serviceId],
    }));
  };

  const handleSaveStudent = async () => {
    const supabase = createClient();
    const linkedServices = (services || []).filter(s => studentForm.linkedServiceIds.includes(s.id));
    const cats = [...new Set(linkedServices.map(s => s.category).filter(Boolean))];
    const svcMap: Record<string, string[]> = {};
    linkedServices.forEach(s => {
      if (s.category) {
        if (!svcMap[s.category]) svcMap[s.category] = [];
        svcMap[s.category].push(s.title);
      }
    });
    const payload = {
      id: studentForm.id, name: studentForm.name,
      short_description: studentForm.short_description, long_description: studentForm.long_description,
      image: studentForm.image, categories: cats, services: svcMap,
      email: studentForm.email, phone: studentForm.phone,
      social_links: studentForm.social_links,
    };
    const { error } = await supabase.from("students").insert(payload);
    if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }

    if (studentForm.linkedServiceIds.length > 0) {
      const rows = studentForm.linkedServiceIds.map(sid => ({ service_id: sid, student_id: studentForm.id }));
      await supabase.from("service_students").insert(rows);
    }

    toast({ title: "חניך נוסף!" });
    queryClient.invalidateQueries({ queryKey: ["students"] });
    queryClient.invalidateQueries({ queryKey: ["services"] });
    queryClient.invalidateQueries({ queryKey: ["student-services"] });
    setStudentEditOpen(false);
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("למחוק את החניך?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); }
    else { toast({ title: "נמחק!" }); queryClient.invalidateQueries({ queryKey: ["students"] }); }
  };

  // ─── Service CRUD ───
  const openEditService = async (service: any) => {
    const supabase = createClient();
    const { data: links } = await supabase.from("service_students").select("student_id").eq("service_id", service.id);
    setServiceForm({
      id: service.id, slug: service.slug, title: service.title,
      short_description: service.shortDescription, long_description: service.longDescription,
      image: service.image, category: service.category || "",
      linkedStudentIds: (links || []).map((l: any) => l.student_id),
    });
    setIsNewService(false);
    setServiceEditOpen(true);
  };

  const openNewService = () => { setServiceForm(emptyServiceForm); setIsNewService(true); setIsCreatingNewCategory(false); setServiceEditOpen(true); };

  const toggleStudentLink = (studentId: string) => {
    setServiceForm(prev => ({
      ...prev,
      linkedStudentIds: prev.linkedStudentIds.includes(studentId)
        ? prev.linkedStudentIds.filter(id => id !== studentId)
        : [...prev.linkedStudentIds, studentId],
    }));
  };

  const handleSaveService = async () => {
    const supabase = createClient();
    const payload = {
      slug: serviceForm.slug, title: serviceForm.title,
      short_description: serviceForm.short_description, long_description: serviceForm.long_description,
      image: serviceForm.image, category: serviceForm.category,
    };

    let serviceId = serviceForm.id;

    if (isNewService) {
      const { data, error } = await supabase.from("services").insert(payload).select("id").single();
      if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }
      serviceId = data.id;
    } else {
      const { error } = await supabase.from("services").update(payload).eq("id", serviceForm.id);
      if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }
      await supabase.from("service_students").delete().eq("service_id", serviceForm.id);
    }

    if (serviceForm.linkedStudentIds.length > 0) {
      const rows = serviceForm.linkedStudentIds.map(sid => ({ service_id: serviceId, student_id: sid }));
      await supabase.from("service_students").insert(rows);
    }

    toast({ title: isNewService ? "שירות נוסף!" : "שירות עודכן!" });
    queryClient.invalidateQueries({ queryKey: ["services"] });
    queryClient.invalidateQueries({ queryKey: ["student-services"] });
    setServiceEditOpen(false);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("למחוק את השירות?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); }
    else { toast({ title: "נמחק!" }); queryClient.invalidateQueries({ queryKey: ["services"] }); }
  };

  // ─── Portfolio helpers ───
  const getPortfolioForStudent = (studentId: string) => {
    return portfolios?.find(p => p.portfolio.studentId === studentId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-rubik text-3xl font-bold text-heading">ניהול</h1>
          <Button variant="outline" onClick={handleLogout} className="gap-1"><LogOut className="h-4 w-4" />יציאה</Button>
        </div>

        <Tabs defaultValue="students" dir="rtl">
          <TabsList className="mb-6">
            <TabsTrigger value="students">חניכים</TabsTrigger>
            <TabsTrigger value="services">שירותים</TabsTrigger>
            <TabsTrigger value="content">תוכן האתר</TabsTrigger>
          </TabsList>

          {/* ─── Students Tab (merged with portfolios) ─── */}
          <TabsContent value="students">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-rubik text-xl font-semibold text-heading">חניכים</h2>
              <Button onClick={openNewStudent} className="gap-1"><Plus className="h-4 w-4" />חניך חדש</Button>
            </div>
            {(studentsLoading || portfoliosLoading) ? <p>טוען...</p> : (
              <div className="grid gap-3">
                {students?.map((s) => {
                  const pData = getPortfolioForStudent(s.id);
                  const portfolio = pData?.portfolio;
                  return (
                    <div key={s.id} className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm">
                      <img src={s.image} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-heading">{s.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{s.shortDescription}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        {portfolio ? (
                          <>
                            <Badge
                              variant={portfolio.status === "published" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {portfolio.status === "published" ? "פורסם" : "טיוטה"}
                            </Badge>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={async () => {
                                const newStatus = portfolio.status === "published" ? "draft" : "published";
                                await updatePortfolio.mutateAsync({ id: portfolio.id, status: newStatus });
                                toast({ title: newStatus === "published" ? "פורסם" : "הוסתר" });
                              }}
                              title={portfolio.status === "published" ? "הסתר" : "פרסם"}
                            >
                              {portfolio.status === "published" ? <GlobeLock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                            </Button>
                            {portfolio.slug && (
                              <Link href={`/p/${portfolio.slug}`} target="_blank">
                                <Button size="icon" variant="ghost" title="צפה בפורטפוליו">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </Link>
                            )}
                          </>
                        ) : (
                          <Badge variant="outline" className="text-xs">ללא פורטפוליו</Badge>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Link href={`/admin/student/${s.id}`}>
                          <Button size="icon" variant="ghost" title="נהל"><Settings className="h-4 w-4" /></Button>
                        </Link>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteStudent(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* ─── Services Tab ─── */}
          <TabsContent value="services">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-rubik text-xl font-semibold text-heading">שירותים</h2>
              <Button onClick={openNewService} className="gap-1"><Plus className="h-4 w-4" />שירות חדש</Button>
            </div>
            {servicesLoading ? <p>טוען...</p> : (
              <div className="grid gap-3">
                {services?.map((s) => (
                  <div key={s.id} className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm">
                    <img src={s.image} alt={s.title} className="w-16 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-heading">{s.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{s.shortDescription}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{s.slug}</Badge>
                    <div className="flex gap-1 shrink-0">
                      <Button size="icon" variant="ghost" onClick={() => openEditService(s)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteService(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ─── Site Content Tab ─── */}
          <TabsContent value="content">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-rubik text-xl font-semibold text-heading">תוכן האתר</h2>
            </div>
            {contentLoading ? <p>טוען...</p> : (
              <SiteContentEditor rows={siteContentRows ?? []} onSave={async (section, key, value) => {
                await updateContent.mutateAsync({ section, key, value });
                toast({ title: "נשמר!" });
              }} />
            )}
          </TabsContent>
        </Tabs>

        {/* ─── New Student Dialog ─── */}
        <Dialog open={studentEditOpen} onOpenChange={setStudentEditOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>הוספת חניך</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <Input placeholder="מזהה (אנגלית)" value={studentForm.id} onChange={e => setStudentForm({...studentForm, id: e.target.value})} dir="ltr" />
              <Input placeholder="שם" value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} />
              <Input placeholder="תיאור קצר" value={studentForm.short_description} onChange={e => setStudentForm({...studentForm, short_description: e.target.value})} />
              <Textarea placeholder="ביוגרפיה / תיאור מלא" value={studentForm.long_description} onChange={e => setStudentForm({...studentForm, long_description: e.target.value})} rows={4} />

              {/* Image upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">תמונה</label>
                <div className="flex items-center gap-3">
                  {studentForm.image && studentForm.image !== "/placeholder.svg" && (
                    <img src={studentForm.image} alt="תצוגה מקדימה" className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 flex gap-2">
                    <Input placeholder="קישור תמונה" value={studentForm.image} onChange={e => setStudentForm({...studentForm, image: e.target.value})} dir="ltr" className="flex-1" />
                    <input type="file" accept="image/*" ref={studentImageRef} className="hidden" onChange={handleStudentImageUpload} />
                    <Button type="button" variant="outline" size="icon" onClick={() => studentImageRef.current?.click()} disabled={uploadingStudentImage}>
                      {uploadingStudentImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Service checkboxes grouped by category */}
              <div className="border rounded-lg p-3 space-y-3">
                <p className="text-sm font-semibold text-heading">שירותים מקושרים:</p>
                {existingCategories.map(cat => {
                  const catServices = (services || []).filter(s => s.category === cat);
                  if (catServices.length === 0) return null;
                  return (
                    <div key={cat} className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{cat}</p>
                      {catServices.map(svc => (
                        <label key={svc.id} className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-muted/50">
                          <Checkbox
                            checked={studentForm.linkedServiceIds.includes(svc.id)}
                            onCheckedChange={() => toggleServiceLink(svc.id)}
                          />
                          <span className="text-sm">{svc.title}</span>
                        </label>
                      ))}
                    </div>
                  );
                })}
                {(services || []).filter(s => !s.category).length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">ללא קטגוריה</p>
                    {(services || []).filter(s => !s.category).map(svc => (
                      <label key={svc.id} className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-muted/50">
                        <Checkbox
                          checked={studentForm.linkedServiceIds.includes(svc.id)}
                          onCheckedChange={() => toggleServiceLink(svc.id)}
                        />
                        <span className="text-sm">{svc.title}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <Input placeholder="אימייל" value={studentForm.email} onChange={e => setStudentForm({...studentForm, email: e.target.value})} dir="ltr" />
              <Input placeholder="טלפון" value={studentForm.phone} onChange={e => setStudentForm({...studentForm, phone: e.target.value})} dir="ltr" />

              <div className="border rounded-lg p-3 space-y-3">
                <p className="text-sm font-semibold text-heading">קישורים חברתיים</p>
                <Input placeholder="אינסטגרם (אופציונלי)" value={studentForm.social_links.instagram || ""} onChange={e => setStudentForm({...studentForm, social_links: {...studentForm.social_links, instagram: e.target.value}})} dir="ltr" />
                <Input placeholder="פייסבוק (אופציונלי)" value={studentForm.social_links.facebook || ""} onChange={e => setStudentForm({...studentForm, social_links: {...studentForm.social_links, facebook: e.target.value}})} dir="ltr" />
                <Input placeholder="טיקטוק (אופציונלי)" value={studentForm.social_links.tiktok || ""} onChange={e => setStudentForm({...studentForm, social_links: {...studentForm.social_links, tiktok: e.target.value}})} dir="ltr" />
                <Input placeholder="לינקדאין (אופציונלי)" value={studentForm.social_links.linkedin || ""} onChange={e => setStudentForm({...studentForm, social_links: {...studentForm.social_links, linkedin: e.target.value}})} dir="ltr" />
              </div>
              <Button onClick={handleSaveStudent} className="w-full">הוסף</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ─── Service Edit Dialog ─── */}
        <Dialog open={serviceEditOpen} onOpenChange={setServiceEditOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isNewService ? "הוספת שירות" : "עריכת שירות"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              <Input placeholder="Slug (אנגלית, לדוגמה: video-editing)" value={serviceForm.slug} onChange={e => setServiceForm({...serviceForm, slug: e.target.value})} dir="ltr" />
              <Input placeholder="שם השירות" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} />
              <Input placeholder="תיאור קצר" value={serviceForm.short_description} onChange={e => setServiceForm({...serviceForm, short_description: e.target.value})} />
              <Textarea placeholder="תיאור מלא" value={serviceForm.long_description} onChange={e => setServiceForm({...serviceForm, long_description: e.target.value})} rows={4} />

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">קטגוריה</label>
                <select
                  value={isCreatingNewCategory ? "__new__" : serviceForm.category}
                  onChange={e => {
                    if (e.target.value === "__new__") {
                      setIsCreatingNewCategory(true);
                      setNewCategoryInput("");
                      setServiceForm({...serviceForm, category: ""});
                    } else {
                      setIsCreatingNewCategory(false);
                      setServiceForm({...serviceForm, category: e.target.value});
                    }
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">בחר קטגוריה...</option>
                  {existingCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="__new__">+ קטגוריה חדשה</option>
                </select>
                {isCreatingNewCategory && (
                  <Input
                    placeholder="שם הקטגוריה החדשה"
                    value={newCategoryInput}
                    onChange={e => {
                      setNewCategoryInput(e.target.value);
                      setServiceForm({...serviceForm, category: e.target.value});
                    }}
                    autoFocus
                  />
                )}
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">תמונה</label>
                <div className="flex items-center gap-3">
                  {serviceForm.image && serviceForm.image !== "/placeholder.svg" && (
                    <img src={serviceForm.image} alt="תצוגה מקדימה" className="w-16 h-10 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 flex gap-2">
                    <Input placeholder="קישור תמונה" value={serviceForm.image} onChange={e => setServiceForm({...serviceForm, image: e.target.value})} dir="ltr" className="flex-1" />
                    <input type="file" accept="image/*" ref={serviceImageRef} className="hidden" onChange={handleServiceImageUpload} />
                    <Button type="button" variant="outline" size="icon" onClick={() => serviceImageRef.current?.click()} disabled={uploadingServiceImage}>
                      {uploadingServiceImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Link students */}
              <div className="border rounded-lg p-3 space-y-2">
                <p className="text-sm font-semibold text-heading">חניכים מקושרים:</p>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {students?.map((s) => (
                    <label key={s.id} className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-muted/50">
                      <Checkbox
                        checked={serviceForm.linkedStudentIds.includes(s.id)}
                        onCheckedChange={() => toggleStudentLink(s.id)}
                      />
                      <img src={s.image} alt={s.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-sm">{s.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveService} className="w-full">{isNewService ? "הוסף" : "שמור"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
