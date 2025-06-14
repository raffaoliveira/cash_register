import { ICashMovementRepository } from 'electron/domain/repository/ICashMovementRepository'

export class UpdateCashMovementUseCase {
  constructor(private CashMovementRepository: ICashMovementRepository) {}

  async execute(data: string) {
    const cashMovement = await this.CashMovementRepository.delete(data)
    return cashMovement
  }
}
