# Admin Full Portfolio Editing — Implementation Plan

## Context

The admin page at `/admin/student/[id]` lets admins manage a student's profile and
portfolio. Currently the coverage is incomplete:

| Section   | Admin can view | Admin can edit |
|-----------|---------------|----------------|
| About (Hebrew) | ✓ | ✓ |
| About (English) | ✗ | ✗ |
| CV sections (create/delete) | ✓ | ✓ |
| CV entries (content) | read-only | ✗ |
| Projects | ✗ | ✗ |

Goal: bring admin editing to full parity with the student dashboard, reusing
existing components wherever possible.

---

## Relevant Files

### Admin
- `src/app/admin/student/[id]/page.tsx` — **primary target** (475 lines)

### Student dashboard (source of reusable components)
- `src/app/dashboard/about/page.tsx` — About editor (bilingual fields)
- `src/app/dashboard/cv/page.tsx` — CV editor with `SectionEditor` + `EntryEditor`
- `src/app/dashboard/projects/page.tsx` — Projects create/edit/delete + Drive sync

### Hooks (all portfolio-ID-based, no user coupling)
- `src/hooks/usePortfolio.ts` — `useAllPortfolios`, `useUpdatePortfolio`
- `src/hooks/useCvSections.ts` — `useCvSections`, `useCreateCvSection`, `useUpdateCvSection`, `useDeleteCvSection`
- `src/hooks/useProjects.ts` — `useProjects`, `useCreateProject`, `useUpdateProject`, `useDeleteProject`

### Types
- `src/types/portfolio.ts` — `Portfolio`, `CvSection`, `CvEntry`, `ProjectWithMedia`

### Database (no schema changes needed)
- `supabase/migrations/002_portfolios.sql` — RLS confirmed: admin has full
  access to `cv_sections`, `projects`, `project_media` via `has_role(auth.uid(), 'admin')`

---

## Current Behavior

### About section (admin)
Saves only `about_title`, `about_subtitle`, `about_body` (Hebrew).  
The English fields (`about_title_en`, `about_subtitle_en`, `about_body_en`) exist
in the DB and in `useUpdatePortfolio`'s type signature but are never shown or saved.

### CV section (admin)
```tsx
// current rendering (read-only display only):
{section.entries.map((entry, i) => (
  <div key={i} className="text-sm pr-4 border-r-2 border-muted">
    <p className="font-medium">{entry.title}</p>
    {entry.subtitle && <p className="text-muted-foreground">{entry.subtitle}</p>}
    {entry.dateRange && <p className="text-xs text-muted-foreground">{entry.dateRange}</p>}
  </div>
))}
```
Sections can be added (type + auto-label) and deleted, but entries cannot be
created, edited, or reordered from admin.

### Projects section (admin)
Does not exist. No projects hook is imported; no projects UI is rendered.

---

## Desired Behavior

### About section (admin)
Show all 6 bilingual fields side-by-side (same layout as `dashboard/about/page.tsx`).
Save all 6 on "שמור".

### CV section (admin)
Each section is collapsible and fully editable: section title (Hebrew + English),
entries (add/remove/reorder/edit all fields). Identical UX to the student dashboard.

### Projects section (admin)
A new card below CV:
- Lists all projects for the student's portfolio
- "פרויקט חדש" button opens a Dialog to create
- Pencil icon on each card opens the same Dialog for editing
- Trash icon deletes with confirmation
- "סנכרן מ-Drive" button on each project that has a Drive folder URL

---

## Proposed Component / Data Flow

```
AdminStudentPage
│
├── [Profile section]            ← unchanged
├── [Services section]           ← unchanged
│
├── [Portfolio / About section]  ← add 3 English fields
│     useUpdatePortfolio({ id, about_title_en, about_subtitle_en, about_body_en })
│
├── [CV section]
│     useCvSections(portfolio.id)          ← already imported
│     useUpdateCvSection()                 ← add import
│     useCreateCvSection()                 ← already imported
│     useDeleteCvSection()                 ← already imported
│     ↓
│     <SectionEditor> (shared component)   ← extracted from dashboard/cv
│       └── <EntryEditor>                  ← extracted from dashboard/cv
│
└── [Projects section]           ← new
      useProjects(portfolio.id)
      useCreateProject()
      useUpdateProject()
      useDeleteProject()
      ↓
      Project cards + Dialog (same pattern as dashboard/projects/page.tsx)
```

