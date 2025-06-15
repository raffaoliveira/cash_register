import { ICashMovementRepository } from '../../domain/repository/ICashMovementRepository'
import { IAddCashMovementDTO } from '../../../shared/dtos/AddCashMovementDTO'

export class AddCashMovementUseCase {
  constructor(private cashMovementRepository: ICashMovementRepository) {}

  async execute(data: IAddCashMovementDTO) {
    const response = await this.cashMovementRepository.include(data)
    return response
  }
}
