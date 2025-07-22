// src/components/grunndata/ContainerTypeSelect.tsx

import React from "react";
import type { ContainerType } from "../../types/masterData";
import { useMasterData } from "../../hooks/useMasterData";

/**
 * Props for ContainerTypeSelect
 * @param value – ID til valgt container-type, eller undefined
 * @param onChange – Callback som tar den nye valgt ID
 */
interface Props {
  value?: number;
  onChange: (selectedId: number) => void;
}

/**
 * ContainerTypeSelect
 *
 * En dropdown-komponent som viser alle container-typer.
 * Henter data via useMasterData-hooken, håndterer loading og error.
 */
export const ContainerTypeSelect: React.FC<Props> = ({ value, onChange }) => {
  const { data, loading, error } = useMasterData();

  if (loading) {
    return <p>Laster container-typer...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Feil ved lasting: {error}</p>;
  }

  const containerTyper: ContainerType[] = data!.containerTyper;

  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Velg container-type"
    >
      <option value="" disabled>
        -- Velg container-type --
      </option>
      {containerTyper.map((c) => (
        <option key={c.containerTypeId} value={c.containerTypeId}>
          {c.navn}
        </option>
      ))}
    </select>
  );
};
