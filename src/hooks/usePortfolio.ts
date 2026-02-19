"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Portfolio } from "@/types/portfolio";

function mapPortfolio(row: Record<string, unknown>): Portfolio {
  return {
    id: row.id as string,
    studentId: row.student_id as string,
    userId: row.user_id as string,
    templateId: (row.template_id as string) ?? null,
    slug: (row.slug as string) ?? null,
    status: row.status as Portfolio["status"],
    aboutTitle: row.about_title as string,
    aboutBody: row.about_body as string,
    aboutImageUrl: (row.about_image_url as string) ?? null,
    contactEmail: row.contact_email as string,
    contactPhone: row.contact_phone as string,
    contactWebsite: (row.contact_website as string) ?? null,
    socialLinks: (row.social_links as Record<string, string>) ?? {},
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function useMyPortfolio() {
  return useQuery({
    queryKey: ["my-portfolio"],
    queryFn: async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (error) throw error;
      return mapPortfolio(data);
    },
  });
}

export function usePortfolioBySlug(slug: string) {
  return useQuery({
    queryKey: ["portfolio", slug],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();
      if (error) throw error;
      return mapPortfolio(data);
    },
    enabled: !!slug,
  });
}

export function useAllPortfolios() {
  return useQuery({
    queryKey: ["all-portfolios"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("portfolios")
        .select("*, students(name, image)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((row) => ({
        ...mapPortfolio(row),
        studentName: (row.students as Record<string, unknown>)?.name as string ?? "",
        studentImage: (row.students as Record<string, unknown>)?.image as string ?? "",
      }));
    },
  });
}

export function useUpdatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<{
      template_id: string | null;
      slug: string | null;
      status: string;
      about_title: string;
      about_body: string;
      about_image_url: string | null;
      contact_email: string;
      contact_phone: string;
      contact_website: string | null;
      social_links: Record<string, string>;
    }> & { id: string }) => {
      const supabase = createClient();
      const { id, ...rest } = updates;
      const { data, error } = await supabase
        .from("portfolios")
        .update(rest)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return mapPortfolio(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["all-portfolios"] });
    },
  });
}
