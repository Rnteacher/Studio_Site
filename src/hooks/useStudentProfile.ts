"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  socialLinks: Record<string, string>;
}

function mapRow(row: Record<string, unknown>): StudentProfile {
  return {
    id: row.id as string,
    name: row.name as string,
    email: (row.email as string) ?? "",
    phone: (row.phone as string) ?? "",
    image: (row.image as string) ?? "",
    shortDescription: (row.short_description as string) ?? "",
    longDescription: (row.long_description as string) ?? "",
    socialLinks: (row.social_links as Record<string, string>) ?? {},
  };
}

export function useStudentProfile() {
  return useQuery({
    queryKey: ["student-profile"],
    queryFn: async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (error) throw error;
      return mapRow(data);
    },
  });
}

export function useUpdateStudentProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<{
      email: string;
      phone: string;
      image: string;
      short_description: string;
      long_description: string;
      social_links: Record<string, string>;
    }> & { id: string }) => {
      const supabase = createClient();
      const { id, ...rest } = updates;
      const { data, error } = await supabase
        .from("students")
        .update(rest)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return mapRow(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
      queryClient.invalidateQueries({ queryKey: ["my-portfolio"] });
    },
  });
}
