import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDateBr } from '@/util/dateFormat'
import { EyeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ICashRegisterClosed } from '../../shared/interface/ICashRegisterClosed'
import { Link } from 'react-router-dom'

export function CashRegister() {
  const [listCashRegister, setListCashRegister] = useState<ICashRegisterClosed[]>([])

  useEffect(() => {
    async function findAllCashRegisterClosed() {
      const allCashRegisterClosed = await window.API.findAllCashRegisterClosed()
      setListCashRegister(allCashRegisterClosed)
    }
    findAllCashRegisterClosed()
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-10">Lista de Caixas</h1>
      <p>Pagina em desenvolvimento</p>
      <div className="w-full max-w-5xl">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Registro de caixa</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data Abertura</TableHead>
                  <TableHead>Data Fechamento</TableHead>
                  <TableHead>Valor aberto</TableHead>
                  <TableHead>Valor Fechado</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listCashRegister.map((cashRegister) => (
                  <TableRow key={cashRegister.id}>
                    <TableCell>
                      {formatDateBr(new Date(cashRegister.openedAt), false)}
                    </TableCell>
                    <TableCell>
                      {formatDateBr(new Date(cashRegister.closedAt), false)}
                    </TableCell>
                    <TableCell>R$ {cashRegister.openingBalance.toFixed(2)}</TableCell>
                    <TableCell>R$ {cashRegister.closingBalance.toFixed(2)}</TableCell>
                    <TableCell>
                      <Link to={`/movement-cash-register-closed/${cashRegister.id}`}>
                        <Button
                          className="cursor-pointer"
                          variant={'ghost'}
                          size={'icon'}
                        >
                          <EyeIcon />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
