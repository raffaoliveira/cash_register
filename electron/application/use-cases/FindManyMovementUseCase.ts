import { ICashMovementRepository } from 'electron/domain/repository/ICashMovementRepository'

export class FindManyMovementUseCase {
  constructor(private cashMovementRepository: ICashMovementRepository) {}

  async execute(cashRegisterId: string) {
    try {
      const cashRegisterMovements = await this.cashMovementRepository.findMany(
        cashRegisterId
      )
      return cashRegisterMovements
    } catch (error) {
      throw new Error('Error find many cash register movements')
    }
  }
}