All hooks are already portfolio-ID-based and RLS-safe for admins.  
No new API routes or DB migrations are needed.

---

## Exact Code Changes

### Change 1 — Extract shared CV components
**New file**: `src/components/shared/CvSectionEditor.tsx`

Extract the two components verbatim from `dashboard/cv/page.tsx`:
- `EntryEditor` (lines 31–115 in dashboard/cv/page.tsx)
- `SectionEditor` (lines 117–289 in dashboard/cv/page.tsx)

Both are self-contained: they accept section data and callback props, import only
from `@/types/portfolio` and shadcn/lucide. No page state coupling.

Export both:
```ts
export { EntryEditor };
export { SectionEditor };
```

---

### Change 2 — Update dashboard/cv/page.tsx to import from shared
**Modified file**: `src/app/dashboard/cv/page.tsx`

Replace the inline `EntryEditor` and `SectionEditor` function definitions with:
```ts
import { EntryEditor, SectionEditor } from "@/components/shared/CvSectionEditor";
```

Remove the now-duplicate component bodies. All runtime behavior stays identical.

---

### Change 3 — Add English About fields to admin
**Modified file**: `src/app/admin/student/[id]/page.tsx`

#### 3a. Add 3 new state variables (after existing aboutBody state)
```ts
const [aboutTitleEn, setAboutTitleEn] = useState("");
const [aboutSubtitleEn, setAboutSubtitleEn] = useState("");
const [aboutBodyEn, setAboutBodyEn] = useState("");
```

#### 3b. Populate from portfolio in useEffect
```ts
// inside the portfolio useEffect:
setAboutTitleEn(portfolio.aboutTitleEn ?? "");
setAboutSubtitleEn(portfolio.aboutSubtitleEn ?? "");
setAboutBodyEn(portfolio.aboutBodyEn ?? "");
```

#### 3c. Include English fields in handleSavePortfolio
```ts
await updatePortfolio.mutateAsync({
  id: portfolio.id,
  slug: slug || null,
  about_title: aboutTitle,
  about_subtitle: aboutSubtitle,
  about_body: aboutBody,
  about_title_en: aboutTitleEn,       // add
  about_subtitle_en: aboutSubtitleEn, // add
  about_body_en: aboutBodyEn,         // add
});
```

#### 3d. Add English inputs to the Portfolio section JSX
In the `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">` inside the Portfolio
section, add English counterparts next to the existing Hebrew inputs:
- כותרת אודות / About Title (same row pattern as dashboard/about page.tsx)
- תת-כותרת / Subtitle
- Below the grid, the existing `<Textarea>` for `aboutBody`, then an English
  `<Textarea dir="ltr">` for `aboutBodyEn`

---

### Change 4 — Full CV entry editing in admin
**Modified file**: `src/app/admin/student/[id]/page.tsx`

#### 4a. Add import
```ts
import { SectionEditor } from "@/components/shared/CvSectionEditor";
import { useUpdateCvSection } from "@/hooks/useCvSections";  // add
```

#### 4b. Add hook call (after existing CV hooks)
```ts
const updateCvSection = useUpdateCvSection();
```

#### 4c. Add save handler
```ts
const handleSaveCvSection = async (
  section: CvSection,
  updates: Partial<{ title: string; title_en: string; entries: CvEntry[]; entries_en: CvEntry[] }>
) => {
  await updateCvSection.mutateAsync({
    id: section.id,
    portfolio_id: section.portfolioId,
    ...updates,
  });
  toast({ title: "נשמר" });
};
```

#### 4d. Replace the CV section JSX
Replace the current `{(cvSections ?? []).map((section) => { ... })}` display-only
block with:
```tsx
{(cvSections ?? []).map((section) => (
  <SectionEditor
    key={section.id}
    section={section}
    onSave={(updates) => handleSaveCvSection(section, updates)}
    onDelete={() => handleDeleteCvSection(section)}
    isSaving={updateCvSection.isPending}
  />
))}
```

---

### Change 5 — Projects section in admin
**Modified file**: `src/app/admin/student/[id]/page.tsx`

#### 5a. Add imports
```ts
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/useProjects";
import { Pencil, FolderOpen, RefreshCw } from "lucide-react";  // add to existing import
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";  // add
import type { ProjectWithMedia } from "@/types/portfolio";  // add
```

#### 5b. Add hook calls (after CV hooks, inside component body)
```ts
const { data: projects } = useProjects(portfolio?.id);
const createProject = useCreateProject();
const updateProject = useUpdateProject();
const deleteProject = useDeleteProject();
```

