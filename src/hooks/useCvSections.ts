"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { CvSection, CvEntry } from "@/types/portfolio";

function mapCvSection(row: Record<string, unknown>): CvSection {
  return {
    id: row.id as string,
    portfolioId: row.portfolio_id as string,
    sectionType: row.section_type as CvSection["sectionType"],
    title: row.title as string,
    entries: (row.entries as CvEntry[]) ?? [],
    sortOrder: row.sort_order as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function useCvSections(portfolioId: string | undefined) {
  return useQuery({
    queryKey: ["cv-sections", portfolioId],
    queryFn: async () => {
      if (!portfolioId) return [];
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cv_sections")
        .select("*")
        .eq("portfolio_id", portfolioId)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map(mapCvSection);
    },
    enabled: !!portfolioId,
  });
}

export function useCreateCvSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      portfolio_id: string;
      section_type: string;
      title: string;
      entries?: CvEntry[];
      sort_order?: number;
    }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("cv_sections")
        .insert({
          portfolio_id: input.portfolio_id,
          section_type: input.section_type,
          title: input.title,
          entries: JSON.parse(JSON.stringify(input.entries ?? [])),
          sort_order: input.sort_order ?? 0,
        })
        .select()
        .single();
      if (error) throw error;
      return mapCvSection(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cv-sections", data.portfolioId] });
    },
  });
}

export function useUpdateCvSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: {
      id: string;
      portfolio_id: string;
      title?: string;
      entries?: CvEntry[];
      sort_order?: number;
    }) => {
      const supabase = createClient();
      const { id, portfolio_id, ...rest } = updates;
      const updateData: Record<string, unknown> = {};
      if (rest.title !== undefined) updateData.title = rest.title;
      if (rest.entries !== undefined) updateData.entries = JSON.parse(JSON.stringify(rest.entries));
      if (rest.sort_order !== undefined) updateData.sort_order = rest.sort_order;

      const { data, error } = await supabase
        .from("cv_sections")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return mapCvSection(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cv-sections", data.portfolioId] });
    },
  });
}

export function useDeleteCvSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, portfolioId }: { id: string; portfolioId: string }) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("cv_sections")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return portfolioId;
    },
    onSuccess: (portfolioId) => {
      queryClient.invalidateQueries({ queryKey: ["cv-sections", portfolioId] });
    },
  });
}
