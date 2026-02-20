"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface Student {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  categories: string[];
  services: Record<string, string[]>;
  socialLinks: Record<string, string>;
  contact: {
    email: string;
    phone: string;
  };
}

function mapRow(row: any): Student {
  return {
    id: row.id,
    name: row.name,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    image: row.image,
    categories: row.categories || [],
    services: (row.services as Record<string, string[]>) || {},
    socialLinks: (row.social_links as Record<string, string>) || {},
    contact: {
      email: row.email,
      phone: row.phone,
    },
  };
}

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data || []).map(mapRow);
    },
  });
}

/** Get all services as a flat array for search/display */
export function getAllServices(services: Record<string, string[]>): string[] {
  return Object.values(services).flat();
}

export function useStudent(id: string | undefined) {
  return useQuery({
    queryKey: ["students", id],
    enabled: !!id,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapRow(data);
    },
  });
}
