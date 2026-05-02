"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudents";
import { useServices, useStudentServices } from "@/hooks/useServices";
import { useAllPortfolios, useUpdatePortfolio } from "@/hooks/usePortfolio";
import { useCvSections, useUpdateCvSection, useCreateCvSection, useDeleteCvSection } from "@/hooks/useCvSections";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/useProjects";
import { createClient } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/uploadImage";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionEditor } from "@/components/shared/CvSectionEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowRight, Save, Upload, Loader2, Trash2, Plus, Globe, GlobeLock, ExternalLink, Pencil, FolderOpen, RefreshCw,
} from "lucide-react";
import Link from "next/link";
import type { CvSection, CvEntry, ProjectWithMedia } from "@/types/portfolio";

const SECTION_TYPES = [
  { value: "education", label: "השכלה" },
  { value: "experience", label: "ניסיון" },
  { value: "skills", label: "כישורים" },
  { value: "awards", label: "פרסים והישגים" },
  { value: "custom", label: "מותאם אישית" },
];

const ADMIN_PROJECT_LABELS = {
  saved: "\u05e0\u05e9\u05de\u05e8",
  error: "\u05e9\u05d2\u05d9\u05d0\u05d4",
  updated: "\u05e2\u05d5\u05d3\u05db\u05df",
  created: "\u05e0\u05d5\u05e6\u05e8",
  deleted: "\u05e0\u05de\u05d7\u05e7",
  synced: "\u05e1\u05d5\u05e0\u05db\u05e8\u05df",
  syncError: "\u05e9\u05d2\u05d9\u05d0\u05ea \u05e1\u05e0\u05db\u05e8\u05d5\u05df",
  projects: "\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd",
  newProject: "\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8 \u05d7\u05d3\u05e9",
  noProjects: "\u05d0\u05d9\u05df \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd \u05e2\u05d3\u05d9\u05d9\u05df",
  untitled: "\u05dc\u05dc\u05d0 \u05e9\u05dd",
  editProject: "\u05e2\u05e8\u05d9\u05db\u05ea \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8",
  projectName: "\u05e9\u05dd \u05d4\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8",
  description: "\u05ea\u05d9\u05d0\u05d5\u05e8",
  tags: "\u05ea\u05d2\u05d9\u05d5\u05ea (\u05de\u05d5\u05e4\u05e8\u05d3\u05d5\u05ea \u05d1\u05e4\u05e1\u05d9\u05e7)",
  tagsPlaceholder: "\u05e2\u05d9\u05e6\u05d5\u05d1, \u05d0\u05e0\u05d9\u05de\u05e6\u05d9\u05d4",
  driveFolder: "\u05e7\u05d9\u05e9\u05d5\u05e8 \u05dc\u05ea\u05d9\u05e7\u05d9\u05d9\u05ea Google Drive",
  cancel: "\u05d1\u05d9\u05d8\u05d5\u05dc",
  save: "\u05e9\u05de\u05d5\u05e8",
  create: "\u05e6\u05d5\u05e8",
} as const;

