// src/components/grunndata/TransportorSelect.tsx

import React from "react";
import type { Transportor } from "../../types/masterData";
import { useMasterData } from "../../hooks/useMasterData";

/**
 * Props for TransportorSelect
 * @param value – ID til valgt transportør, eller undefined
 * @param onChange – Callback som tar den nye valgt ID
 */
interface Props {
  value?: number;
  onChange: (selectedId: number) => void;
}

/**
 * TransportorSelect
 *
 * En dropdown-komponent som viser alle transportører.
 * Henter data via useMasterData-hooken, håndterer loading og error.
 */
export const TransportorSelect: React.FC<Props> = ({ value, onChange }) => {
  const { data, loading, error } = useMasterData();

  if (loading) {
    return <p>Laster transportører...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Feil ved lasting: {error}</p>;
  }

  const transportorer: Transportor[] = data!.transportorer;

  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Velg transportør"
    >
      <option value="" disabled>
        -- Velg transportør --
      </option>
      {transportorer.map((t) => (
        <option key={t.transportorId} value={t.transportorId}>
          {t.navn}
        </option>
      ))}
    </select>
  );
};
