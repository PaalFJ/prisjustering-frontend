import { useState } from "react"
import {
  createContainerType,
  updateContainerType,
  deleteContainerType,
} from "@/services/masterData"
import { useMasterData } from "@/hooks/useMasterData"
import DataTable from "@/components/ui/DataTable/DataTable"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"

export default function ContainerTypeTab() {
  const { data, refetch } = useMasterData()
  const list = data?.containerTyper || []

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
          <Button className="mb-4">Ny containertype</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>Ny containertype</DialogTitle></DialogHeader>
          <Input placeholder="Navn *" value={navn} onChange={(e) => setNavn(e.target.value)} />
          <DialogFooter>
            <Button
              onClick={async () => {
                await createContainerType({ navn })
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
          { key: "containerTypeId", label: "ID" },
          { key: "navn", label: "Navn" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={list}
        getRowId={(row) => row.containerTypeId}
        renderCell={(row, key) => row[key as keyof typeof row]}
        renderActions={(item) => (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => {
                  setNavn(item.navn)
                  setEditId(item.containerTypeId)
                }}>Rediger</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Rediger containertype</DialogTitle></DialogHeader>
                <Input placeholder="Navn *" value={navn} onChange={(e) => setNavn(e.target.value)} />
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (editId !== null) {
                        await updateContainerType(editId, { navn, containerTypeId: editId })
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
                    await deleteContainerType(item.containerTypeId)
                    await refetch()
                  } catch (err: any) {
                    if (err.response?.status === 409) {
                      alert("Kan ikke slette – containertypen er i bruk.")
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
