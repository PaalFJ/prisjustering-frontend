import { useState } from "react";
import type { Container } from "@/types/masterData";
import {
  createContainer,
  updateContainer,
  deleteContainer,
} from "@/services/masterData";
import { useMasterData } from "@/hooks/useMasterData";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { Checkbox } from "@/components/shadcn/checkbox";

export default function ContainerTab() {
  const { data, refetch } = useMasterData();
  const list = data?.containere || [];
  const typer = data?.containerTyper || [];

  const [form, setForm] = useState({
    navn: "",
    containerTypeId: 0,
    notat: "",
    aktiv: true,
    volum: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const reset = () => {
    setForm({
      navn: "",
      containerTypeId: 0,
      notat: "",
      aktiv: true,
      volum: "",
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
          <Button className="mb-4">Ny container</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny container</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              placeholder="Navn *"
              value={form.navn}
              onChange={(e) => handleChange("navn", e.target.value)}
            />

            <Select
              value={form.containerTypeId?.toString()}
              onValueChange={(val) =>
                handleChange("containerTypeId", parseInt(val))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Velg type *" />
              </SelectTrigger>
              <SelectContent>
                {typer.map((t) => (
                  <SelectItem
                    key={t.containerTypeId}
                    value={t.containerTypeId.toString()}
                  >
                    {t.navn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Volum (liter)"
              value={form.volum}
              onChange={(e) => handleChange("volum", e.target.value)}
            />
            <Input
              placeholder="Notat"
              value={form.notat}
              onChange={(e) => handleChange("notat", e.target.value)}
            />

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
                await createContainer({
                  ...form,
                  volum: form.volum ? parseFloat(form.volum) : undefined,
                });
                reset();
                await refetch();
              }}
              disabled={!form.navn || !form.containerTypeId}
            >
              Lagre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable<Container>
        columns={[
          { key: "containerId", label: "ID" },
          { key: "navn", label: "Navn" },
          { key: "containerTypeId", label: "Type" },
          { key: "volum", label: "Volum" },
          { key: "notat", label: "Notat" },
          { key: "aktiv", label: "Aktiv" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={list}
        getRowId={(r) => r.containerId}
        renderCell={(row, key) => {
          if (key === "aktiv") return row.aktiv ? "✅" : "–";
          if (key === "containerTypeId") {
            const type = typer.find(
              (t) => t.containerTypeId === row.containerTypeId
            );
            return type?.navn || "–";
          }
          if (key === "volum")
            return row.volum !== undefined ? `${row.volum} L` : "–";
          const value = row[key as keyof Container];
          return typeof value === "string" || typeof value === "number"
            ? value
            : "–";
        }}
        renderActions={(item) => {
          const c = item as Container;
          return (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setForm({
                        navn: c.navn || "",
                        containerTypeId: c.containerTypeId || 0,
                        notat: c.notat || "",
                        aktiv: c.aktiv,
                        volum: c.volum?.toString() || "",
                      });
                      setEditId(c.containerId);
                    }}
                  >
                    Rediger
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rediger container</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Input
                      placeholder="Navn *"
                      value={form.navn}
                      onChange={(e) => handleChange("navn", e.target.value)}
                    />

                    <Select
                      value={form.containerTypeId?.toString()}
                      onValueChange={(val) =>
                        handleChange("containerTypeId", parseInt(val))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Velg type *" />
                      </SelectTrigger>
                      <SelectContent>
                        {typer.map((t) => (
                          <SelectItem
                            key={t.containerTypeId}
                            value={t.containerTypeId.toString()}
                          >
                            {t.navn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      placeholder="Volum (liter)"
                      value={form.volum}
                      onChange={(e) => handleChange("volum", e.target.value)}
                    />
                    <Input
                      placeholder="Notat"
                      value={form.notat}
                      onChange={(e) => handleChange("notat", e.target.value)}
                    />

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
                          await updateContainer(editId, {
                            ...form,
                            volum: form.volum
                              ? parseFloat(form.volum)
                              : undefined,
                            containerId: editId,
                          });
                          reset();
                          await refetch();
                        }
                      }}
                      disabled={!form.navn || !form.containerTypeId}
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
                  if (confirm(`Slette "${c.navn}"?`)) {
                    try {
                      await deleteContainer(c.containerId);
                      await refetch();
                    } catch (err: any) {
                      alert("Feil ved sletting.");
                      console.error(err);
                    }
                  }
                }}
              >
                Slett
              </Button>
            </>
          );
        }}
      />
    </div>
  );
}
