import { CashMovement } from '../entities/CashMovement'

export interface ICashMovementRepository {
  include(cashMovement: CashMovement): Promise<CashMovement>
  findMany(cashRegisterId: string): Promise<CashMovement[]>
}
