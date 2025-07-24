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
  fetchSalgsvare,
  createSalgsvare,
  updateSalgsvare,
  deleteSalgsvare,
  fetchGebyrer,
  createGebyr,
  updateGebyr,
  deleteGebyr,
} from "@/services/article";

import type { Fraksjon, Leie, Salgsvare, Gebyr } from "@/types/article";

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

// Salgsvare hooks
export function useSalgsvare() {
  return useQuery<Salgsvare[]>({
    queryKey: ["salgsvare"],
    queryFn: fetchSalgsvare,
  });
}
export function useCreateSalgsvare() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createSalgsvare,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["salgsvare"] }),
  });
}
export function useUpdateSalgsvare() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Salgsvare> }) =>
      updateSalgsvare(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["salgsvare"] }),
  });
}
export function useDeleteSalgsvare() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteSalgsvare,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["salgsvare"] }),
  });
}

// ✅ Gebyr hooks
export function useGebyrer() {
  return useQuery<Gebyr[]>({
    queryKey: ["gebyrer"],
    queryFn: fetchGebyrer,
  });
}
export function useCreateGebyr() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createGebyr,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gebyrer"] }),
  });
}
export function useUpdateGebyr() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Gebyr> }) =>
      updateGebyr(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gebyrer"] }),
  });
}
export function useDeleteGebyr() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteGebyr,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gebyrer"] }),
  });
}
