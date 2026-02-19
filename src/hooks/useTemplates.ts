"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Template } from "@/types/portfolio";

function mapTemplate(row: Record<string, unknown>): Template {
  return {
    id: row.id as string,
    name: row.name as string,
    label: row.label as string,
    category: row.category as Template["category"],
    thumbnailUrl: row.thumbnail_url as string,
    description: row.description as string,
    createdAt: row.created_at as string,
  };
}

export function useTemplates() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .order("category")
        .order("name");
      if (error) throw error;
      return (data ?? []).map(mapTemplate);
    },
  });
}

export function useTemplate(id: string | null) {
  return useQuery({
    queryKey: ["templates", id],
    queryFn: async () => {
      if (!id) return null;
      const supabase = createClient();
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return mapTemplate(data);
    },
    enabled: !!id,
  });
}
