import { ipcMain } from 'electron'
import { OpenCashRegisterUseCase } from './application/use-cases/OpenCashRegisterUseCase'
import { CashRegisterPrismaRepository } from './infra/repositories/CashRegisterPrismaRepository'
import { GetOpenCashRegisterUseCase } from './application/use-cases/GetOpenCashRegisterUseCase'
import { CloseCashRegisterUseCase } from './application/use-cases/CloseCashRegisterUseCase'
import { AddCashMovementUseCase } from './application/use-cases/AddCashMovement'
import { ClashMovementPrismaRepository } from './infra/repositories/CashMovementPrismaRepository'
import { FindManyMovementUseCase } from './application/use-cases/FindManyMovementUseCase'

const cashRegisterRepository = new CashRegisterPrismaRepository()
const cashMovementRepository = new ClashMovementPrismaRepository()

ipcMain.handle('open-cash', async (_event, data) => {
  const openCashRegister = new OpenCashRegisterUseCase(cashRegisterRepository)

  const cashRegisterOpened = await openCashRegister.execute(data)

  return cashRegisterOpened
})

ipcMain.handle('getOpenCash', async () => {
  const getOpenCashRegister = new GetOpenCashRegisterUseCase(cashRegisterRepository)

  const cashRegister = await getOpenCashRegister.execute()

  return cashRegister
})

ipcMain.handle('closeCashRegister', async (_event, data) => {
  const closeCashRegister = new CloseCashRegisterUseCase(cashRegisterRepository)
  const cashRegisterClosed = await closeCashRegister.execute(data)
  return cashRegisterClosed
})

ipcMain.handle('addMovement', async (_event, data) => {
  const addMovement = new AddCashMovementUseCase(cashMovementRepository)
  const cashMovement = await addMovement.execute(data)
  return cashMovement
})

ipcMain.handle('findManyMovements', async (_enevt, data) => {
  const findManyMovements = new FindManyMovementUseCase(cashMovementRepository)
  const cashMovements = await findManyMovements.execute(data)
  return cashMovements
})
