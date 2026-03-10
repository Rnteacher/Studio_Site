"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Project, ProjectMedia, ProjectWithMedia } from "@/types/portfolio";

function mapProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    portfolioId: row.portfolio_id as string,
    title: row.title as string,
    description: row.description as string,
    tags: (row.tags as string[]) ?? [],
    titleEn: (row.title_en as string) ?? "",
    descriptionEn: (row.description_en as string) ?? "",
    tagsEn: (row.tags_en as string[]) ?? [],
    driveFolderUrl: (row.drive_folder_url as string) ?? null,
    thumbnailUrl: (row.thumbnail_url as string) ?? null,
    sortOrder: row.sort_order as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

/** Convert old lh3.googleusercontent.com URLs to our proxy route */
function normalizeThumbnailUrl(url: string | null, driveFileId: string | null): string | null {
  if (!url) return null;
  // Already using our proxy
  if (url.startsWith("/api/drive/file/")) return url;
  // Old Google CDN URL — extract file ID and rewrite
  const match = url.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `/api/drive/file/${match[1]}`;
  // Fallback: if we have a driveFileId, use the proxy
  if (driveFileId) return `/api/drive/file/${driveFileId}`;
  return url;
}

function mapMedia(row: Record<string, unknown>): ProjectMedia {
  const driveFileId = (row.drive_file_id as string) ?? null;
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    driveFileId,
    fileName: row.file_name as string,
    mimeType: row.mime_type as string,
    thumbnailUrl: normalizeThumbnailUrl((row.thumbnail_url as string) ?? null, driveFileId),
    webViewUrl: (row.web_view_url as string) ?? null,
    sortOrder: row.sort_order as number,
  };
}

export function useProjects(portfolioId: string | undefined) {
  return useQuery({
    queryKey: ["projects", portfolioId],
    queryFn: async () => {
      if (!portfolioId) return [];
      const supabase = createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_media(*)")
        .eq("portfolio_id", portfolioId)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((row): ProjectWithMedia => ({
        ...mapProject(row),
        media: ((row.project_media as Record<string, unknown>[]) ?? [])
          .map(mapMedia)
          .sort((a, b) => a.sortOrder - b.sortOrder),
      }));
    },
    enabled: !!portfolioId,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      portfolio_id: string;
      title: string;
      description?: string;
      tags?: string[];
      title_en?: string;
      description_en?: string;
      tags_en?: string[];
      drive_folder_url?: string;
      sort_order?: number;
    }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("projects")
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return mapProject(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects", data.portfolioId] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: {
      id: string;
      portfolio_id: string;
      title?: string;
      description?: string;
      tags?: string[];
      title_en?: string;
      description_en?: string;
      tags_en?: string[];
      drive_folder_url?: string | null;
      thumbnail_url?: string | null;
      sort_order?: number;
    }) => {
      const supabase = createClient();
      const { id, portfolio_id, ...rest } = updates;
      const { data, error } = await supabase
        .from("projects")
        .update(rest)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return mapProject(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects", data.portfolioId] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, portfolioId }: { id: string; portfolioId: string }) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return portfolioId;
    },
    onSuccess: (portfolioId) => {
      queryClient.invalidateQueries({ queryKey: ["projects", portfolioId] });
    },
  });
}

export function useProjectMedia(projectId: string | undefined) {
  return useQuery({
    queryKey: ["project-media", projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const supabase = createClient();
      const { data, error } = await supabase
        .from("project_media")
        .select("*")
        .eq("project_id", projectId)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map(mapMedia);
    },
    enabled: !!projectId,
  });
}
