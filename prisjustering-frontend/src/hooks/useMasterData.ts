// src/hooks/useMasterData.ts

import { useQuery } from "@tanstack/react-query";
import { fetchAllMasterData } from "@/services/masterData";
import type {
  Fraksjonsgruppe,
  Enhet,
  Leverandor,
  Transportor,
  ContainerType,
  Container,
  Mottak,
  Behandlingsmetode,
} from "@/types/masterData";

export interface MasterData {
  fraksjonsgrupper: Fraksjonsgruppe[];
  enheter: Enhet[];
  leverandorer: Leverandor[];
  transportorer: Transportor[];
  containerTyper: ContainerType[];
  mottak: Mottak[];
  behandlingsmetoder: Behandlingsmetode[];
  containere?: Container[]; // 👈 gjort valgfri for å unngå krasj
}

export function useMasterData() {
  return useQuery<MasterData, Error>({
    queryKey: ["masterdata"],
    queryFn: fetchAllMasterData,
  });
}
