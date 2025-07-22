// src/services/article.ts

import axios from "@/lib/axios";
import type { Fraksjon, Leie } from "@/types/article";

// Fraksjon-endepunkter
export async function fetchFraksjoner(): Promise<Fraksjon[]> {
  const res = await axios.get("/Fraksjon");
  return res.data;
}
export async function createFraksjon(data: Partial<Fraksjon>) {
  const res = await axios.post("/Fraksjon", data);
  return res.data;
}
export async function updateFraksjon(id: number, data: Partial<Fraksjon>) {
  const res = await axios.put(`/Fraksjon/${id}`, { ...data, fraksjonId: id });
  return res.data;
}
export async function deleteFraksjon(id: number) {
  return axios.delete(`/Fraksjon/${id}`);
}

// Leie-endepunkter
export async function fetchLeier(): Promise<Leie[]> {
  const res = await axios.get("/Leie");
  return res.data;
}
export async function createLeie(data: Partial<Leie>) {
  const res = await axios.post("/Leie", data);
  return res.data;
}
export async function updateLeie(id: number, data: Partial<Leie>) {
  const res = await axios.put(`/Leie/${id}`, { ...data, leieId: id });
  return res.data;
}
export async function deleteLeie(id: number) {
  return axios.delete(`/Leie/${id}`);
}
