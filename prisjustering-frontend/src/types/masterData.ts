// **************** src/types/masterData.ts ****************

/**
 * Represents a Fraksjonsgruppe (waste fraction group).
 */
export interface Fraksjonsgruppe {
  fraksjonsgruppeId: number; // Unique identifier for the group
  navn: string; // Name of the fraction group
  createdAt: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update (optional)
}

/**
 * Represents an Enhet (unit of measurement).
 */
export interface Enhet {
  enhetId: number; // Unique identifier for the unit
  navn: string; // Name of the unit (e.g., kg, tonn)
  createdAt: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update (optional)
}

/**
 * Represents a Leverandor (supplier).
 */
export interface Leverandor {
  leverandorId: number; // Unique identifier for the supplier
  navn: string; // Name of the supplier
  notat?: string; // Optional notes about the supplier
  createdAt: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update (optional)
}

/**
 * Represents a Transportor (transport company).
 */
export interface Transportor {
  transportorId: number; // Unique identifier for the transporter
  navn: string; // Name of the transport company
  notat?: string; // Optional notes about the transporter
  createdAt: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update (optional)
}

/**
 * Represents a ContainerType (type of container).
 */
export interface ContainerType {
  containerTypeId: number; // Unique identifier for the container type
  navn: string; // Name of the container type
  createdAt: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update (optional)
}

/**
 * Represents a Mottak (reception site).
 */
export interface Mottak {
  mottakId: number; // Unique identifier for the reception site
  navn: string; // Name of the reception site
  adresse?: string; // Optional address of the site
  postnummer?: string; // Optional postal code
  sted?: string; // Optional city or location
  createdAt: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update (optional)
}

export interface Behandlingsmetode {
  behandlingsMetodeId: number; // Unique ID
  navn: string; // Name (e.g., "Forbrenning", "Gjenvinning")
  createdAt: string; // ISO timestamp of creation
  updatedAt?: string; // Optional ISO timestamp of last update
}

export interface Container {
  containerId: number;
  navn: string;
  containerTypeId: number;
  containerType?: ContainerType;
  notat?: string;
  aktiv: boolean;
  volum?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface MasterData {
  enheter: Enhet[];
  leverandorer: Leverandor[];
  transportorer: Transportor[];
  mottak: Mottak[];
  containerTyper: ContainerType[];
  fraksjonsgrupper: Fraksjonsgruppe[];
  containere: Container[]; // 👈 LEGG TIL DENNE
}
