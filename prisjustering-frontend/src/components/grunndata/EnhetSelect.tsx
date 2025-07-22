// src/components/grunndata/EnhetSelect.tsx

import React from "react";
import type { Enhet } from "../../types/masterData";
import { useMasterData } from "../../hooks/useMasterData";

/**
 * Props for EnhetSelect
 * @param value – ID til valgt enhet, eller undefined
 * @param onChange – Callback som tar den nye valgt ID
 */
interface Props {
  value?: number;
  onChange: (selectedId: number) => void;
}

/**
 * EnhetSelect
 *
 * En dropdown-komponent som viser alle enheter.
 * Henter data via useMasterData-hooken, håndterer loading og error.
 */
export const EnhetSelect: React.FC<Props> = ({ value, onChange }) => {
  const { data, loading, error } = useMasterData();

  if (loading) {
    return <p>Laster enheter...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Feil ved lasting: {error}</p>;
  }

  const enheter: Enhet[] = data!.enheter;

  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Velg enhet"
    >
      <option value="" disabled>
        -- Velg enhet --
      </option>
      {enheter.map((e) => (
        <option key={e.enhetId} value={e.enhetId}>
          {e.navn}
        </option>
      ))}
    </select>
  );
};
