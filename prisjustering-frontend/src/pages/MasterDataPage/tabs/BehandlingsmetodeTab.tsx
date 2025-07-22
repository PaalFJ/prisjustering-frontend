import { useState } from "react"
import {
  createBehandlingsmetode,
  updateBehandlingsmetode,
  deleteBehandlingsmetode,
} from "@/services/masterData"
import { useMasterData } from "@/hooks/useMasterData"
import DataTable from "@/components/ui/DataTable/DataTable"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"

export default function BehandlingsmetodeTab() {
  const { data, refetch } = useMasterData()
  const list = data?.behandlingsmetoder || []

  const [navn, setNavn] = useState("")
  const [editId, setEditId] = useState<number | null>(null)

  const reset = () => {
    setNavn("")
    setEditId(null)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ny behandlingsmetode</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny behandlingsmetode</DialogTitle>
          </DialogHeader>
          <Input placeholder="Navn *" value={navn} onChange={(e) => setNavn(e.target.value)} />
          <DialogFooter>
            <Button
              onClick={async () => {
                await createBehandlingsmetode({ navn })
                reset()
                await refetch()
              }}
              disabled={!navn.trim()}
            >
              Lagre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={[
          { key: "behandlingsMetodeId", label: "ID" },
          { key: "navn", label: "Navn" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={list}
        getRowId={(row) => row.behandlingsMetodeId}
        renderCell={(row, key) => row[key as keyof typeof row]}
        renderActions={(item) => (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNavn(item.navn)
                    setEditId(item.behandlingsMetodeId)
                  }}
                >
                  Rediger
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rediger behandlingsmetode</DialogTitle>
                </DialogHeader>
                <Input placeholder="Navn *" value={navn} onChange={(e) => setNavn(e.target.value)} />
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (editId !== null) {
                        await updateBehandlingsmetode(editId, {
                          navn,
                          behandlingsMetodeId: editId,
                        })
                        reset()
                        await refetch()
                      }
                    }}
                    disabled={!navn.trim()}
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
                    await deleteBehandlingsmetode(item.behandlingsMetodeId)
                    await refetch()
                  } catch (err: any) {
                    if (err.response?.status === 409) {
                      alert("Kan ikke slette – verdien er i bruk.")
                    } else {
                      alert("Feil ved sletting.")
                      console.error(err)
                    }
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
