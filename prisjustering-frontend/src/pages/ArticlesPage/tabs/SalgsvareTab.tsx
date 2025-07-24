// ✅ SalgsvareTab med toggle for Tjeneste/Vare med beskrivelse

import { useState } from "react";
import { useMasterData } from "@/hooks/useMasterData";
import {
  useSalgsvare,
  useCreateSalgsvare,
  useUpdateSalgsvare,
  useDeleteSalgsvare,
} from "@/hooks/useArticles";
import type { Salgsvare } from "@/types/article";
import DataTable from "@/components/ui/DataTable/DataTable";
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
import { Textarea } from "@/components/shadcn/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Switch } from "@/components/shadcn/switch";

export default function SalgsvareTab() {
  const { data: master } = useMasterData();
  const { data = [] } = useSalgsvare();
  const create = useCreateSalgsvare();
  const update = useUpdateSalgsvare();
  const remove = useDeleteSalgsvare();

  const enheter = master?.enheter || [];
  const transportorer = master?.transportorer || [];

  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Salgsvare>>({
    artikkeltekstInternt: "",
    artikkeltekstOg: "",
    artikkeltekstLeverandor: "",
    transportorId: undefined,
    enhetId: undefined,
    notat: "",
    aktiv: true,
    erTjeneste: false,
  });

  const resetForm = () => {
    setForm({
      artikkeltekstInternt: "",
      artikkeltekstOg: "",
      artikkeltekstLeverandor: "",
      transportorId: undefined,
      enhetId: undefined,
      notat: "",
      aktiv: true,
      erTjeneste: false,
    });
    setEditId(null);
  };

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const renderFormFields = () => (
    <div className="space-y-2">
      <Input
        placeholder="Artikkeltekst internt *"
        value={form.artikkeltekstInternt || ""}
        onChange={(e) => handleChange("artikkeltekstInternt", e.target.value)}
      />
      <Input
        placeholder="Artikkeltekst ØG"
        value={form.artikkeltekstOg || ""}
        onChange={(e) => handleChange("artikkeltekstOg", e.target.value)}
      />
      <Input
        placeholder="Artikkeltekst leverandør"
        value={form.artikkeltekstLeverandor || ""}
        onChange={(e) =>
          handleChange("artikkeltekstLeverandor", e.target.value)
        }
      />
      <Select
        value={form.transportorId?.toString() ?? ""}
        onValueChange={(val) => handleChange("transportorId", parseInt(val))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Velg transportør" />
        </SelectTrigger>
        <SelectContent>
          {transportorer.map((t) => (
            <SelectItem
              key={t.transportorId}
              value={t.transportorId.toString()}
            >
              {t.navn}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={form.enhetId?.toString() ?? ""}
        onValueChange={(val) => handleChange("enhetId", parseInt(val))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Velg enhet *" />
        </SelectTrigger>
        <SelectContent>
          {enheter.map((e) => (
            <SelectItem key={e.enhetId} value={e.enhetId.toString()}>
              {e.navn}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Notat"
        value={form.notat || ""}
        onChange={(e) => handleChange("notat", e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Checkbox
          checked={form.aktiv ?? true}
          onCheckedChange={(val) => handleChange("aktiv", val === true)}
        />
        <label>Aktiv</label>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {form.erTjeneste ? "Tjeneste" : "Vare"}
          </span>
          <Switch
            checked={form.erTjeneste ?? false}
            onCheckedChange={(val) => handleChange("erTjeneste", val === true)}
          />
        </div>
        <p className="text-xs text-gray-500">
          Endre bryteren for å markere artikkelen som tjeneste.
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ny salgsartikkel</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny salgsartikkel</DialogTitle>
          </DialogHeader>
          {renderFormFields()}
          <DialogFooter>
            <Button
              onClick={async () => {
                await create.mutateAsync(form);
                resetForm();
              }}
              disabled={!form.artikkeltekstInternt || !form.enhetId}
            >
              Lagre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable<Salgsvare>
        columns={[
          { key: "salgsvareId", label: "ID" },
          { key: "artikkeltekstInternt", label: "Navn" },
          { key: "artikkeltekstOg", label: "Tekst ØG" },
          { key: "artikkeltekstLeverandor", label: "Tekst leverandør" },
          { key: "transportorId", label: "Transportør" },
          { key: "enhetId", label: "Enhet" },
          { key: "aktiv", label: "Aktiv" },
          { key: "erTjeneste", label: "Tjeneste" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={data}
        getRowId={(row) => row.salgsvareId}
        renderCell={(row, key) => {
          if (key === "aktiv" || key === "erTjeneste")
            return row[key] ? "✅" : "–";
          if (key === "transportorId")
            return (
              transportorer.find((t) => t.transportorId === row.transportorId)
                ?.navn || "–"
            );
          if (key === "enhetId")
            return enheter.find((e) => e.enhetId === row.enhetId)?.navn || "–";
          return row[key as keyof Salgsvare] ?? "–";
        }}
        renderActions={(item) => (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setForm({
                      artikkeltekstInternt: item.artikkeltekstInternt,
                      artikkeltekstOg: item.artikkeltekstOg || "",
                      artikkeltekstLeverandor:
                        item.artikkeltekstLeverandor || "",
                      transportorId: item.transportorId ?? undefined,
                      enhetId: item.enhetId,
                      notat: item.notat || "",
                      aktiv: item.aktiv,
                      erTjeneste: item.erTjeneste,
                    });
                    setEditId(item.salgsvareId);
                  }}
                >
                  Rediger
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rediger salgsartikkel</DialogTitle>
                </DialogHeader>
                {renderFormFields()}
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (editId !== null) {
                        await update.mutateAsync({ id: editId, data: form });
                        resetForm();
                      }
                    }}
                    disabled={!form.artikkeltekstInternt || !form.enhetId}
                  >
                    Oppdater
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                if (confirm(`Slette "${item.artikkeltekstInternt}"?`)) {
                  try {
                    await remove.mutateAsync(item.salgsvareId);
                  } catch (err: any) {
                    alert("Feil ved sletting");
                    console.error(err);
                  }
                }
              }}
            >
              Slett
            </Button>
          </>
        )}
      />
    </div>
  );
}
