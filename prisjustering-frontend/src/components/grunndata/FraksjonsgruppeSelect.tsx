// src/components/grunndata/FraksjonsgruppeSelect.tsx

import React from "react";
import type { Fraksjonsgruppe } from "../../types/masterData";
import { useMasterData } from "../../hooks/useMasterData";

/**
 * Props for FraksjonsgruppeSelect
 * @param value – ID til valgt fraksjonsgruppe, eller undefined
 * @param onChange – Callback som tar den nye valgt ID
 */
interface Props {
  value?: number;
  onChange: (selectedId: number) => void;
}

/**
 * FraksjonsgruppeSelect
 *
 * En dropdown-komponent som viser alle fraksjonsgrupper.
 * Henter data via useMasterData-hooken, håndterer loading og error.
 */
export const FraksjonsgruppeSelect: React.FC<Props> = ({ value, onChange }) => {
  const { data, loading, error } = useMasterData();

  if (loading) {
    return <p>Laster fraksjonsgrupper...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Feil ved lasting: {error}</p>;
  }

  // Data er ikke null når vi kommer hit
  const fraksjonsgrupper: Fraksjonsgruppe[] = data!.fraksjonsgrupper;

  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Velg fraksjonsgruppe"
    >
      <option value="" disabled>
        -- Velg fraksjonsgruppe --
      </option>
      {fraksjonsgrupper.map((g) => (
        <option key={g.fraksjonsgruppeId} value={g.fraksjonsgruppeId}>
          {g.navn}
        </option>
      ))}
    </select>
  );
};
