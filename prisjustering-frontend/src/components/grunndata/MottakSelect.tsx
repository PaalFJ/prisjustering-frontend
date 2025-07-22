// src/components/grunndata/MottakSelect.tsx

import React from "react";
import type { Mottak } from "../../types/masterData";
import { useMasterData } from "../../hooks/useMasterData";

/**
 * Props for MottakSelect
 * @param value – ID til valgt mottak, eller undefined
 * @param onChange – Callback som tar den nye valgte ID
 */
interface Props {
  value?: number;
  onChange: (selectedId: number) => void;
}

/**
 * MottakSelect
 *
 * En dropdown-komponent som viser alle mottakssteder.
 * Henter data via useMasterData-hooken, håndterer loading og error.
 */
export const MottakSelect: React.FC<Props> = ({ value, onChange }) => {
  const { data, loading, error } = useMasterData();

  if (loading) {
    return <p>Laster mottakssteder…</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Feil ved lasting: {error}</p>;
  }

  const mottakListe: Mottak[] = data!.mottak;

  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Velg mottak"
    >
      <option value="" disabled>
        -- Velg mottak --
      </option>
      {mottakListe.map((m) => (
        <option key={m.mottakId} value={m.mottakId}>
          {m.navn}
        </option>
      ))}
    </select>
  );
};
