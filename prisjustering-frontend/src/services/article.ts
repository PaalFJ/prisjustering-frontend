//article.ts

import axios from "@/lib/axios";
import type { Fraksjon, Leie, Salgsvare, Gebyr } from "@/types/article";

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

// Salgsvare-endepunkter
export async function fetchSalgsvare(): Promise<Salgsvare[]> {
  const res = await axios.get("/Salgsvare");
  return res.data;
}
export async function createSalgsvare(data: Partial<Salgsvare>) {
  const res = await axios.post("/Salgsvare", data);
  return res.data;
}
export async function updateSalgsvare(id: number, data: Partial<Salgsvare>) {
  const res = await axios.put(`/Salgsvare/${id}`, { ...data, salgsvareId: id });
  return res.data;
}
export async function deleteSalgsvare(id: number) {
  return axios.delete(`/Salgsvare/${id}`);
}

// Gebyr-endepunkter
export async function fetchGebyrer(): Promise<Gebyr[]> {
  const res = await axios.get("/Gebyr");
  return res.data;
}

export async function createGebyr(data: Partial<Gebyr>) {
  const res = await axios.post("/Gebyr", data);
  return res.data;
}

export async function updateGebyr(id: number, data: Partial<Gebyr>) {
  const res = await axios.put(`/Gebyr/${id}`, { ...data, gebyrId: id });
  return res.data;
}

export async function deleteGebyr(id: number) {
  return axios.delete(`/Gebyr/${id}`);
}
