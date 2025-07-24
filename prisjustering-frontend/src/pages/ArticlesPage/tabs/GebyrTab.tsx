// src/components/tabs/GebyrTab.tsx
import { useState } from "react";
import { useMasterData } from "@/hooks/useMasterData";
import {
  useGebyrer,
  useCreateGebyr,
  useUpdateGebyr,
  useDeleteGebyr,
} from "@/hooks/useArticles";
import type { Gebyr } from "@/types/article";
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
import FormField from "@/components/ui/FormField/FormField";

export default function GebyrTab() {
  const { data: master } = useMasterData();
  const { data = [] } = useGebyrer();
  const create = useCreateGebyr();
  const update = useUpdateGebyr();
  const remove = useDeleteGebyr();

  const enheter = master?.enheter || [];

  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Gebyr>>({
    artikkeltekstInternt: "",
    enhetId: undefined,
    notat: "",
    aktiv: true,
  });

  const reset = () => {
    setForm({
      artikkeltekstInternt: "",
      enhetId: undefined,
      notat: "",
      aktiv: true,
    });
    setEditId(null);
  };

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const renderForm = () => (
    <div className="space-y-2">
      <Input
        placeholder="Navn *"
        value={form.artikkeltekstInternt || ""}
        onChange={(e) => handleChange("artikkeltekstInternt", e.target.value)}
      />
      <FormField label="Enhet">
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
      </FormField>
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
    </div>
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Nytt gebyr</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Legg til gebyr</DialogTitle>
          </DialogHeader>
          {renderForm()}
          <DialogFooter>
            <Button
              onClick={async () => {
                await create.mutateAsync(form);
                reset();
              }}
              disabled={!form.artikkeltekstInternt || !form.enhetId}
            >
              Lagre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable<Gebyr>
        columns={[
          { key: "gebyrId", label: "ID" },
          { key: "artikkeltekstInternt", label: "Navn" },
          { key: "enhetId", label: "Enhet" },
          { key: "notat", label: "Notat" },
          { key: "aktiv", label: "Aktiv" },
        ]}
        data={data}
        getRowId={(r) => r.gebyrId}
        renderCell={(row, key) => {
          if (key === "aktiv") return row.aktiv ? "✅" : "–";
          if (key === "enhetId")
            return enheter.find((e) => e.enhetId === row.enhetId)?.navn || "–";
          return row[key as keyof Gebyr] ?? "–";
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
                      enhetId: item.enhetId,
                      notat: item.notat || "",
                      aktiv: item.aktiv,
                    });
                    setEditId(item.gebyrId);
                  }}
                >
                  Rediger
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rediger gebyr</DialogTitle>
                </DialogHeader>
                {renderForm()}
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (editId !== null) {
                        await update.mutateAsync({ id: editId, data: form });
                        reset();
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
                    await remove.mutateAsync(item.gebyrId);
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
