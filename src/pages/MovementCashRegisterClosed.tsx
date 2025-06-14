import { ICashMovement } from 'shared/interface/ICashMovement'
import { Card, CardContent } from '../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { formatDateBr } from '@/util/dateFormat'
import { useState } from 'react'

export function MovementCashRegisterClosed({
  cashRegisterId,
}: {
  cashRegisterId: string
}) {
  const [listCashMovement, setListCashMovement] = useState<ICashMovement[]>([])
  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Movimento Recente</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listCashMovement.map((movement) => (
                <TableRow
                  key={movement.id}
                  className={
                    movement.financialOperation === 'E' ? 'bg-green-200' : 'bg-red-200'
                  }
                >
                  <TableCell>
                    {formatDateBr(new Date(movement.createdAt), true)}
                  </TableCell>
                  <TableCell>
                    {movement.financialOperation === 'E' ? 'Entrada' : 'Saída'}
                  </TableCell>
                  <TableCell>R$ {movement.amount.toFixed(2)}</TableCell>
                  <TableCell>{movement.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
