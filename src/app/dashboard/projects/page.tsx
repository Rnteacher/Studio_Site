"use client";

import { useState } from "react";
import { useMyPortfolio } from "@/hooks/usePortfolio";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, FolderOpen, RefreshCw, Copy, Check } from "lucide-react";
import type { ProjectWithMedia } from "@/types/portfolio";

export default function ProjectsPage() {
  const { data: portfolioData, isLoading: loadingPortfolio } = useMyPortfolio();
  const portfolio = portfolioData?.portfolio;
  const { data: projects, isLoading: loadingProjects } = useProjects(portfolio?.id);
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithMedia | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [driveFolderUrl, setDriveFolderUrl] = useState("");
  const [syncing, setSyncing] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const openNew = () => {
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setTags("");
    setDriveFolderUrl("");
    setDialogOpen(true);
  };

  const openEdit = (project: ProjectWithMedia) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setTags(project.tags.join(", "));
    setDriveFolderUrl(project.driveFolderUrl ?? "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!portfolio) return;
    const tagArr = tags.split(",").map((t) => t.trim()).filter(Boolean);

    try {
      if (editingProject) {
        await updateProject.mutateAsync({
          id: editingProject.id,
          portfolio_id: portfolio.id,
          title,
          description,
          tags: tagArr,
          drive_folder_url: driveFolderUrl || null,
        });
        toast({ title: "עודכן", description: "הפרויקט עודכן בהצלחה" });
      } else {
        await createProject.mutateAsync({
          portfolio_id: portfolio.id,
          title,
          description,
          tags: tagArr,
          drive_folder_url: driveFolderUrl || undefined,
          sort_order: (projects?.length ?? 0),
        });
        toast({ title: "נוצר", description: "הפרויקט נוסף בהצלחה" });
      }
      setDialogOpen(false);
    } catch {
      toast({ title: "שגיאה", description: "הפעולה נכשלה", variant: "destructive" });
    }
  };

  const handleDelete = async (project: ProjectWithMedia) => {
    if (!portfolio) return;
    try {
      await deleteProject.mutateAsync({ id: project.id, portfolioId: portfolio.id });
      toast({ title: "נמחק", description: "הפרויקט נמחק" });
    } catch {
      toast({ title: "שגיאה", description: "המחיקה נכשלה", variant: "destructive" });
    }
  };

  const handleSync = async (project: ProjectWithMedia) => {
    if (!project.driveFolderUrl) {
      toast({ title: "שגיאה", description: "לא הוגדר קישור לתיקיית Drive", variant: "destructive" });
      return;
    }
    setSyncing(project.id);
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
      toast({ title: "סונכרן", description: "הקבצים סונכרנו מ-Google Drive" });
    } catch (err) {
      toast({
        title: "שגיאת סנכרון",
        description: err instanceof Error ? err.message : "הסנכרון נכשל",
        variant: "destructive",
      });
    } finally {
      setSyncing(null);
    }
  };

  if (loadingPortfolio || loadingProjects) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-rubik">פרויקטים</h1>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 ml-2" />
          פרויקט חדש
        </Button>
      </div>

      {(!projects || projects.length === 0) ? (
        <div className="text-center py-12 border rounded-lg bg-background">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">אין פרויקטים עדיין</h3>
          <p className="text-muted-foreground mb-4">הוסף את הפרויקט הראשון שלך</p>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 ml-2" />
            פרויקט חדש
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 bg-background space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{project.title || "ללא שם"}</h3>
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {project.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(project)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {project.driveFolderUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSync(project)}
                  disabled={syncing === project.id}
                >
                  <RefreshCw className={`h-3 w-3 ml-1 ${syncing === project.id ? "animate-spin" : ""}`} />
                  סנכרן מ-Drive
                </Button>
              )}
              {project.media.length > 0 && (
                <div className="flex gap-2 overflow-x-auto">
                  {project.media.slice(0, 4).map((m) => (
                    <div key={m.id} className="w-16 h-16 rounded bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                      {m.thumbnailUrl ? (
                        <img src={m.thumbnailUrl} alt={m.fileName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{m.fileName.split(".").pop()}</span>
                      )}
                    </div>
                  ))}
                  {project.media.length > 4 && (
                    <div className="w-16 h-16 rounded bg-muted flex items-center justify-center shrink-0">
                      <span className="text-xs text-muted-foreground">+{project.media.length - 4}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProject ? "עריכת פרויקט" : "פרויקט חדש"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>שם הפרויקט</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>תיאור</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>תגיות (מופרדות בפסיק)</Label>
              <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="עיצוב, אנימציה, 3D" />
            </div>
            <div className="space-y-2">
              <Label>קישור לתיקיית Google Drive</Label>
              <Input dir="ltr" value={driveFolderUrl} onChange={(e) => setDriveFolderUrl(e.target.value)} placeholder="https://drive.google.com/drive/folders/..." />
              <p className="text-xs text-muted-foreground mb-1">
                שתף את התיקייה עם חשבון השירות של המערכת:
              </p>
              <div className="flex items-center gap-2 bg-muted rounded px-2 py-1.5">
                <code dir="ltr" className="text-[11px] flex-1 select-all break-all text-muted-foreground">
                  studio-durian-drive@studio-durian-site.iam.gserviceaccount.com
                </code>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={async () => {
                    await navigator.clipboard.writeText("studio-durian-drive@studio-durian-site.iam.gserviceaccount.com");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                    toast({ title: "הועתק!" });
                  }}
                >
                  {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>ביטול</Button>
            <Button onClick={handleSave} disabled={!title}>
              {editingProject ? "שמור" : "צור"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
