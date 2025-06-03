import { ICashRegisterRepository } from 'electron/domain/repository/ICashRegisterRepository'

export class GetOpenCashRegisterUseCase {
  constructor(private cashRegisterRepository: ICashRegisterRepository) {}

  async execute() {
    const cashRegister = await this.cashRegisterRepository.findOpen()
    if (!cashRegister) return null
    return cashRegister
  }
}
