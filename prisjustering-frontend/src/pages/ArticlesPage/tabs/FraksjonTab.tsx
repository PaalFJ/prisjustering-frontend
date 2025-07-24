// FraksjonTab.tsx – nå med full redigeringsdialog

import { useState } from "react";
import {
  useFraksjoner,
  useCreateFraksjon,
  useUpdateFraksjon,
  useDeleteFraksjon,
} from "@/hooks/useArticles";
import { useMasterData } from "@/hooks/useMasterData";
import type { Fraksjon } from "@/types/article";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import FormField from "@/components/ui/FormField/FormField";

export default function FraksjonTab() {
  const { data: master } = useMasterData();
  const { data = [] } = useFraksjoner();
  const create = useCreateFraksjon();
  const update = useUpdateFraksjon();
  const remove = useDeleteFraksjon();

  const grupper = master?.fraksjonsgrupper || [];
  const metoder = master?.behandlingsmetoder || [];
  const enheter = master?.enheter || [];

  const [form, setForm] = useState({
    artikkeltekstInternt: "",
    varenummerInternt: "",
    varenummerNS: "",
    fraksjonsgruppeId: 0,
    behandlingsmetodeId: 0,
    enhetId: 0,
    farligAvfall: false,
    aktiv: true,
    notat: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const resetForm = () => {
    setForm({
      artikkeltekstInternt: "",
      varenummerInternt: "",
      varenummerNS: "",
      fraksjonsgruppeId: 0,
      behandlingsmetodeId: 0,
      enhetId: 0,
      farligAvfall: false,
      aktiv: true,
      notat: "",
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
          <Button className="mb-4">Ny fraksjon</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny fraksjon</DialogTitle>
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
            <FormField label="Varenummer internt">
              <Input
                value={form.varenummerInternt}
                onChange={(e) =>
                  handleChange("varenummerInternt", e.target.value)
                }
              />
            </FormField>
            <FormField label="Varenummer NS">
              <Input
                value={form.varenummerNS}
                onChange={(e) => handleChange("varenummerNS", e.target.value)}
              />
            </FormField>
            <FormField label="Fraksjonsgruppe *">
              <Select
                value={form.fraksjonsgruppeId.toString()}
                onValueChange={(val) =>
                  handleChange("fraksjonsgruppeId", parseInt(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg fraksjonsgruppe" />
                </SelectTrigger>
                <SelectContent>
                  {grupper.map((g) => (
                    <SelectItem
                      key={g.fraksjonsgruppeId}
                      value={g.fraksjonsgruppeId.toString()}
                    >
                      {g.navn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Behandlingsmetode">
              <Select
                value={form.behandlingsmetodeId.toString()}
                onValueChange={(val) =>
                  handleChange("behandlingsmetodeId", parseInt(val))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg behandlingsmetode" />
                </SelectTrigger>
                <SelectContent>
                  {metoder.map((m) => (
                    <SelectItem
                      key={m.behandlingsMetodeId}
                      value={m.behandlingsMetodeId.toString()}
                    >
                      {m.navn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Enhet *">
              <Select
                value={form.enhetId.toString()}
                onValueChange={(val) => handleChange("enhetId", parseInt(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg enhet" />
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
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={form.farligAvfall}
                onCheckedChange={(val) =>
                  handleChange("farligAvfall", val === true)
                }
              />
              <label>Farlig avfall</label>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                await create.mutateAsync(form);
                resetForm();
              }}
              disabled={
                !form.artikkeltekstInternt ||
                !form.fraksjonsgruppeId ||
                !form.enhetId
              }
            >
              Lagre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable<Fraksjon>
        columns={[
          { key: "fraksjonId", label: "ID" },
          { key: "artikkeltekstInternt", label: "Navn" },
          { key: "varenummerInternt", label: "Varenummer internt" },
          { key: "varenummerNS", label: "Varenummer NS" },
          { key: "fraksjonsgruppeId", label: "Fraksjonsgruppe" },
          { key: "behandlingsmetodeId", label: "Behandlingsmetode" },
          { key: "farligAvfall", label: "Farlig avfall" },
          { key: "aktiv", label: "Aktiv" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={data}
        getRowId={(row) => row.fraksjonId}
        renderCell={(row, key) => {
          if (key === "farligAvfall" || key === "aktiv")
            return row[key] ? "✅" : "–";
          if (key === "fraksjonsgruppeId") {
            const gruppe = grupper.find(
              (g) => g.fraksjonsgruppeId === row.fraksjonsgruppeId
            );
            return gruppe?.navn || "–";
          }
          if (key === "behandlingsmetodeId") {
            const metode = metoder.find(
              (m) => m.behandlingsMetodeId === row.behandlingsmetodeId
            );
            return metode?.navn || "–";
          }
          return row[key as keyof Fraksjon];
        }}
        renderActions={(item) => {
          const fraksjon = item as Fraksjon;
          return (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setForm({
                        artikkeltekstInternt: fraksjon.artikkeltekstInternt,
                        varenummerInternt: fraksjon.varenummerInternt || "",
                        varenummerNS: fraksjon.varenummerNS || "",
                        fraksjonsgruppeId: fraksjon.fraksjonsgruppeId,
                        behandlingsmetodeId: fraksjon.behandlingsmetodeId || 0,
                        enhetId: fraksjon.enhetId,
                        farligAvfall: fraksjon.farligAvfall,
                        aktiv: fraksjon.aktiv,
                        notat: fraksjon.notat || "",
                      });
                      setEditId(fraksjon.fraksjonId);
                    }}
                  >
                    Rediger
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rediger fraksjon</DialogTitle>
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
                    <FormField label="Varenummer internt">
                      <Input
                        value={form.varenummerInternt}
                        onChange={(e) =>
                          handleChange("varenummerInternt", e.target.value)
                        }
                      />
                    </FormField>
                    <FormField label="Varenummer NS">
                      <Input
                        value={form.varenummerNS}
                        onChange={(e) =>
                          handleChange("varenummerNS", e.target.value)
                        }
                      />
                    </FormField>
                    <FormField label="Fraksjonsgruppe *">
                      <Select
                        value={form.fraksjonsgruppeId.toString()}
                        onValueChange={(val) =>
                          handleChange("fraksjonsgruppeId", parseInt(val))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Velg fraksjonsgruppe" />
                        </SelectTrigger>
                        <SelectContent>
                          {grupper.map((g) => (
                            <SelectItem
                              key={g.fraksjonsgruppeId}
                              value={g.fraksjonsgruppeId.toString()}
                            >
                              {g.navn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Behandlingsmetode">
                      <Select
                        value={form.behandlingsmetodeId.toString()}
                        onValueChange={(val) =>
                          handleChange("behandlingsmetodeId", parseInt(val))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Velg behandlingsmetode" />
                        </SelectTrigger>
                        <SelectContent>
                          {metoder.map((m) => (
                            <SelectItem
                              key={m.behandlingsMetodeId}
                              value={m.behandlingsMetodeId.toString()}
                            >
                              {m.navn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Enhet *">
                      <Select
                        value={form.enhetId.toString()}
                        onValueChange={(val) =>
                          handleChange("enhetId", parseInt(val))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Velg enhet" />
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
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={form.farligAvfall}
                        onCheckedChange={(val) =>
                          handleChange("farligAvfall", val === true)
                        }
                      />
                      <label>Farlig avfall</label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={async () => {
                        if (editId !== null) {
                          await update.mutateAsync({
                            id: editId,
                            data: { ...form },
                          });
                          resetForm();
                        }
                      }}
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
                  if (confirm(`Slette "${fraksjon.artikkeltekstInternt}"?`)) {
                    try {
                      await remove.mutateAsync(fraksjon.fraksjonId);
                    } catch (err: any) {
                      if (err.response?.status === 409) {
                        alert("Kan ikke slette – fraksjonen er i bruk.");
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
            </>
          );
        }}
      />
    </div>
  );
}
