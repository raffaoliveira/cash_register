import { CashRegister } from '../entities/CashRegister'
import { CloseCashRegisterDTO } from '../../../shared/dtos/CloseCashRegisterDTO'

export interface ICashRegisterRepository {
  open(cashRegister: CashRegister): Promise<CashRegister>
  close(cashRegister: CloseCashRegisterDTO): Promise<void>
  findOpen(): Promise<CashRegister | null>
  findCashRegisterForDate(date: Date): Promise<boolean>
  findAllCashRegisterClosed(): Promise<CashRegister[]>
  getCashRegister(data: string): Promise<CashRegister | null>
}
