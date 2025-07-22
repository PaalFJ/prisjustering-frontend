import { useState } from "react"
import {
  createEnhet,
  updateEnhet,
  deleteEnhet,
} from "@/services/masterData"
import { useMasterData } from "@/hooks/useMasterData"
import DataTable from "@/components/ui/DataTable/DataTable"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"

export default function EnhetTab() {
  const { data, refetch } = useMasterData()
  const list = data?.enheter || []
  const [navn, setNavn] = useState("")
  const [editId, setEditId] = useState<number | null>(null)

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ny enhet</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny enhet</DialogTitle>
          </DialogHeader>
          <Input value={navn} onChange={(e) => setNavn(e.target.value)} placeholder="Navn (f.eks. kg)" />
          <DialogFooter>
            <Button
              onClick={async () => {
                await createEnhet({ navn })
                setNavn("")
                await refetch()
              }}
            >
              Lagre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={[
          { key: "enhetId", label: "ID" },
          { key: "navn", label: "Navn" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={list}
        getRowId={(e) => e.enhetId}
        renderCell={(row, key) => row[key as keyof typeof row]}
        renderActions={(e) => (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNavn(e.navn)
                    setEditId(e.enhetId)
                  }}
                >
                  Rediger
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rediger enhet</DialogTitle>
                </DialogHeader>
                <Input value={navn} onChange={(ev) => setNavn(ev.target.value)} />
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (editId !== null) {
                        await updateEnhet(editId, { navn })
                        setNavn("")
                        setEditId(null)
                        await refetch()
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
                if (confirm(`Slette "${e.navn}"?`)) {
                  try {
                    await deleteEnhet(e.enhetId)
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
