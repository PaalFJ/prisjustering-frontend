// src/components/grunndata/LeverandorSelect.tsx

import React from "react";
import type { Leverandor } from "../../types/masterData";
import { useMasterData } from "../../hooks/useMasterData";

/**
 * Props for LeverandorSelect
 * @param value – ID til valgt leverandør, eller undefined
 * @param onChange – Callback som tar den nye valgt ID
 */
interface Props {
  value?: number;
  onChange: (selectedId: number) => void;
}

/**
 * LeverandorSelect
 *
 * En dropdown-komponent som viser alle leverandører.
 * Henter data via useMasterData-hooken, håndterer loading og error.
 */
export const LeverandorSelect: React.FC<Props> = ({ value, onChange }) => {
  const { data, loading, error } = useMasterData();

  if (loading) {
    return <p>Laster leverandører...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Feil ved lasting: {error}</p>;
  }

  const leverandorer: Leverandor[] = data!.leverandorer;

  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Velg leverandør"
    >
      <option value="" disabled>
        -- Velg leverandør --
      </option>
      {leverandorer.map((l) => (
        <option key={l.leverandorId} value={l.leverandorId}>
          {l.navn}
        </option>
      ))}
    </select>
  );
};
