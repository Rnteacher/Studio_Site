"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Portfolio } from "@/types/portfolio";

export interface PortfolioWithStudent {
  portfolio: Portfolio;
  student: { name: string; image: string; email: string; phone: string; website: string; socialLinks: Record<string, string> };
}

function mapPortfolio(row: Record<string, unknown>): Portfolio {
  return {
    id: row.id as string,
    studentId: row.student_id as string,
    userId: row.user_id as string,
    templateId: (row.template_id as string) ?? null,
    slug: (row.slug as string) ?? null,
    status: row.status as Portfolio["status"],
    aboutTitle: (row.about_title as string) ?? "",
    aboutBody: (row.about_body as string) ?? "",
    aboutSubtitle: (row.about_subtitle as string) ?? "",
    contactEmail: (row.contact_email as string) ?? "",
    contactPhone: (row.contact_phone as string) ?? "",
    contactWebsite: (row.contact_website as string) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function mapStudentFromJoin(row: Record<string, unknown>): PortfolioWithStudent["student"] {
  const s = row.students as Record<string, unknown> | null;
  return {
    name: (s?.name as string) ?? "",
    image: (s?.image as string) ?? "",
    email: (s?.email as string) ?? "",
    phone: (s?.phone as string) ?? "",
    website: (s?.website as string) ?? "",
    socialLinks: (s?.social_links as Record<string, string>) ?? {},
  };
}

export function useMyPortfolio() {
  return useQuery({
    queryKey: ["my-portfolio"],
    queryFn: async (): Promise<PortfolioWithStudent> => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("portfolios")
        .select("*, students(name, image, email, phone, website, social_links)")
        .eq("user_id", user.id)
        .single();
      if (error) throw error;
      return {
        portfolio: mapPortfolio(data),
        student: mapStudentFromJoin(data as Record<string, unknown>),
      };
    },
  });
}

export function usePortfolioBySlug(slug: string) {
  return useQuery({
    queryKey: ["portfolio", slug],
    queryFn: async (): Promise<PortfolioWithStudent> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("portfolios")
        .select("*, students(name, image, email, phone, website, social_links)")
        .eq("slug", slug)
        .eq("status", "published")
        .single();
      if (error) throw error;
      return {
        portfolio: mapPortfolio(data),
        student: mapStudentFromJoin(data as Record<string, unknown>),
      };
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
        .select("*, students(name, image, email, phone, website, social_links)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((row) => ({
        portfolio: mapPortfolio(row),
        student: mapStudentFromJoin(row as Record<string, unknown>),
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
      about_subtitle: string;
      contact_email: string;
      contact_phone: string;
      contact_website: string | null;
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
