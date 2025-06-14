import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Separator } from '../components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog'
import { formatDateBr } from '../util/dateFormat'
import { AddCashMovementDTO } from 'shared/dtos/AddCashMovementDTO'
import { ICashMovement } from '../../shared/interface/ICashMovement'
import { calculateTotalCash } from '../util/cashUtil'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'

export function CashMovement() {
  const [status, setStatus] = useState<'Aberto' | 'Fechado'>()
  const [openCashRegisterDate, setOpenCashRegisterDate] = useState('')
  const [openCashRegisterValue, setOpenCashRegisterValue] = useState('')
  const [openingBalance, setOpeningBalance] = useState<number | undefined>()
  const [cashRegisterId, setCashRegisterId] = useState('')
  const [openedAt, setOpenedAt] = useState<Date | undefined>()

  const [movementValue, setMovementValue] = useState('')
  const [movementType, setMovementType] = useState<'E' | 'S'>('E')
  const [movementDescription, setMovementDescription] = useState('')
  const [listCashMovement, setListCashMovement] = useState<ICashMovement[]>([])

  const [validate, setValidade] = useState<boolean>()

  useEffect(() => {
    async function getOpenCashRegister() {
      const response = await window.API.getOpenCashRegister()
      if (response) {
        setStatus('Aberto')
        setCashRegisterId(response.id)
        setOpeningBalance(response.openingBalance)
        setOpenedAt(response.openedAt)
        findManyMovements(response.id)
      }
    }

    async function findManyMovements(cashRegisterId: string) {
      const cashMovements = await window.API.findManyMovement(cashRegisterId)
      setListCashMovement(cashMovements)
    }

    getOpenCashRegister()
  }, [])

  const totalCah = useMemo(
    () => calculateTotalCash(openingBalance, listCashMovement),
    [openingBalance, listCashMovement]
  )

  async function handleOpenCash() {
    try {
      const cashRegister = await window.API.openCashRegister({
        openingBalance: Number(openCashRegisterValue),
        openedAt: new Date(openCashRegisterDate + 'T00:00:00-03:00'),
      })
      if (cashRegister) {
        setStatus('Aberto')
        setCashRegisterId(cashRegister.id)
        setOpeningBalance(cashRegister.openingBalance)
        setOpenedAt(cashRegister.openedAt)
        setOpenCashRegisterValue('')
      }
    } catch (error) {
      toast.error('Já existe um caixa para essa data')
      throw new Error('Failed to open cash register.')
    }
  }

  async function handleCloseCashRegister() {
    if (totalCah < 0) {
      toast.error(
        'Valor do caixa não pode ser menor que zero, verifique o caixa e tente novamente'
      )
      return
    }
    const cashRegisterClosed = await window.API.closeCashRegister({
      closedAt: new Date(),
      closingBalance: 500,
      id: cashRegisterId,
    })
    if (cashRegisterClosed) {
      setStatus('Fechado')
      setOpenCashRegisterDate('')
      toast.success('Caixa Fechado Com Sucesso!')
    }
  }

  async function handleAddMovement() {
    if (Number(movementValue) <= 0) {
      setValidade(true)
      return
    }
    const cashMovementDTO: AddCashMovementDTO = {
      amount: Number(movementValue),
      cashRegisterId: cashRegisterId,
      financialOperation: movementType,
      notes: movementDescription,
    }
    const cashMovement = await window.API.addCashMovement(cashMovementDTO)
    setListCashMovement((prevList) => [...prevList, cashMovement])
    setMovementDescription('')
    setMovementValue('')
  }

  async function handleDeleteCashMovement(cashMovementId: string) {
    const cashMovement = await window.API.deleteCashMovement(cashMovementId)
    if (cashMovement) {
      setListCashMovement((prevList) =>
        prevList.filter((movement) => movement.id !== cashMovementId)
      )
      toast.success('Movimento excluído com sucesso.')
    } else {
      toast.error('Falha ao excluir movimento.')
    }
  }

  return (
    <div className="col-span-10 space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div>
              <p>
                Status: <span className="font-semibold text-green-600">{status}</span>
              </p>
              <p>Aberto em: {formatDateBr(openedAt)}</p>
              <p>
                Aberto com: R${' '}
                {openingBalance == undefined ? '' : openingBalance.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-2xl">
                Total R${' '}
                <span
                  className={
                    totalCah >= 0
                      ? 'font-semibold text-green-400'
                      : 'font-semibold text-red-400'
                  }
                >
                  {totalCah.toFixed(2)}
                </span>
              </p>
            </div>
            {status === 'Aberto' ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Fechar Caixa</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Fechar Caixa?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deseja realmente fechar o caixa?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCloseCashRegister}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Abrir Caixa</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Digite a data e o valor</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Data
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          className="col-span-3"
                          value={openCashRegisterDate}
                          onChange={(e) => setOpenCashRegisterDate(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="value" className="text-right">
                          Valor
                        </Label>
                        <Input
                          id="value"
                          type="number"
                          className="col-span-3"
                          value={openCashRegisterValue}
                          onChange={(e) => setOpenCashRegisterValue(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button onClick={handleOpenCash}>Salvar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Novo Registro</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className={validate ? 'text-red-500' : ''}>Valor</Label>
              <Input
                className={validate ? 'border-red-500' : 'border-gray-300'}
                disabled={status === 'Fechado' ? true : false}
                type="number"
                placeholder="0.00"
                value={movementValue}
                onChange={(e) => {
                  setMovementValue(e.target.value)
                  setValidade(false)
                }}
              />
            </div>
            <div>
              <Label>Tipo de Operação</Label>
              <Select
                disabled={status === 'Fechado' ? true : false}
                value={movementType}
                onValueChange={(v) => setMovementType(v as 'E' | 'S')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione operação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="E">Entrada</SelectItem>
                  <SelectItem value="S">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Descrição</Label>
              <Input
                disabled={status === 'Fechado' ? true : false}
                type="text"
                placeholder="Descrição"
                value={movementDescription}
                onChange={(e) => setMovementDescription(e.target.value)}
              />
            </div>
          </div>
          <Button
            className="mt-2"
            onClick={handleAddMovement}
            disabled={status === 'Fechado' ? true : false}
          >
            Confirmar
          </Button>
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
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="cursor-pointer" variant={'ghost'} size="icon">
                          <Trash2Icon />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir Movimento?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Deseja realmente excluir movimento{' '}
                            <span className="font-bold">{movement.notes}</span> do caixa?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCashMovement(movement.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
