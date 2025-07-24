//article.ts

export interface Fraksjon {
  fraksjonId: number;
  artikkeltekstInternt: string;
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
  artikkeltekstInternt: string;
  varenummerInternt?: string;
  enhetId: number;
  leverandorId?: number;
  containerTypeId?: number;
  containerId?: number;
  transportorId?: number;
  erUtstyr: boolean;
  erTjeneste: boolean;
  notat?: string;
  aktiv: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Salgsvare {
  salgsvareId: number;
  artikkeltekstInternt: string;
  artikkeltekstOg?: string;
  artikkeltekstLeverandor?: string;
  transportorId?: number;
  enhetId: number;
  notat?: string;
  aktiv: boolean;
  erTjeneste: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Gebyr {
  gebyrId: number;
  artikkeltekstInternt: string;
  varenummerInternt?: string;
  enhetId: number;
  notat?: string;
  aktiv: boolean;
  createdAt: string;
  updatedAt?: string;
}
