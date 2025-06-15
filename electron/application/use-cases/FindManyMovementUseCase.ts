import { ICashMovementRepository } from 'electron/domain/repository/ICashMovementRepository'

export class FindManyMovementUseCase {
  constructor(private cashMovementRepository: ICashMovementRepository) {}

  async execute(cashRegisterId: string) {
    const cashRegisterMovements = await this.cashMovementRepository.findMany(
      cashRegisterId
    )
    return cashRegisterMovements
  }
}
