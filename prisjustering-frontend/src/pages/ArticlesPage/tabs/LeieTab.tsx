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
    navn: "",
    enhetId: 0,
    leverandorId: 0,
    containerTypeId: 0,
    containerId: 0,
    notat: "",
    aktiv: true,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const reset = () => {
    setForm({
      navn: "",
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
            <Input
              placeholder="Navn *"
              value={form.navn}
              onChange={(e) => handleChange("navn", e.target.value)}
            />

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

            <Select
              value={form.containerTypeId.toString()}
              onValueChange={(val) =>
                handleChange("containerTypeId", parseInt(val))
              }
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
                {containere.map((c) => (
                  <SelectItem
                    key={c.containerId}
                    value={c.containerId.toString()}
                  >
                    {c.navn}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
                await create.mutateAsync(form);
                reset();
              }}
              disabled={!form.navn || !form.enhetId}
            >
              Lagre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable<Leie>
        columns={[
          { key: "leieId", label: "ID" },
          { key: "navn", label: "Navn" },
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
          return row[key as keyof Leie];
        }}
        renderActions={(item) => {
          const leie = item as Leie;
          return (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setForm({
                        navn: leie.navn || "",
                        enhetId: leie.enhetId || 0,
                        leverandorId: leie.leverandorId || 0,
                        containerTypeId: leie.containerTypeId || 0,
                        containerId: leie.containerId || 0,
                        notat: leie.notat || "",
                        aktiv: leie.aktiv,
                      });
                      setEditId(leie.leieId);
                    }}
                  >
                    Rediger
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rediger leie</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Input
                      placeholder="Navn *"
                      value={form.navn}
                      onChange={(e) => handleChange("navn", e.target.value)}
                    />

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

                    <Select
                      value={form.containerTypeId.toString()}
                      onValueChange={(val) =>
                        handleChange("containerTypeId", parseInt(val))
                      }
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
                        {containere.map((c) => (
                          <SelectItem
                            key={c.containerId}
                            value={c.containerId.toString()}
                          >
                            {c.navn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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
                          await update.mutateAsync({ id: editId, data: form });
                          reset();
                        }
                      }}
                      disabled={!form.navn || !form.enhetId}
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
                  if (confirm(`Slette "${leie.navn}"?`)) {
                    await remove.mutateAsync(leie.leieId);
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
