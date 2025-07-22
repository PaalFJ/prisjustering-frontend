import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/shadcn/table"
import type { ReactNode } from "react"

type Column = {
  key: string
  label: string
  className?: string
}

interface Props<T> {
  columns: Column[]
  data: T[]
  getRowId: (item: T) => number
  renderCell: (item: T, key: string) => ReactNode
  renderActions?: (item: T) => ReactNode
}

export default function DataTable<T>({
  columns,
  data,
  getRowId,
  renderCell,
  renderActions,
}: Props<T>) {
  return (
    <Table className="text-sm border rounded-md [&_th]:bg-neutral-100 [&_td]:align-top [&_td]:py-2 [&_td]:px-3 [&_tr:nth-child(even)]:bg-muted/40">
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key} className={col.className}>
              {col.label}
            </TableHead>
          ))}
          {renderActions && <TableHead>Handlinger</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={getRowId(item)}>
            {columns.map((col) => (
              <TableCell key={col.key}>
                {renderCell(item, col.key)}
              </TableCell>
            ))}
            {renderActions && (
              <TableCell className="space-x-2">{renderActions(item)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
