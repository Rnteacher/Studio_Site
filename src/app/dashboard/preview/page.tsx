"use client";

import { useMyPortfolio } from "@/hooks/usePortfolio";
import { useCvSections } from "@/hooks/useCvSections";
import { useProjects } from "@/hooks/useProjects";
import { useTemplate } from "@/hooks/useTemplates";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PreviewPage() {
  const { data, isLoading: loadingPortfolio } = useMyPortfolio();
  const portfolio = data?.portfolio;
  const student = data?.student;
  const { data: cvSections } = useCvSections(portfolio?.id);
  const { data: projects } = useProjects(portfolio?.id);
  const { data: template } = useTemplate(portfolio?.templateId ?? null);

  if (loadingPortfolio) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[600px] w-full rounded-lg" />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">לא נמצא פורטפוליו</h2>
        <p className="text-muted-foreground">
          הפורטפוליו שלך טרם הוגדר. פנה למנהל המערכת.
        </p>
      </div>
    );
  }

  const hasContent = portfolio.aboutTitle || portfolio.aboutBody || (projects && projects.length > 0);

  if (!hasContent && !template) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-2">התחל לבנות את הפורטפוליו שלך</h2>
        <p className="text-muted-foreground mb-6">
          בחר תבנית עיצוב והוסף תוכן כדי לראות תצוגה מקדימה
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard/design"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90"
          >
            בחר תבנית
          </Link>
          <Link
            href="/dashboard/about"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-10 px-4 py-2 hover:bg-accent"
          >
            הוסף תוכן
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold font-rubik">תצוגה מקדימה</h1>
        {portfolio.status === "draft" && (
          <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            טיוטה
          </span>
        )}
        {portfolio.status === "published" && (
          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
            פורסם
          </span>
        )}
      </div>
      <div className="border rounded-lg overflow-hidden bg-background">
        <TemplateRenderer
          templateName={template?.name ?? "classic-clean"}
          student={{ name: student?.name ?? "", image: student?.image ?? "" }}
          portfolio={portfolio}
          about={{
            title: portfolio.aboutTitle,
            subtitle: portfolio.aboutSubtitle ?? "",
            body: portfolio.aboutBody,
          }}
          contact={{
            email: portfolio.contactEmail,
            phone: portfolio.contactPhone,
            website: portfolio.contactWebsite ?? "",
          }}
          socialLinks={student?.socialLinks ?? {}}
          cvSections={cvSections ?? []}
          projects={projects ?? []}
          isPreview
        />
      </div>
    </div>
  );
}
