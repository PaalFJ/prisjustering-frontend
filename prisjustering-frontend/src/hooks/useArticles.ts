// src/hooks/useArticles.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFraksjoner,
  createFraksjon,
  updateFraksjon,
  deleteFraksjon,
  fetchLeier,
  createLeie,
  updateLeie,
  deleteLeie,
} from "@/services/article";
import type { Fraksjon, Leie } from "@/types/article";

// Fraksjon hooks
export function useFraksjoner() {
  return useQuery<Fraksjon[]>({
    queryKey: ["fraksjoner"],
    queryFn: fetchFraksjoner,
  });
}
export function useCreateFraksjon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createFraksjon,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fraksjoner"] }),
  });
}
export function useUpdateFraksjon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Fraksjon> }) =>
      updateFraksjon(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fraksjoner"] }),
  });
}
export function useDeleteFraksjon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteFraksjon,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fraksjoner"] }),
  });
}

// Leie hooks
export function useLeier() {
  return useQuery<Leie[]>({
    queryKey: ["leier"],
    queryFn: fetchLeier,
  });
}
export function useCreateLeie() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createLeie,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leier"] }),
  });
}
export function useUpdateLeie() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Leie> }) =>
      updateLeie(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leier"] }),
  });
}
export function useDeleteLeie() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteLeie,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leier"] }),
  });
}
