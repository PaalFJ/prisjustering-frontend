import { useState } from "react"
import {
  createFraksjonsgruppe,
  updateFraksjonsgruppe,
  deleteFraksjonsgruppe,
} from "@/services/masterData"
import { useMasterData } from "@/hooks/useMasterData"
import DataTable from "@/components/ui/DataTable/DataTable"
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogFooter
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"

export default function FraksjonsgruppeTab() {
  const { data, refetch } = useMasterData()
  const list = data?.fraksjonsgrupper || []
  const [navn, setNavn] = useState("")
  const [editId, setEditId] = useState<number | null>(null)

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Ny fraksjonsgruppe</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny fraksjonsgruppe</DialogTitle>
          </DialogHeader>
          <Input value={navn} onChange={(e) => setNavn(e.target.value)} placeholder="Navn" />
          <DialogFooter>
            <Button
              onClick={async () => {
                await createFraksjonsgruppe({ navn })
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
          { key: "fraksjonsgruppeId", label: "ID" },
          { key: "navn", label: "Navn" },
          { key: "createdAt", label: "Opprettet" },
        ]}
        data={list}
        getRowId={(row) => row.fraksjonsgruppeId}
        renderCell={(row, key) => row[key as keyof typeof row]}
        renderActions={(f) => (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNavn(f.navn)
                    setEditId(f.fraksjonsgruppeId)
                  }}
                >
                  Rediger
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rediger fraksjonsgruppe</DialogTitle>
                </DialogHeader>
                <Input value={navn} onChange={(e) => setNavn(e.target.value)} />
                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (editId !== null) {
                        await updateFraksjonsgruppe(editId, { navn })
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
                if (confirm(`Slette "${f.navn}"?`)) {
                  try {
                    await deleteFraksjonsgruppe(f.fraksjonsgruppeId)
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
