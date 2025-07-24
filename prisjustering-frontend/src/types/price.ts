// src/types/price.ts
export interface Prislinje {
  prislinjeId: number;
  fraksjonId?: number;
  fraksjon?: { navn: string };
  leieId?: number;
  leie?: any;
  mottakId: number;
  mottak?: { navn: string };

  prisLeverandor?: number;
  prisOmlasting?: number;
  prisPressing?: number;
  prisSortering?: number;
  prisKverning?: number;
  prisBomavgift?: number;
  prisStatsavgift?: number;
  prisTransportSluttbehandling?: number;
  andreKostnader?: number;

  kostpris1: number;
  administrasjonsProsent: number;
  administrasjonsPris: number;
  kostpris2: number;

  brukManuellVeiledendePris: boolean;
  brukProsentbasertVeiledendePris: boolean;
  veiledendeProsent: number;
  veiledendePris: number;

  kommentar?: string;
  notat?: string;

  startDato: string;
  sluttDato?: string;

  createdAt: string;
  updatedAt?: string;
}
