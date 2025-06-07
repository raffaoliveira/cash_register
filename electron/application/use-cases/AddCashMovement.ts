import { ICashMovementRepository } from '../../domain/repository/ICashMovementRepository'
import { AddCashMovementDTO } from '../../../shared/dtos/AddCashMovementDTO'

export class AddCashMovementUseCase {
  constructor(private cashMovementRepository: ICashMovementRepository) {}

  async execute(data: AddCashMovementDTO) {
    const response = await this.cashMovementRepository.include(data)
    return response
  }
}
