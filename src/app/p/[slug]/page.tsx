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
    .select("*, templates(*), students(name, image, email, phone, website, social_links)")
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

  const studentRow = portfolio.students as Record<string, unknown> | null;
  const student = {
    name: (studentRow?.name as string) ?? "",
    image: (studentRow?.image as string) ?? "",
    email: (studentRow?.email as string) ?? "",
    phone: (studentRow?.phone as string) ?? "",
    website: (studentRow?.website as string) ?? "",
    socialLinks: (studentRow?.social_links as Record<string, string>) ?? {},
  };

  const mappedPortfolio: Portfolio = {
    id: portfolio.id,
    studentId: portfolio.student_id,
    userId: portfolio.user_id,
    templateId: portfolio.template_id,
    slug: portfolio.slug,
    status: portfolio.status as Portfolio["status"],
    aboutTitle: portfolio.about_title,
    aboutBody: portfolio.about_body,
    aboutSubtitle: (portfolio as Record<string, unknown>).about_subtitle as string ?? "",
    contactEmail: portfolio.contact_email,
    contactPhone: portfolio.contact_phone,
    contactWebsite: portfolio.contact_website,
    createdAt: portfolio.created_at,
    updatedAt: portfolio.updated_at,
  };

  return { portfolio: mappedPortfolio, student, templateName, cvSections, projects };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPortfolioData(slug);
  if (!data) return { title: "לא נמצא" };

  const title = data.student.name || data.portfolio.aboutTitle || `פורטפוליו - ${slug}`;
  return {
    title,
    description: data.portfolio.aboutBody?.slice(0, 160) || "פורטפוליו אישי",
    openGraph: {
      title,
      description: data.portfolio.aboutBody?.slice(0, 160) || "פורטפוליו אישי",
      ...(data.student.image && { images: [data.student.image] }),
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
        student={{ name: data.student.name, image: data.student.image }}
        portfolio={data.portfolio}
        about={{
          title: data.portfolio.aboutTitle,
          subtitle: data.portfolio.aboutSubtitle ?? "",
          body: data.portfolio.aboutBody,
        }}
        contact={{
          email: data.student.email,
          phone: data.student.phone,
          website: data.student.website,
        }}
        socialLinks={data.student.socialLinks}
        cvSections={data.cvSections}
        projects={data.projects}
      />
      {data.cvSections.length > 0 && (
        <a
          href={`/api/cv/pdf?portfolioId=${data.portfolio.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 md:bottom-6 left-4 z-40 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full shadow-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          הורד קורות חיים
        </a>
      )}
      <StickyContactBar
        email={data.student.email}
        phone={data.student.phone}
      />
    </>
  );
}
