"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export type SiteContentMap = Record<string, Record<string, string>>;

export function useSiteContent() {
  return useQuery({
    queryKey: ["site-content"],
    queryFn: async (): Promise<SiteContentMap> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("section, key, value")
        .order("created_at", { ascending: true });
      if (error) throw error;

      const map: SiteContentMap = {};
      for (const row of data ?? []) {
        if (!map[row.section]) map[row.section] = {};
        map[row.section][row.key] = row.value;
      }
      return map;
    },
    staleTime: 60_000, // cache for 1 minute
  });
}

export interface SiteContentRow {
  section: string;
  key: string;
  value: string;
  type: string;
}

export function useSiteContentWithTypes() {
  return useQuery({
    queryKey: ["site-content-with-types"],
    queryFn: async (): Promise<SiteContentRow[]> => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("site_content")
        .select("section, key, value, type")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as SiteContentRow[];
    },
    staleTime: 60_000,
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ section, key, value }: { section: string; key: string; value: string }) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("site_content")
        .update({ value })
        .eq("section", section)
        .eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content-with-types"] });
    },
  });
}