export default function AdminStudentPage() {
  const params = useParams();
  const studentId = params.id as string;
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { data: student, isLoading: studentLoading } = useStudent(studentId);
  const { data: allServices } = useServices();
  const { data: linkedServices } = useStudentServices(studentId);
  const { data: portfolios } = useAllPortfolios();
  const updatePortfolio = useUpdatePortfolio();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Find portfolio for this student
  const portfolioData = portfolios?.find(p => p.portfolio.studentId === studentId);
  const portfolio = portfolioData?.portfolio;

  const { data: cvSections } = useCvSections(portfolio?.id);
  const createCvSection = useCreateCvSection();
  const updateCvSection = useUpdateCvSection();
  const deleteCvSection = useDeleteCvSection();
  const { data: projects } = useProjects(portfolio?.id);
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  // ─── Profile State ───
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ─── Services State ───
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // ─── Portfolio State ───
  const [slug, setSlug] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutSubtitle, setAboutSubtitle] = useState("");
  const [aboutBody, setAboutBody] = useState("");
  const [aboutTitleEn, setAboutTitleEn] = useState("");
  const [aboutSubtitleEn, setAboutSubtitleEn] = useState("");
  const [aboutBodyEn, setAboutBodyEn] = useState("");

  // ─── CV State ───
  const [newSectionType, setNewSectionType] = useState("experience");

  // Projects State
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithMedia | null>(null);
  const [projTitle, setProjTitle] = useState("");
  const [projTitleEn, setProjTitleEn] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projDescriptionEn, setProjDescriptionEn] = useState("");
  const [projTags, setProjTags] = useState("");
  const [projTagsEn, setProjTagsEn] = useState("");
  const [projDriveFolderUrl, setProjDriveFolderUrl] = useState("");
  const [projSyncing, setProjSyncing] = useState<string | null>(null);

  // Initialize from data
  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.contact.email);
      setPhone(student.contact.phone);
      setImage(student.image);
      setShortDesc(student.shortDescription);
      setLongDesc(student.longDescription);
      setSocialLinks(student.socialLinks || {});
    }
  }, [student]);

  useEffect(() => {
    if (linkedServices) {
      setSelectedServiceIds(linkedServices.map(s => s.id));
    }
  }, [linkedServices]);

  useEffect(() => {
    if (portfolio) {
      setSlug(portfolio.slug ?? "");
      setAboutTitle(portfolio.aboutTitle);
      setAboutSubtitle(portfolio.aboutSubtitle);
      setAboutBody(portfolio.aboutBody);
      setAboutTitleEn(portfolio.aboutTitleEn ?? "");
      setAboutSubtitleEn(portfolio.aboutSubtitleEn ?? "");
      setAboutBodyEn(portfolio.aboutBodyEn ?? "");
    }
  }, [portfolio]);

  // ─── Guards ───
  if (authLoading || studentLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 rounded-lg" />)}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || !isAdmin) {
    router.replace("/auth/login");
    return null;
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <p className="text-xl text-muted-foreground">החניך לא נמצא</p>
          <Link href="/admin"><Button variant="outline" className="mt-4">חזרה לניהול</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Handlers ───
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, "students");
    setUploading(false);
    if (url) { setImage(url); toast({ title: "הועלה!" }); }
    else { toast({ title: "שגיאה", variant: "destructive" }); }
  };

  const handleSaveProfile = async () => {
    const supabase = createClient();
    // Derive categories from selected services
    const linked = (allServices || []).filter(s => selectedServiceIds.includes(s.id));
    const cats = [...new Set(linked.map(s => s.category).filter(Boolean))];
    const svcMap: Record<string, string[]> = {};
    linked.forEach(s => {
      if (s.category) {
        if (!svcMap[s.category]) svcMap[s.category] = [];
        svcMap[s.category].push(s.title);
      }
    });

    const { error } = await supabase.from("students").update({
      name, email, phone, image,
      short_description: shortDesc,
      long_description: longDesc,
      social_links: socialLinks,
      categories: cats,
      services: svcMap,
    }).eq("id", studentId);

    if (error) { toast({ title: "שגיאה", description: error.message, variant: "destructive" }); return; }

    // Update service links
    await supabase.from("service_students").delete().eq("student_id", studentId);
    if (selectedServiceIds.length > 0) {
      await supabase.from("service_students").insert(
        selectedServiceIds.map(sid => ({ service_id: sid, student_id: studentId }))
      );
    }

    toast({ title: "נשמר!" });
    queryClient.invalidateQueries({ queryKey: ["students"] });
    queryClient.invalidateQueries({ queryKey: ["student-services"] });
  };

  const handleSavePortfolio = async () => {
    if (!portfolio) return;
    try {
      await updatePortfolio.mutateAsync({
        id: portfolio.id,
        slug: slug || null,
        about_title: aboutTitle,
        about_subtitle: aboutSubtitle,
        about_body: aboutBody,
        about_title_en: aboutTitleEn,
        about_subtitle_en: aboutSubtitleEn,
        about_body_en: aboutBodyEn,
      });
      toast({ title: "נשמר!" });
    } catch {
      toast({ title: "שגיאה", variant: "destructive" });
    }
  };

  const togglePortfolioStatus = async () => {
    if (!portfolio) return;
    const newStatus = portfolio.status === "published" ? "draft" : "published";
    await updatePortfolio.mutateAsync({ id: portfolio.id, status: newStatus });
    toast({ title: newStatus === "published" ? "פורסם" : "הוסתר" });
  };

  const handleAddCvSection = async () => {
    if (!portfolio) return;
    const label = SECTION_TYPES.find(t => t.value === newSectionType)?.label ?? "";
    await createCvSection.mutateAsync({
      portfolio_id: portfolio.id,
      section_type: newSectionType,
      title: label,
      sort_order: cvSections?.length ?? 0,
    });
    toast({ title: "המחלקה נוספה" });
  };

  const handleSaveCvSection = async (
    section: CvSection,
    updates: Partial<{ title: string; title_en: string; entries: CvEntry[]; entries_en: CvEntry[] }>
  ) => {
    try {
      await updateCvSection.mutateAsync({
        id: section.id,
        portfolio_id: section.portfolioId,
        ...updates,
      });
      toast({ title: ADMIN_PROJECT_LABELS.saved });
    } catch {
      toast({ title: ADMIN_PROJECT_LABELS.error, variant: "destructive" });
    }
  };

  const handleDeleteCvSection = async (section: CvSection) => {
    await deleteCvSection.mutateAsync({ id: section.id, portfolioId: section.portfolioId });
    toast({ title: "המחלקה נמחקה" });
  };

  const openNewProject = () => {
    setEditingProject(null);
    setProjTitle("");
    setProjTitleEn("");
    setProjDescription("");
    setProjDescriptionEn("");
    setProjTags("");
    setProjTagsEn("");
    setProjDriveFolderUrl("");
    setProjectDialogOpen(true);
  };

  const openEditProject = (project: ProjectWithMedia) => {
    setEditingProject(project);
    setProjTitle(project.title);
    setProjTitleEn(project.titleEn ?? "");
    setProjDescription(project.description);
    setProjDescriptionEn(project.descriptionEn ?? "");
    setProjTags(project.tags.join(", "));
    setProjTagsEn((project.tagsEn ?? []).join(", "));
    setProjDriveFolderUrl(project.driveFolderUrl ?? "");
    setProjectDialogOpen(true);
  };

  const handleSaveProject = async () => {
    if (!portfolio) return;
    const tagArr = projTags.split(",").map((tag) => tag.trim()).filter(Boolean);
    const tagEnArr = projTagsEn.split(",").map((tag) => tag.trim()).filter(Boolean);

    try {
      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          portfolio_id: portfolio.id,
          title: projTitle,
          description: projDescription,
          tags: tagArr,
          title_en: projTitleEn,
          description_en: projDescriptionEn,
          tags_en: tagEnArr,
          drive_folder_url: projDriveFolderUrl || null,
        });
        toast({ title: ADMIN_PROJECT_LABELS.updated });
      } else {
        await createProject.mutateAsync({
          portfolio_id: portfolio.id,
          title: projTitle,
          description: projDescription,
          tags: tagArr,
          title_en: projTitleEn,
          description_en: projDescriptionEn,
          tags_en: tagEnArr,
          drive_folder_url: projDriveFolderUrl || undefined,
          sort_order: projects?.length ?? 0,
        });
        toast({ title: ADMIN_PROJECT_LABELS.created });
      }
      setProjectDialogOpen(false);
    } catch {
      toast({ title: ADMIN_PROJECT_LABELS.error, variant: "destructive" });
    }
  };

  const handleDeleteProject = async (project: ProjectWithMedia) => {
    if (!portfolio) return;
    try {
      await deleteProject.mutateAsync({ id: project.id, portfolioId: portfolio.id });
      toast({ title: ADMIN_PROJECT_LABELS.deleted });
    } catch {
      toast({ title: ADMIN_PROJECT_LABELS.error, variant: "destructive" });
    }
  };

  const handleSyncProject = async (project: ProjectWithMedia) => {
    if (!project.driveFolderUrl) return;
    setProjSyncing(project.id);
    try {
      const res = await fetch("/api/drive/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderUrl: project.driveFolderUrl, projectId: project.id }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Sync failed");
      }
      toast({ title: ADMIN_PROJECT_LABELS.synced });
    } catch (err) {
      toast({
        title: ADMIN_PROJECT_LABELS.syncError,
        description: err instanceof Error ? err.message : "",
        variant: "destructive",
      });
    } finally {
      setProjSyncing(null);
    }
  };

  const existingCategories = [...new Set((allServices || []).map(s => s.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="icon"><ArrowRight className="h-5 w-5" /></Button>
          </Link>
          <div className="flex items-center gap-3">
            {image && image !== "/placeholder.svg" && (
              <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
            )}
            <div>
              <h1 className="font-rubik text-2xl font-bold text-heading">{name}</h1>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
        </div>

        {/* ─── Profile Section ─── */}
        <section className="bg-card rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-rubik text-lg font-semibold text-heading">פרופיל</h2>
            <Button onClick={handleSaveProfile} size="sm" className="gap-1">
              <Save className="h-4 w-4" />שמור
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>שם</Label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>אימייל</Label>
              <Input value={email} onChange={e => setEmail(e.target.value)} dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label>טלפון</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} dir="ltr" />
            </div>
            <div className="space-y-2">
              <Label>תיאור קצר</Label>
              <Input value={shortDesc} onChange={e => setShortDesc(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>תיאור מפורט</Label>
            <Textarea value={longDesc} onChange={e => setLongDesc(e.target.value)} rows={4} />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>תמונה</Label>
            <div className="flex items-center gap-3">
              {image && image !== "/placeholder.svg" && (
                <img src={image} alt="תצוגה" className="w-16 h-16 rounded-lg object-cover" />
              )}
              <Input value={image} onChange={e => setImage(e.target.value)} dir="ltr" className="flex-1" />
              <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={handleImageUpload} />
              <Button variant="outline" size="icon" onClick={() => fileRef.current?.click()} disabled={uploading}>
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <Label>רשתות חברתיות</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["instagram", "facebook", "tiktok", "linkedin"].map(key => (
                <Input
                  key={key}
                  placeholder={key}
                  value={socialLinks[key] || ""}
                  onChange={e => setSocialLinks(prev => ({ ...prev, [key]: e.target.value }))}
                  dir="ltr"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Services Section ─── */}
        <section className="bg-card rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <h2 className="font-rubik text-lg font-semibold text-heading">שירותים מקושרים</h2>
          {existingCategories.map(cat => {
            const catServices = (allServices || []).filter(s => s.category === cat);
            if (catServices.length === 0) return null;
            return (
              <div key={cat} className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{cat}</p>
                {catServices.map(svc => (
                  <label key={svc.id} className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-muted/50">
                    <Checkbox
                      checked={selectedServiceIds.includes(svc.id)}
                      onCheckedChange={() => {
                        setSelectedServiceIds(prev =>
                          prev.includes(svc.id)
                            ? prev.filter(id => id !== svc.id)
                            : [...prev, svc.id]
                        );
                      }}
                    />
                    <span className="text-sm">{svc.title}</span>
                  </label>
                ))}
              </div>
            );
          })}
          {(allServices || []).filter(s => !s.category).length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">ללא קטגוריה</p>
              {(allServices || []).filter(s => !s.category).map(svc => (
                <label key={svc.id} className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded hover:bg-muted/50">
                  <Checkbox
                    checked={selectedServiceIds.includes(svc.id)}
                    onCheckedChange={() => {
                      setSelectedServiceIds(prev =>
                        prev.includes(svc.id)
                          ? prev.filter(id => id !== svc.id)
                          : [...prev, svc.id]
                      );
                    }}
                  />
                  <span className="text-sm">{svc.title}</span>
                </label>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">שינויים נשמרים עם כפתור &quot;שמור&quot; בפרופיל</p>
        </section>

        {/* ─── Portfolio Section ─── */}
        {portfolio ? (
          <section className="bg-card rounded-xl p-6 shadow-sm mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-rubik text-lg font-semibold text-heading">פורטפוליו</h2>
              <div className="flex items-center gap-2">
                <Badge variant={portfolio.status === "published" ? "default" : "secondary"}>
                  {portfolio.status === "published" ? "פורסם" : "טיוטה"}
                </Badge>
                <Button variant="ghost" size="icon" onClick={togglePortfolioStatus} title={portfolio.status === "published" ? "הסתר" : "פרסם"}>
                  {portfolio.status === "published" ? <GlobeLock className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                </Button>
                {portfolio.slug && (
                  <Link href={`/p/${portfolio.slug}`} target="_blank">
                    <Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4" /></Button>
                  </Link>
                )}
                <Button onClick={handleSavePortfolio} size="sm" className="gap-1">
                  <Save className="h-4 w-4" />שמור
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>כתובת (slug)</Label>
                <Input value={slug} onChange={e => setSlug(e.target.value)} dir="ltr" placeholder="my-portfolio" />
              </div>
              <div className="space-y-2">
                <Label>כותרת אודות</Label>
                <Input value={aboutTitle} onChange={e => setAboutTitle(e.target.value)} />
              </div>
              <div className="space-y-2" dir="ltr">
                <Label>About Title</Label>
                <Input value={aboutTitleEn} onChange={e => setAboutTitleEn(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>תת-כותרת אודות</Label>
                <Input value={aboutSubtitle} onChange={e => setAboutSubtitle(e.target.value)} />
              </div>
              <div className="space-y-2" dir="ltr">
                <Label>About Subtitle</Label>
                <Input value={aboutSubtitleEn} onChange={e => setAboutSubtitleEn(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>תוכן אודות</Label>
              <Textarea value={aboutBody} onChange={e => setAboutBody(e.target.value)} rows={4} />
            </div>
            <div className="space-y-2" dir="ltr">
              <Label>About Content</Label>
              <Textarea value={aboutBodyEn} onChange={e => setAboutBodyEn(e.target.value)} rows={4} />
            </div>
          </section>
        ) : (
          <section className="bg-card rounded-xl p-6 shadow-sm mb-6 text-center">
            <p className="text-muted-foreground">אין פורטפוליו לחניך זה. פורטפוליו ייווצר אוטומטית כשהחניך יתחבר עם Google.</p>
          </section>
        )}

        {/* ─── CV Sections ─── */}
        {portfolio && (
          <section className="bg-card rounded-xl p-6 shadow-sm mb-6 space-y-4">
            <h2 className="font-rubik text-lg font-semibold text-heading">קורות חיים</h2>

            {(cvSections ?? []).map((section) => (
              <SectionEditor
                key={section.id}
                section={section}
                onSave={(updates) => handleSaveCvSection(section, updates)}
                onDelete={() => handleDeleteCvSection(section)}
                isSaving={updateCvSection.isPending}
              />
            ))}

            <div className="flex items-center gap-2">
              <Select value={newSectionType} onValueChange={setNewSectionType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SECTION_TYPES.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddCvSection} disabled={createCvSection.isPending} size="sm">
                <Plus className="h-4 w-4 ml-1" />הוסף מחלקה
              </Button>
            </div>
          </section>
        )}
        {portfolio && (
          <section className="bg-card rounded-xl p-6 shadow-sm mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-rubik text-lg font-semibold text-heading">{ADMIN_PROJECT_LABELS.projects}</h2>
              <Button onClick={openNewProject} size="sm" className="gap-1">
                <Plus className="h-4 w-4" />{ADMIN_PROJECT_LABELS.newProject}
              </Button>
            </div>

            {(!projects || projects.length === 0) ? (
              <div className="text-center py-8 border rounded-lg">
                <FolderOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{ADMIN_PROJECT_LABELS.noProjects}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">
                          {project.title || ADMIN_PROJECT_LABELS.untitled}
                          {project.titleEn ? ` (${project.titleEn})` : ""}
                        </p>
                        {project.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        )}
                        {project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {project.driveFolderUrl && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSyncProject(project)}
                            disabled={projSyncing === project.id}
                          >
                            <RefreshCw className={`h-4 w-4 ${projSyncing === project.id ? "animate-spin" : ""}`} />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => openEditProject(project)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    {project.media.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto">
                        {project.media.slice(0, 4).map((media) => (
                          <div key={media.id} className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                            {media.thumbnailUrl ? (
                              <img src={media.thumbnailUrl} alt={media.fileName} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs text-muted-foreground">{media.fileName.split(".").pop()}</span>
                            )}
                          </div>
                        ))}
                        {project.media.length > 4 && (
                          <div className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0">
                            <span className="text-xs text-muted-foreground">+{project.media.length - 4}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{editingProject ? ADMIN_PROJECT_LABELS.editProject : ADMIN_PROJECT_LABELS.newProject}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{ADMIN_PROJECT_LABELS.projectName}</Label>
                      <Input value={projTitle} onChange={(e) => setProjTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2" dir="ltr">
                      <Label>Project Name</Label>
                      <Input value={projTitleEn} onChange={(e) => setProjTitleEn(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{ADMIN_PROJECT_LABELS.description}</Label>
                      <Textarea value={projDescription} onChange={(e) => setProjDescription(e.target.value)} rows={3} />
                    </div>
                    <div className="space-y-2" dir="ltr">
                      <Label>Description</Label>
                      <Textarea value={projDescriptionEn} onChange={(e) => setProjDescriptionEn(e.target.value)} rows={3} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{ADMIN_PROJECT_LABELS.tags}</Label>
                      <Input value={projTags} onChange={(e) => setProjTags(e.target.value)} placeholder={ADMIN_PROJECT_LABELS.tagsPlaceholder} />
                    </div>
                    <div className="space-y-2" dir="ltr">
                      <Label>Tags (comma separated)</Label>
                      <Input value={projTagsEn} onChange={(e) => setProjTagsEn(e.target.value)} placeholder="Design, Animation" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>{ADMIN_PROJECT_LABELS.driveFolder}</Label>
                    <Input
                      dir="ltr"
                      value={projDriveFolderUrl}
                      onChange={(e) => setProjDriveFolderUrl(e.target.value)}
                      placeholder="https://drive.google.com/drive/folders/..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setProjectDialogOpen(false)}>{ADMIN_PROJECT_LABELS.cancel}</Button>
                  <Button onClick={handleSaveProject} disabled={!projTitle}>
                    {editingProject ? ADMIN_PROJECT_LABELS.save : ADMIN_PROJECT_LABELS.create}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
