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
import { useEffect, useState } from 'react'
import { ICashRegisterClosed } from 'shared/interface/ICashRegisterClosed'

export function MovementCashRegisterClosed({
  cashRegisterId,
}: {
  cashRegisterId: string
}) {
  const [listCashMovement, setListCashMovement] = useState<ICashMovement[]>([])
  const [cashRegister, setCashRegister] = useState<ICashRegisterClosed>()
  useEffect(() => {
    async function getCashMovement() {
      const listCashRegisterMovement = await window.API.findManyMovement(cashRegisterId)
      setListCashMovement(listCashRegisterMovement)
      const cashRegister = await window.API.getCashRegister(cashRegisterId)
      setCashRegister(cashRegister)
    }
    getCashMovement()
  }, [])
  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardContent className="flex justify-around">
          <div>
            <p>Aberto em: {formatDateBr(cashRegister?.openedAt)}</p>
            <p>Fechado em: {formatDateBr(cashRegister?.closedAt)} </p>
          </div>
          <div>
            <p>Aberto com: R$ {cashRegister?.openingBalance.toFixed(2)}</p>
            <p className="text-2xl">
              Saldo Final R$ <span>{cashRegister?.closingBalance.toFixed(2)}</span>
            </p>
          </div>
        </CardContent>
      </Card>
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
                    movement.financialOperation === 'E' ? 'bg-green-400' : 'bg-red-400'
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
