// src/pages/PriceListPage/tabs/FraksjonTab.tsx
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/shadcn/select";
import { Checkbox } from "@/components/shadcn/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/shadcn/accordion";
import { useMasterData } from "@/hooks/useMasterData";
import { useFraksjoner } from "@/hooks/useArticles";
import {
  usePrislinjer,
  useCreatePrislinje,
  useUpdatePrislinje,
  useDeletePrislinje,
} from "@/hooks/usePrislinjer";
import { format } from "date-fns";
import DataTable from "@/components/ui/DataTable/DataTable";
import { DatePicker } from "@/components/ui/DatePicker";

const kostnadsnavn: Record<string, string> = {
  prisLeverandor: "Leverandør",
  prisOmlasting: "Omlasting",
  prisPressing: "Pressing",
  prisSortering: "Sortering",
  prisKverning: "Kverning",
  prisBomavgift: "Bomavgift",
  prisStatsavgift: "Statsavgift",
  prisTransportSluttbehandling: "Transport sluttbehandling",
  andreKostnader: "Andre kostnader",
};

export default function FraksjonTab() {
  const { data: master } = useMasterData();
  const { data: fraksjoner = [] } = useFraksjoner();
  const { data: prislinjer = [] } = usePrislinjer("fraksjon");
  const create = useCreatePrislinje();
  const update = useUpdatePrislinje();
  const remove = useDeletePrislinje();

  const initialForm = {
    fraksjonsgruppeId: 0,
    fraksjonId: 0,
    mottakId: 0,
    kostnader: {
      prisLeverandor: 0,
      prisOmlasting: 0,
      prisPressing: 0,
      prisSortering: 0,
      prisKverning: 0,
      prisBomavgift: 0,
      prisStatsavgift: 0,
      prisTransportSluttbehandling: 0,
      andreKostnader: 0,
    },
    aktivert: [] as string[],
    administrasjonsProsent: 10,
    brukProsent: false,
    veiledendeProsent: 20,
    veiledendePris: 0,
    brukManuell: false,
    kommentar: "",
    notat: "",
    startDato: new Date(),
    sluttDato: undefined as Date | undefined,
  };
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const kostnadsnøkler = Object.keys(
    form.kostnader
  ) as (keyof typeof form.kostnader)[];
  const sumKostpris1 = kostnadsnøkler.reduce(
    (sum, key) =>
      form.aktivert.includes(key) ? sum + (form.kostnader[key] || 0) : sum,
    0
  );
  const admPris = sumKostpris1 * (form.administrasjonsProsent / 100);
  const kostpris2 = sumKostpris1 + admPris;
  const veiledende = form.brukManuell
    ? form.veiledendePris
    : kostpris2 * (form.brukProsent ? 1 + form.veiledendeProsent / 100 : 1.2);

  const handleChange = (key: string, val: any) =>
    setForm((prev) => ({ ...prev, [key]: val }));
  const handleCostChange = (key: keyof typeof form.kostnader, val: number) =>
    setForm((prev) => ({
      ...prev,
      kostnader: { ...prev.kostnader, [key]: val },
    }));
  const handleToggle = (key: keyof typeof form.kostnader) =>
    setForm((prev) => ({
      ...prev,
      aktivert: prev.aktivert.includes(key)
        ? prev.aktivert.filter((k) => k !== key)
        : [...prev.aktivert, key],
    }));

  const reset = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      kostpris1: sumKostpris1,
      administrasjonsPris: admPris,
      kostpris2,
      veiledendePris: veiledende,
      brukProsentbasertVeiledendePris: form.brukProsent,
      brukManuellVeiledendePris: form.brukManuell,
      startDato: form.startDato.toISOString(),
      sluttDato: form.sluttDato?.toISOString(),
    };
    if (editId) await update.mutateAsync({ id: editId, data: payload });
    else await create.mutateAsync(payload);
    reset();
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Ny prislinje</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Prislinje - Fraksjon</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            {/* Dropdowns */}
            <Dropdown
              label="Fraksjonsgruppe"
              value={form.fraksjonsgruppeId}
              options={master?.fraksjonsgrupper || []}
              getLabel={(x) => x.navn}
              getValue={(x) => x.fraksjonsgruppeId}
              onChange={(val) => handleChange("fraksjonsgruppeId", val)}
            />
            <Dropdown
              label="Fraksjon"
              value={form.fraksjonId}
              options={
                fraksjoner.filter(
                  (f) => f.fraksjonsgruppeId === form.fraksjonsgruppeId
                ) || []
              }
              getLabel={(x) => x.artikkeltekstInternt}
              getValue={(x) => x.fraksjonId}
              onChange={(val) => handleChange("fraksjonId", val)}
            />
            <Dropdown
              label="Mottak"
              value={form.mottakId}
              options={master?.mottak || []}
              getLabel={(x) => x.navn}
              getValue={(x) => x.mottakId}
              onChange={(val) => handleChange("mottakId", val)}
            />
            <DatePicker
              date={form.startDato}
              setDate={(d) => handleChange("startDato", d)}
              label="Startdato *"
            />
            <DatePicker
              date={form.sluttDato}
              setDate={(d) => handleChange("sluttDato", d)}
              label="Sluttdato"
            />

            {/* Accordion med kostnader */}
            <div className="col-span-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="kostnader">
                  <AccordionTrigger>Kostnadskomponenter</AccordionTrigger>
                  <AccordionContent className="pt-2 grid grid-cols-2 gap-2">
                    {kostnadsnøkler.map((k) => (
                      <div key={k} className="flex items-center gap-2">
                        <Checkbox
                          checked={form.aktivert.includes(k)}
                          onCheckedChange={() => handleToggle(k)}
                        />
                        <span className="w-56">{kostnadsnavn[k]}</span>
                        <Input
                          type="number"
                          className="ml-auto max-w-[100px]"
                          value={form.kostnader[k]}
                          onChange={(e) =>
                            handleCostChange(k, parseFloat(e.target.value))
                          }
                        />
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Frie felter */}
            <Field
              label="Kommentar"
              value={form.kommentar}
              onChange={(v) => handleChange("kommentar", v)}
            />
            <Field
              label="Notat"
              value={form.notat}
              onChange={(v) => handleChange("notat", v)}
            />
            <Field
              label="Administrasjon (%)"
              type="number"
              value={form.administrasjonsProsent}
              onChange={(v) =>
                handleChange("administrasjonsProsent", parseFloat(v))
              }
            />

            {/* Veiledende */}
            <div>
              <label>Veiledende % (hvis prosent)</label>
              <Input
                type="number"
                value={form.veiledendeProsent}
                onChange={(e) =>
                  handleChange("veiledendeProsent", parseFloat(e.target.value))
                }
              />
              <div className="mt-1 space-x-2">
                <Checkbox
                  checked={form.brukProsent}
                  onCheckedChange={() =>
                    handleChange("brukProsent", !form.brukProsent)
                  }
                >
                  Bruk prosentbasert
                </Checkbox>
                <Checkbox
                  checked={form.brukManuell}
                  onCheckedChange={() =>
                    handleChange("brukManuell", !form.brukManuell)
                  }
                >
                  Overstyr manuell pris
                </Checkbox>
              </div>
              {form.brukManuell && (
                <Input
                  className="mt-2"
                  type="number"
                  value={form.veiledendePris}
                  onChange={(e) =>
                    handleChange("veiledendePris", parseFloat(e.target.value))
                  }
                />
              )}
            </div>

            {/* Oppsummering */}
            <div className="col-span-2 bg-muted p-4 rounded-xl">
              <p>
                <b>Kostpris1:</b> {sumKostpris1.toFixed(2)} kr
              </p>
              <p>
                <b>Administrasjon:</b> {admPris.toFixed(2)} kr
              </p>
              <p>
                <b>Kostpris2:</b> {kostpris2.toFixed(2)} kr
              </p>
              <p>
                <b>Veiledende pris:</b> {veiledende.toFixed(2)} kr
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={reset}>
              Avbryt
            </Button>
            <Button onClick={handleSave}>
              {editId ? "Oppdater" : "Lagre"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={[
          { key: "prislinjeId", label: "ID" },
          { key: "fraksjon.artikkeltekstInternt", label: "Fraksjon" },
          { key: "mottak.navn", label: "Mottak" },
          { key: "kostpris1", label: "Kostpris1" },
          { key: "kostpris2", label: "Kostpris2" },
          { key: "veiledendePris", label: "Veiledende pris" },
        ]}
        data={prislinjer}
        getRowId={(r) => r.prislinjeId}
        renderCell={(row, key) => {
          const r = row as any;
          if (["kostpris1", "kostpris2", "veiledendePris"].includes(key))
            return r[key]?.toFixed(2) + " kr";
          if (key.includes(".")) {
            const [p, c] = key.split(".");
            return r[p]?.[c] ?? "–";
          }
          return r[key];
        }}
        renderActions={(row) => {
          const r = row as any;
          const valgtG = fraksjoner.find((f) => f.fraksjonId === r.fraksjonId);
          const grpId = valgtG?.fraksjonsgruppeId || 0;
          const alle = kostnadsnøkler.reduce(
            (a, k) => ((a[k] = r[k] || 0), a),
            {} as typeof initialForm.kostnader
          );
          const akt = kostnadsnøkler.filter((k) => r[k] > 0);
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  setForm({
                    ...initialForm,
                    fraksjonsgruppeId: grpId,
                    fraksjonId: r.fraksjonId,
                    mottakId: r.mottakId,
                    kostnader: alle,
                    aktivert: akt,
                    administrasjonsProsent: r.administrasjonsProsent,
                    brukProsent: r.brukProsentbasertVeiledendePris,
                    brukManuell: r.brukManuellVeiledendePris,
                    veiledendeProsent: r.veiledendeProsent,
                    veiledendePris: r.veiledendePris,
                    kommentar: r.kommentar,
                    notat: r.notat,
                    startDato: new Date(r.startDato),
                    sluttDato: r.sluttDato ? new Date(r.sluttDato) : undefined,
                  });
                  setEditId(r.prislinjeId);
                  setDialogOpen(true);
                }}
              >
                Rediger
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => remove.mutate(r.prislinjeId)}
              >
                Slett
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}

// Feltskjema-komponent
function Field({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: any;
  type?: string;
  onChange: (v: any) => void;
}) {
  return (
    <div>
      <label>{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Dropdown-komponent
function Dropdown<T>({
  label,
  value,
  options,
  getLabel,
  getValue,
  onChange,
}: {
  label: string;
  value: number;
  options: T[];
  getLabel: (x: T) => string;
  getValue: (x: T) => number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label>{label}</label>
      <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
        <SelectTrigger>
          <SelectValue placeholder={`Velg ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={getValue(opt)} value={String(getValue(opt))}>
              {getLabel(opt)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
