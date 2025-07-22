// src/services/masterData.ts

import axios from "@/lib/axios";
import {
  type Fraksjonsgruppe,
  type Enhet,
  type Leverandor,
  type Transportor,
  type ContainerType,
  type Mottak,
  type Behandlingsmetode,
  type Container,
} from "../types/masterData";

// Hjelpefunksjoner
async function fetchList<T>(path: string): Promise<T[]> {
  const res = await axios.get<T[]>(`/${path}`);
  return res.data;
}
async function postItem<T>(path: string, body: Partial<T>): Promise<T> {
  const res = await axios.post<T>(`/${path}`, body);
  return res.data;
}
async function putItem<T extends { [key: string]: any }>(
  path: string,
  id: number,
  body: Partial<T>
): Promise<T> {
  const fullBody = { ...body, id }; // legger til id
  const res = await axios.put<T>(`/${path}/${id}`, fullBody);
  return res.data;
}
async function deleteItem(path: string, id: number): Promise<void> {
  await axios.delete(`/${path}/${id}`);
}

// ----- Fraksjonsgruppe -----
export const fetchFraksjonsgrupper = () =>
  fetchList<Fraksjonsgruppe>("Fraksjonsgruppe");
export const createFraksjonsgruppe = (data: Partial<Fraksjonsgruppe>) =>
  postItem<Fraksjonsgruppe>("Fraksjonsgruppe", data);
export const updateFraksjonsgruppe = (
  id: number,
  data: Partial<Fraksjonsgruppe>
) =>
  putItem<Fraksjonsgruppe>("Fraksjonsgruppe", id, {
    ...data,
    fraksjonsgruppeId: id, // <- nødvendig
  });
export const deleteFraksjonsgruppe = (id: number) =>
  deleteItem("Fraksjonsgruppe", id);

// ----- Enhet -----
export const fetchEnheter = () => fetchList<Enhet>("Enhet");
export const createEnhet = (data: Partial<Enhet>) =>
  postItem<Enhet>("Enhet", data);
export const updateEnhet = (id: number, data: Partial<Enhet>) =>
  putItem<Enhet>("Enhet", id, {
    ...data,
    enhetId: id, // ← viktig!
  });
export const deleteEnhet = (id: number) => deleteItem("Enhet", id);

// ----- Leverandør -----
export const fetchLeverandorer = () => fetchList<Leverandor>("Leverandor");
export const createLeverandor = (data: Partial<Leverandor>) =>
  postItem<Leverandor>("Leverandor", data);
export const updateLeverandor = (id: number, data: Partial<Leverandor>) =>
  putItem<Leverandor>("Leverandor", id, data);
export const deleteLeverandor = (id: number) => deleteItem("Leverandor", id);

// ----- Transportør -----
export const fetchTransportorer = () => fetchList<Transportor>("Transportor");
export const createTransportor = (data: Partial<Transportor>) =>
  postItem<Transportor>("Transportor", data);
export const updateTransportor = (id: number, data: Partial<Transportor>) =>
  putItem<Transportor>("Transportor", id, data);
export const deleteTransportor = (id: number) => deleteItem("Transportor", id);

// ----- ContainerType -----
export const fetchContainerTyper = () =>
  fetchList<ContainerType>("ContainerType");
export const createContainerType = (data: Partial<ContainerType>) =>
  postItem<ContainerType>("ContainerType", data);
export const updateContainerType = (id: number, data: Partial<ContainerType>) =>
  putItem<ContainerType>("ContainerType", id, data);
export const deleteContainerType = (id: number) =>
  deleteItem("ContainerType", id);

// ----- Mottak -----
export const fetchMottak = () => fetchList<Mottak>("Mottak");
export const createMottak = (data: Partial<Mottak>) =>
  postItem<Mottak>("Mottak", data);
export const updateMottak = (id: number, data: Partial<Mottak>) =>
  putItem<Mottak>("Mottak", id, data);
export const deleteMottak = (id: number) => deleteItem("Mottak", id);

// ----- Behandlingsmetode -----
export const fetchBehandlingsmetoder = () =>
  fetchList<Behandlingsmetode>("Behandlingsmetode");
export const createBehandlingsmetode = (data: Partial<Behandlingsmetode>) =>
  postItem<Behandlingsmetode>("Behandlingsmetode", data);
export const updateBehandlingsmetode = (
  id: number,
  data: Partial<Behandlingsmetode>
) =>
  putItem<Behandlingsmetode>("Behandlingsmetode", id, {
    ...data,
    behandlingsMetodeId: id,
  });
export const deleteBehandlingsmetode = (id: number) =>
  deleteItem("Behandlingsmetode", id);

// ----- Container -----

export async function fetchContainere() {
  const res = await axios.get("/Container");
  return res.data;
}

export async function createContainer(data: Partial<Container>) {
  const res = await axios.post("/Container", data);
  return res.data;
}

export async function updateContainer(id: number, data: Partial<Container>) {
  const res = await axios.put(`/Container/${id}`, { ...data, containerId: id });
  return res.data;
}

export async function deleteContainer(id: number) {
  await axios.delete(`/Container/${id}`);
}

// ----- Alle masterdata samtidig -----
export async function fetchAllMasterData() {
  const [
    fraksjonsgrupper,
    enheter,
    leverandorer,
    transportorer,
    containerTyper,
    mottak,
    behandlingsmetoder,
    containere,
  ] = await Promise.all([
    fetchFraksjonsgrupper(),
    fetchEnheter(),
    fetchLeverandorer(),
    fetchTransportorer(),
    fetchContainerTyper(),
    fetchMottak(),
    fetchBehandlingsmetoder(),
    fetchContainere(),
  ]);

  return {
    fraksjonsgrupper,
    enheter,
    leverandorer,
    transportorer,
    containerTyper,
    mottak,
    behandlingsmetoder,
    containere,
  };
}
