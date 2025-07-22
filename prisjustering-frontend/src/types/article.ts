// src/types/article.ts

export interface Fraksjon {
  fraksjonId: number;
  navn: string;
  varenummerInternt?: string;
  varenummerNS?: string;
  fraksjonsgruppeId: number;
  behandlingsmetodeId?: number;
  enhetId: number;
  farligAvfall: boolean;
  aktiv: boolean;
  notat?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Leie {
  leieId: number;
  navn: string;
  enhetId: number;
  leverandorId?: number;
  containerTypeId?: number;
  containerId?: number;
  notat?: string;
  aktiv: boolean;
  createdAt: string;
  updatedAt?: string;
}
