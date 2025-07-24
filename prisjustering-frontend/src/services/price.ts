// src/services/price.ts
import axios from "@/lib/axios";
import type { Prislinje } from "@/types/price";

export async function fetchPrislinjer(): Promise<Prislinje[]> {
  const res = await axios.get("/Prislinje");
  return res.data;
}

export async function createPrislinje(data: Partial<Prislinje>) {
  const res = await axios.post("/Prislinje", data);
  return res.data;
}

export async function updatePrislinje(id: number, data: Partial<Prislinje>) {
  const res = await axios.put(`/Prislinje/${id}`, { ...data, prislinjeId: id });
  return res.data;
}

export async function deletePrislinje(id: number) {
  return axios.delete(`/Prislinje/${id}`);
}
