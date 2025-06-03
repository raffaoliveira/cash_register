import { ICashMovementRepository } from '../../domain/repository/ICashMovementRepository'
import { AddCashMovementDTO } from '../../../shared/dtos/AddCashMovementDTO'
import { CashMovement } from '../../domain/entities/CashMovement'

export class AddCashMovementUseCase {
  constructor(private cashMovementRepository: ICashMovementRepository) {}

  async execute({
    amount,
    cashRegisterId,
    financialOperation,
    notes,
  }: AddCashMovementDTO) {
    const cashMovement = new CashMovement(
      amount,
      cashRegisterId,
      financialOperation,
      notes
    )
    const response = await this.cashMovementRepository.include(cashMovement)
    return response
  }
}
