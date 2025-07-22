import { useState } from "react"
import {
  createMottak,
  updateMottak,
  deleteMottak,
} from "@/services/masterData"
import { useMasterData } from "@/hooks/useMasterData"
import DataTable from "@/components/ui/DataTable/DataTable"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"

export default function MottakTab() {
  const { data, refetch } = useMasterData()
  const list = data?.mottak || []

  const [form, setForm] = useState({
    navn: "",
    adresse: "",
    postnummer: "",
    sted: "",
  })
  const [editId, setEditId] = useState<number | null>(null)

  const resetForm = () => {
    setForm({ navn: "", adresse: "", postnummer: "", sted: "" })
    setEditId(null)
  }

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value })
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Nytt mottak</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nytt mottak</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Input placeholder="Navn *" value={form.navn} onChange={(e) => handleChange("navn", e.target.value)} />
            <Input placeholder="Adresse" value={form.adresse} onChange={(e) => handleChange("adresse", e.target.value)} />
            <Input placeholder="Postnummer" value={form.postnummer} onChange={(e) => handleChange("postnummer", e.target.value)} />
            <Input placeholder="Sted" value={form.sted} onChange={(e) => handleChange("sted", e.target.value)} />
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                await createMottak({ ...form })
                resetForm()
                await refetch()
              }}
              disabled={!form.navn.trim()}
            >
              Lagre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={[
          { key: "mottakId", label: "ID" },
          { key: "navn", label: "Navn" },
          { key: "adresse", label: "Adresse" },
          { key: "postnummer", label: "Postnummer" },
          { key: "sted", label: "Sted" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={list}
        getRowId={(row) => row.mottakId}
        renderCell={(row, key) => row[key as keyof typeof row]}
        renderActions={(m) => (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setForm({
                      navn: m.navn || "",
                      adresse: m.adresse || "",
                      postnummer: m.postnummer || "",
                      sted: m.sted || "",
                    })
                    setEditId(m.mottakId)
                  }}
                >
                  Rediger
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rediger mottak</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <Input placeholder="Navn *" value={form.navn} onChange={(e) => handleChange("navn", e.target.value)} />
                  <Input placeholder="Adresse" value={form.adresse} onChange={(e) => handleChange("adresse", e.target.value)} />
                  <Input placeholder="Postnummer" value={form.postnummer} onChange={(e) => handleChange("postnummer", e.target.value)} />
                  <Input placeholder="Sted" value={form.sted} onChange={(e) => handleChange("sted", e.target.value)} />
                </div>
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (editId !== null) {
                        await updateMottak(editId, { ...form, mottakId: editId })
                        resetForm()
                        await refetch()
                      }
                    }}
                    disabled={!form.navn.trim()}
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
                if (confirm(`Slette "${m.navn}"?`)) {
                  try {
                    await deleteMottak(m.mottakId)
                    await refetch()
                  } catch (err: any) {
                    alert("Feil ved sletting.")
                    console.error(err)
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
  )
}
