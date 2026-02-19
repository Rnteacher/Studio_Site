import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { StickyContactBar } from "@/components/portfolio/StickyContactBar";
import type { Metadata } from "next";
import type { Portfolio, CvSection, CvEntry, ProjectWithMedia, ProjectMedia } from "@/types/portfolio";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPortfolioData(slug: string) {
  const supabase = await createClient();

  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("*, templates(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !portfolio) return null;

  const [cvResult, projectsResult] = await Promise.all([
    supabase
      .from("cv_sections")
      .select("*")
      .eq("portfolio_id", portfolio.id)
      .order("sort_order"),
    supabase
      .from("projects")
      .select("*, project_media(*)")
      .eq("portfolio_id", portfolio.id)
      .order("sort_order"),
  ]);

  const cvSections: CvSection[] = (cvResult.data ?? []).map((row) => ({
    id: row.id,
    portfolioId: row.portfolio_id,
    sectionType: row.section_type as CvSection["sectionType"],
    title: row.title,
    entries: (row.entries as unknown as CvEntry[]) ?? [],
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  const projects: ProjectWithMedia[] = (projectsResult.data ?? []).map((row) => ({
    id: row.id,
    portfolioId: row.portfolio_id,
    title: row.title,
    description: row.description,
    tags: row.tags ?? [],
    driveFolderUrl: row.drive_folder_url,
    thumbnailUrl: row.thumbnail_url,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    media: ((row.project_media as Record<string, unknown>[]) ?? [])
      .map((m): ProjectMedia => ({
        id: m.id as string,
        projectId: m.project_id as string,
        driveFileId: (m.drive_file_id as string) ?? null,
        fileName: m.file_name as string,
        mimeType: m.mime_type as string,
        thumbnailUrl: (m.thumbnail_url as string) ?? null,
        webViewUrl: (m.web_view_url as string) ?? null,
        sortOrder: m.sort_order as number,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder),
  }));

  const templateRow = portfolio.templates as Record<string, unknown> | null;
  const templateName = (templateRow?.name as string) ?? "classic-clean";

  const mappedPortfolio: Portfolio = {
    id: portfolio.id,
    studentId: portfolio.student_id,
    userId: portfolio.user_id,
    templateId: portfolio.template_id,
    slug: portfolio.slug,
    status: portfolio.status as Portfolio["status"],
    aboutTitle: portfolio.about_title,
    aboutBody: portfolio.about_body,
    aboutImageUrl: portfolio.about_image_url,
    contactEmail: portfolio.contact_email,
    contactPhone: portfolio.contact_phone,
    contactWebsite: portfolio.contact_website,
    socialLinks: (portfolio.social_links as Record<string, string>) ?? {},
    createdAt: portfolio.created_at,
    updatedAt: portfolio.updated_at,
  };

  return { portfolio: mappedPortfolio, templateName, cvSections, projects };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioData(slug);
  if (!data) return { title: "לא נמצא" };

  return {
    title: data.portfolio.aboutTitle || `פורטפוליו - ${slug}`,
    description: data.portfolio.aboutBody?.slice(0, 160) || "פורטפוליו אישי",
    openGraph: {
      title: data.portfolio.aboutTitle || `פורטפוליו - ${slug}`,
      description: data.portfolio.aboutBody?.slice(0, 160) || "פורטפוליו אישי",
      ...(data.portfolio.aboutImageUrl && { images: [data.portfolio.aboutImageUrl] }),
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPortfolioData(slug);

  if (!data) notFound();

  return (
    <>
      <TemplateRenderer
        templateName={data.templateName}
        portfolio={data.portfolio}
        about={{
          title: data.portfolio.aboutTitle,
          body: data.portfolio.aboutBody,
          imageUrl: data.portfolio.aboutImageUrl ?? "",
        }}
        contact={{
          email: data.portfolio.contactEmail,
          phone: data.portfolio.contactPhone,
          website: data.portfolio.contactWebsite ?? "",
        }}
        socialLinks={data.portfolio.socialLinks}
        cvSections={data.cvSections}
        projects={data.projects}
      />
      <StickyContactBar
        email={data.portfolio.contactEmail}
        phone={data.portfolio.contactPhone}
      />
    </>
  );
}
