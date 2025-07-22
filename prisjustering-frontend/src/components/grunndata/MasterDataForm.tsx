// src/components/grunndata/MasterDataForm.tsx

import React, { useState } from "react";

import {FraksjonsgruppeSelect, EnhetSelect, LeverandorSelect, TransportorSelect, ContainerTypeSelect} from "src/components/grunndata/index"
/**
 * MasterDataForm
 *
 * En test-skjema som bruker alle grunndata-select-komponentene.
 * Når skjema sendes inn, vises valgene i en alert og logges i konsollen.
 */
export const MasterDataForm: React.FC = () => {
  // State for valgt fraksjonsgruppe
  const [fraksjonsgruppeId, setFraksjonsgruppeId] = useState<number | undefined>(undefined);
  // State for valgt enhet
  const [enhetId, setEnhetId] = useState<number | undefined>(undefined);
  // State for valgt leverandør
  const [leverandorId, setLeverandorId] = useState<number | undefined>(undefined);
  // State for valgt transportør
  const [transportorId, setTransportorId] = useState<number | undefined>(undefined);
  // State for valgt container-type
  const [containerTypeId, setContainerTypeId] = useState<number | undefined>(undefined);

  /**
   * handleSubmit
   *
   * Kalles når brukeren sender inn skjemaet.
   * Logger valgene og viser dem i en alert.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values = {
      fraksjonsgruppeId,
      enhetId,
      leverandorId,
      transportorId,
      containerTypeId,
    };
    console.log("Valgte masterdata:", values);
    alert(
      `Valgte:
  Fraksjonsgruppe: ${fraksjonsgruppeId}
  Enhet: ${enhetId}
  Leverandør: ${leverandorId}
  Transportør: ${transportorId}
  ContainerType: ${containerTypeId}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="fraksjonsgruppe">
          Fraksjonsgruppe:
          <FraksjonsgruppeSelect
            value={fraksjonsgruppeId}
            onChange={setFraksjonsgruppeId}
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="enhet">
          Enhet:
          <EnhetSelect value={enhetId} onChange={setEnhetId} />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="leverandor">
          Leverandør:
          <LeverandorSelect
            value={leverandorId}
            onChange={setLeverandorId}
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="transportor">
          Transportør:
          <TransportorSelect
            value={transportorId}
            onChange={setTransportorId}
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="containerType">
          Container-type:
          <ContainerTypeSelect
            value={containerTypeId}
            onChange={setContainerTypeId}
          />
        </label>
      </div>
      <button type="submit">Test valg</button>
    </form>
  );
};