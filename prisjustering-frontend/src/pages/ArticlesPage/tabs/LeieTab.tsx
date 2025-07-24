// LeieTab.tsx – oppdatert til å bruke artikkeltekstInternt i stedet for navn

import { useState } from "react";
import {
  useLeier,
  useCreateLeie,
  useUpdateLeie,
  useDeleteLeie,
} from "@/hooks/useArticles";
import { useMasterData } from "@/hooks/useMasterData";
import type { Leie } from "@/types/article";
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
import { Checkbox } from "@/components/shadcn/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import FormField from "@/components/ui/FormField/FormField";

export default function LeieTab() {
  const { data: master } = useMasterData();
  const { data = [] } = useLeier();
  const create = useCreateLeie();
  const update = useUpdateLeie();
  const remove = useDeleteLeie();

  const enheter = master?.enheter || [];
  const leverandorer = master?.leverandorer || [];
  const containerTyper = master?.containerTyper || [];
  const containere = master?.containere || [];

  const [form, setForm] = useState({
    artikkeltekstInternt: "",
    enhetId: 0,
    leverandorId: 0,
    containerTypeId: 0,
    containerId: 0,
    notat: "",
    aktiv: true,
  });

  const [editId, setEditId] = useState<number | null>(null);

  const filtrerteContainere = containere.filter(
    (c) => c.containerTypeId === form.containerTypeId
  );

  const reset = () => {
    setForm({
      artikkeltekstInternt: "",
      enhetId: 0,
      leverandorId: 0,
      containerTypeId: 0,
      containerId: 0,
      notat: "",
      aktiv: true,
    });
    setEditId(null);
  };

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ny leieartikkel</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny leie</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <FormField label="Navn *">
              <Input
                value={form.artikkeltekstInternt}
                onChange={(e) =>
                  handleChange("artikkeltekstInternt", e.target.value)
                }
              />
            </FormField>
            <FormField label="Enhet">
              <Select
                value={form.enhetId.toString()}
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
            <FormField label="Leverandør">
              <Select
                value={form.leverandorId.toString()}
                onValueChange={(val) =>
                  handleChange("leverandorId", parseInt(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg leverandør" />
                </SelectTrigger>
                <SelectContent>
                  {leverandorer.map((l) => (
                    <SelectItem
                      key={l.leverandorId}
                      value={l.leverandorId.toString()}
                    >
                      {l.navn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Containertype">
              <Select
                value={form.containerTypeId.toString()}
                onValueChange={(val) => {
                  const containerTypeId = parseInt(val);
                  setForm((prev) => ({
                    ...prev,
                    containerTypeId,
                    containerId: 0,
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg containertype" />
                </SelectTrigger>
                <SelectContent>
                  {containerTyper.map((ct) => (
                    <SelectItem
                      key={ct.containerTypeId}
                      value={ct.containerTypeId.toString()}
                    >
                      {ct.navn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Container">
              <Select
                value={form.containerId.toString()}
                onValueChange={(val) =>
                  handleChange("containerId", parseInt(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg container" />
                </SelectTrigger>
                <SelectContent>
                  {filtrerteContainere.map((c) => (
                    <SelectItem
                      key={c.containerId}
                      value={c.containerId.toString()}
                    >
                      {c.navn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filtrerteContainere.length === 0 && (
                <p className="text-sm text-yellow-600">
                  Ingen containere med valgt type
                </p>
              )}
            </FormField>
            <FormField label="Notat">
              <Input
                value={form.notat}
                onChange={(e) => handleChange("notat", e.target.value)}
              />
            </FormField>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={form.aktiv}
                onCheckedChange={(val) => handleChange("aktiv", val === true)}
              />
              <label>Aktiv</label>
            </div>
          </div>
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

      <DataTable<Leie>
        columns={[
          { key: "leieId", label: "ID" },
          { key: "artikkeltekstInternt", label: "Navn" },
          { key: "enhetId", label: "Enhet" },
          { key: "leverandorId", label: "Leverandør" },
          { key: "containerTypeId", label: "Type" },
          { key: "containerId", label: "Container" },
          { key: "notat", label: "Notat" },
          { key: "aktiv", label: "Aktiv" },
        ]}
        data={data}
        getRowId={(r) => r.leieId}
        renderCell={(row, key) => {
          if (key === "aktiv") return row.aktiv ? "✅" : "–";
          if (key === "enhetId")
            return enheter.find((e) => e.enhetId === row.enhetId)?.navn || "–";
          if (key === "leverandorId")
            return (
              leverandorer.find((l) => l.leverandorId === row.leverandorId)
                ?.navn || "–"
            );
          if (key === "containerTypeId")
            return (
              containerTyper.find(
                (ct) => ct.containerTypeId === row.containerTypeId
              )?.navn || "–"
            );
          if (key === "containerId")
            return (
              containere.find((c) => c.containerId === row.containerId)?.navn ||
              "–"
            );
          return String(row[key as keyof Leie] ?? "–");
        }}
        renderActions={(row) => {
          const item = row as Leie;
          return (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setForm({
                      artikkeltekstInternt: item.artikkeltekstInternt,
                      enhetId: item.enhetId || 0,
                      leverandorId: item.leverandorId || 0,
                      containerTypeId: item.containerTypeId || 0,
                      containerId: item.containerId || 0,
                      notat: item.notat || "",
                      aktiv: item.aktiv,
                    });
                    setEditId(item.leieId);
                  }}
                >
                  Rediger
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rediger leieartikkel</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <FormField label="Navn *">
                    <Input
                      value={form.artikkeltekstInternt}
                      onChange={(e) =>
                        handleChange("artikkeltekstInternt", e.target.value)
                      }
                    />
                  </FormField>
                  <FormField label="Enhet">
                    <Select
                      value={form.enhetId.toString()}
                      onValueChange={(val) =>
                        handleChange("enhetId", parseInt(val))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Velg enhet *" />
                      </SelectTrigger>
                      <SelectContent>
                        {enheter.map((e) => (
                          <SelectItem
                            key={e.enhetId}
                            value={e.enhetId.toString()}
                          >
                            {e.navn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Leverandør">
                    <Select
                      value={form.leverandorId.toString()}
                      onValueChange={(val) =>
                        handleChange("leverandorId", parseInt(val))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Velg leverandør" />
                      </SelectTrigger>
                      <SelectContent>
                        {leverandorer.map((l) => (
                          <SelectItem
                            key={l.leverandorId}
                            value={l.leverandorId.toString()}
                          >
                            {l.navn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Containertype">
                    <Select
                      value={form.containerTypeId.toString()}
                      onValueChange={(val) => {
                        const containerTypeId = parseInt(val);
                        setForm((prev) => ({
                          ...prev,
                          containerTypeId,
                          containerId: 0,
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Velg containertype" />
                      </SelectTrigger>
                      <SelectContent>
                        {containerTyper.map((ct) => (
                          <SelectItem
                            key={ct.containerTypeId}
                            value={ct.containerTypeId.toString()}
                          >
                            {ct.navn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Container">
                    <Select
                      value={form.containerId.toString()}
                      onValueChange={(val) =>
                        handleChange("containerId", parseInt(val))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Velg container" />
                      </SelectTrigger>
                      <SelectContent>
                        {containere
                          .filter(
                            (c) => c.containerTypeId === form.containerTypeId
                          )
                          .map((c) => (
                            <SelectItem
                              key={c.containerId}
                              value={c.containerId.toString()}
                            >
                              {c.navn}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Notat">
                    <Input
                      value={form.notat}
                      onChange={(e) => handleChange("notat", e.target.value)}
                    />
                  </FormField>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={form.aktiv}
                      onCheckedChange={(val) =>
                        handleChange("aktiv", val === true)
                      }
                    />
                    <label>Aktiv</label>
                  </div>
                </div>
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
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  if (confirm(`Slette "${item.artikkeltekstInternt}"?`)) {
                    try {
                      await remove.mutateAsync(item.leieId);
                    } catch (err: any) {
                      if (err.response?.status === 409) {
                        alert("Kan ikke slette – leieartikkel er i bruk.");
                      } else {
                        alert("Feil ved sletting.");
                        console.error(err);
                      }
                    }
                  }
                }}
              >
                Slett
              </Button>
            </Dialog>
          );
        }}
      />
    </div>
  );
}