#### 5c. Add project dialog state variables
```ts
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
```

#### 5d. Add handler functions
```ts
const openNewProject = () => {
  setEditingProject(null);
  setProjTitle(""); setProjTitleEn(""); setProjDescription("");
  setProjDescriptionEn(""); setProjTags(""); setProjTagsEn("");
  setProjDriveFolderUrl("");
  setProjectDialogOpen(true);
};

const openEditProject = (p: ProjectWithMedia) => {
  setEditingProject(p);
  setProjTitle(p.title); setProjTitleEn(p.titleEn ?? "");
  setProjDescription(p.description); setProjDescriptionEn(p.descriptionEn ?? "");
  setProjTags(p.tags.join(", ")); setProjTagsEn((p.tagsEn ?? []).join(", "));
  setProjDriveFolderUrl(p.driveFolderUrl ?? "");
  setProjectDialogOpen(true);
};

const handleSaveProject = async () => {
  if (!portfolio) return;
  const tagArr = projTags.split(",").map(t => t.trim()).filter(Boolean);
  const tagEnArr = projTagsEn.split(",").map(t => t.trim()).filter(Boolean);
  try {
    if (editingProject) {
      await updateProject.mutateAsync({
        id: editingProject.id, portfolio_id: portfolio.id,
        title: projTitle, description: projDescription, tags: tagArr,
        title_en: projTitleEn, description_en: projDescriptionEn, tags_en: tagEnArr,
        drive_folder_url: projDriveFolderUrl || null,
      });
      toast({ title: "עודכן" });
    } else {
      await createProject.mutateAsync({
        portfolio_id: portfolio.id,
        title: projTitle, description: projDescription, tags: tagArr,
        title_en: projTitleEn, description_en: projDescriptionEn, tags_en: tagEnArr,
        drive_folder_url: projDriveFolderUrl || undefined,
        sort_order: projects?.length ?? 0,
      });
      toast({ title: "נוצר" });
    }
    setProjectDialogOpen(false);
  } catch {
    toast({ title: "שגיאה", variant: "destructive" });
  }
};

const handleDeleteProject = async (p: ProjectWithMedia) => {
  if (!portfolio) return;
  await deleteProject.mutateAsync({ id: p.id, portfolioId: portfolio.id });
  toast({ title: "נמחק" });
};

const handleSyncProject = async (p: ProjectWithMedia) => {
  if (!p.driveFolderUrl) return;
  setProjSyncing(p.id);
  try {
    const res = await fetch("/api/drive/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderUrl: p.driveFolderUrl, projectId: p.id }),
    });
    if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
    toast({ title: "סונכרן" });
  } catch (err) {
    toast({ title: "שגיאת סנכרון", description: err instanceof Error ? err.message : "", variant: "destructive" });
  } finally {
    setProjSyncing(null);
  }
};
```

#### 5e. Add Projects section JSX (after CV section, before closing `</main>`)
```tsx
{portfolio && (
  <section className="bg-card rounded-xl p-6 shadow-sm mb-6 space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="font-rubik text-lg font-semibold text-heading">פרויקטים</h2>
      <Button onClick={openNewProject} size="sm" className="gap-1">
        <Plus className="h-4 w-4" />פרויקט חדש
      </Button>
    </div>

    {(!projects || projects.length === 0) ? (
      <div className="text-center py-8 border rounded-lg">
        <FolderOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">אין פרויקטים עדיין</p>
      </div>
    ) : (
      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">
                  {project.title || "ללא שם"}
                  {project.titleEn ? ` (${project.titleEn})` : ""}
                </p>
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                )}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-muted px-2 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-1 shrink-0">
                {project.driveFolderUrl && (
                  <Button variant="ghost" size="icon" onClick={() => handleSyncProject(project)}
                    disabled={projSyncing === project.id}>
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
                {project.media.slice(0, 4).map(m => (
                  <div key={m.id} className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                    {m.thumbnailUrl
                      ? <img src={m.thumbnailUrl} alt={m.fileName} className="w-full h-full object-cover" />
                      : <span className="text-xs text-muted-foreground">{m.fileName.split(".").pop()}</span>
                    }
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
          <DialogTitle>{editingProject ? "עריכת פרויקט" : "פרויקט חדש"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>שם הפרויקט</Label>
              <Input value={projTitle} onChange={e => setProjTitle(e.target.value)} />
            </div>
            <div className="space-y-2" dir="ltr">
              <Label>Project Name</Label>
              <Input value={projTitleEn} onChange={e => setProjTitleEn(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>תיאור</Label>
              <Textarea value={projDescription} onChange={e => setProjDescription(e.target.value)} rows={3} />
            </div>
            <div className="space-y-2" dir="ltr">
              <Label>Description</Label>
              <Textarea value={projDescriptionEn} onChange={e => setProjDescriptionEn(e.target.value)} rows={3} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>תגיות (מופרדות בפסיק)</Label>
              <Input value={projTags} onChange={e => setProjTags(e.target.value)} placeholder="עיצוב, אנימציה" />
            </div>
            <div className="space-y-2" dir="ltr">
              <Label>Tags (comma separated)</Label>
              <Input value={projTagsEn} onChange={e => setProjTagsEn(e.target.value)} placeholder="Design, Animation" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>קישור לתיקיית Google Drive</Label>
            <Input dir="ltr" value={projDriveFolderUrl} onChange={e => setProjDriveFolderUrl(e.target.value)}
              placeholder="https://drive.google.com/drive/folders/..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setProjectDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleSaveProject} disabled={!projTitle}>
            {editingProject ? "שמור" : "צור"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </section>
)}
```

