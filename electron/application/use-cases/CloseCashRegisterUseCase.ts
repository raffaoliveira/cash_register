import { ICashRegisterRepository } from '../../domain/repository/ICashRegisterRepository'
import { CloseCashRegisterDTO } from '../../../shared/dtos/CloseCashRegisterDTO'

export class CloseCashRegisterUseCase {
  constructor(private cashRegisterRepository: ICashRegisterRepository) {}

  async execute(closeCashRegisterDTO: CloseCashRegisterDTO): Promise<boolean> {
    try {
      await this.cashRegisterRepository.close(closeCashRegisterDTO)
      return true
    } catch (error) {
      throw new Error('Error close Cash Register')
    }
  }
}
