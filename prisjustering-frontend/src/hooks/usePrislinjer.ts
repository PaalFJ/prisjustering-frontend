// src/hooks/usePrislinjer.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPrislinjer,
  createPrislinje,
  updatePrislinje,
  deletePrislinje,
} from "@/services/price";
import type { Prislinje } from "@/types/price";

export function usePrislinjer(type: "fraksjon" | "leie") {
  return useQuery<Prislinje[]>({
    queryKey: ["prislinjer", type],
    queryFn: async () => {
      const all = await fetchPrislinjer();
      if (type === "fraksjon") return all.filter((p) => p.fraksjonId !== null);
      if (type === "leie") return all.filter((p) => p.leieId !== null);
      return [];
    },
  });
}

export function useCreatePrislinje() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPrislinje,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["prislinjer"] }),
  });
}

export function useUpdatePrislinje() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Prislinje> }) =>
      updatePrislinje(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["prislinjer"] }),
  });
}

export function useDeletePrislinje() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePrislinje,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["prislinjer"] }),
  });
}