---

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| RLS blocks admin writes to cv_sections/projects | Low | Migration 002 confirms `Admins can manage all cv_sections/projects/project_media` policies using `has_role(auth.uid(), 'admin')` |
| Admin query cache not invalidated after CV/project edits | Low | Existing hook `onSuccess` callbacks invalidate `["cv-sections", portfolioId]` and `["projects", portfolioId]`; also invalidates `["all-portfolios"]` via useUpdatePortfolio |
| `SectionEditor` in admin re-renders from server after `useAllPortfolios` re-fetch | Low | SectionEditor uses `dirty` guard: only resets local state if section ID changes or `!dirty` — same logic as in dashboard |
| Drive sync `/api/drive/list` rejects admin session | Low | The endpoint authenticates via Supabase session and admin session is fully valid |
| Large number of state vars bloats admin page | Medium | Acceptable for now; a future refactor could move each section into its own sub-component |

---

## No Schema Changes Required

All necessary DB columns exist:
- `portfolios.about_title_en / about_subtitle_en / about_body_en` — migration 011
- `cv_sections.title_en / entries_en` — migration 011
- `projects.title_en / description_en / tags_en` — migration 011
- `project_media.*` — migration 002
- Admin RLS policies on all tables — migration 002

---

## Verification Checklist

- [ ] `npx tsc --noEmit` passes after all changes
- [ ] `npm run build` passes
- [ ] Admin can open a student's portfolio page
- [ ] About section shows 6 fields (3 Hebrew + 3 English)
- [ ] Saving About persists English fields (verify in Supabase dashboard or by reopening the page)
- [ ] CV sections are collapsible and show the SectionEditor UI
- [ ] Admin can add an entry to a CV section and save
- [ ] Admin can edit an entry title/subtitle/dateRange/description and save
- [ ] Admin can delete a CV entry
- [ ] Admin can delete a CV section
- [ ] Student dashboard `/dashboard/cv` still works identically (shared component extraction didn't break it)
- [ ] Projects section appears in admin with "פרויקט חדש" button
- [ ] Admin can create a project (fills dialog, saves, card appears)
- [ ] Admin can edit a project (pencil opens pre-filled dialog, saves correctly)
- [ ] Admin can delete a project
- [ ] Admin can trigger Drive sync on a project with a Drive folder URL
- [ ] Student dashboard `/dashboard/projects` still works identically
- [ ] Public portfolio pages (`/p/[slug]`) are unaffected

---

## Implementation Order (for Codex)

1. **Create** `src/components/shared/CvSectionEditor.tsx` (extract EntryEditor + SectionEditor)
2. **Modify** `src/app/dashboard/cv/page.tsx` (import from shared, remove local definitions)
3. **Modify** `src/app/admin/student/[id]/page.tsx`:
   a. Add English About state + useEffect init + handleSavePortfolio changes + JSX inputs
   b. Add useUpdateCvSection import + hook call + handleSaveCvSection + replace CV JSX with SectionEditor
   c. Add project hooks imports + state vars + handler functions + Projects section JSX + Dialog
4. Run `npx tsc --noEmit` and fix any type errors
5. Run `npm run build`
