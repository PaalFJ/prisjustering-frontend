import { useState } from "react"
import {
  createLeverandor,
  updateLeverandor,
  deleteLeverandor,
} from "@/services/masterData"
import { useMasterData } from "@/hooks/useMasterData"
import DataTable from "@/components/ui/DataTable/DataTable"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"

export default function LeverandorTab() {
  const { data, refetch } = useMasterData()
  const list = data?.leverandorer || []

  const [form, setForm] = useState({ navn: "", notat: "" })
  const [editId, setEditId] = useState<number | null>(null)

  const reset = () => {
    setForm({ navn: "", notat: "" })
    setEditId(null)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ny leverandør</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Ny leverandør</DialogTitle></DialogHeader>
          <div className="space-y-2">
            <Input placeholder="Navn *" value={form.navn} onChange={(e) => setForm(f => ({ ...f, navn: e.target.value }))} />
            <Input placeholder="Notat" value={form.notat} onChange={(e) => setForm(f => ({ ...f, notat: e.target.value }))} />
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                await createLeverandor(form)
                reset()
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
          { key: "leverandorId", label: "ID" },
          { key: "navn", label: "Navn" },
          { key: "notat", label: "Notat" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={list}
        getRowId={(row) => row.leverandorId}
        renderCell={(row, key) => row[key as keyof typeof row]}
        renderActions={(item) => (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => {
                  setForm({ navn: item.navn, notat: item.notat || "" })
                  setEditId(item.leverandorId)
                }}>Rediger</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Rediger leverandør</DialogTitle></DialogHeader>
                <div className="space-y-2">
                  <Input placeholder="Navn *" value={form.navn} onChange={(e) => setForm(f => ({ ...f, navn: e.target.value }))} />
                  <Input placeholder="Notat" value={form.notat} onChange={(e) => setForm(f => ({ ...f, notat: e.target.value }))} />
                </div>
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (editId !== null) {
                        await updateLeverandor(editId, { ...form, leverandorId: editId })
                        reset()
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
                if (confirm(`Slette "${item.navn}"?`)) {
                  try {
                    await deleteLeverandor(item.leverandorId)
                    await refetch()
                  } catch (err: any) {
                    if (err.response?.status === 409) {
                      alert("Kan ikke slette – leverandøren er i bruk.")
                    } else {
                      alert("Feil ved sletting.")
                      console.error(err)
                    }
                  }
                }
              }}
            >Slett</Button>
          </>
        )}
      />
    </div>
  )
}
