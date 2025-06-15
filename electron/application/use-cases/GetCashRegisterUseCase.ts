import { ICashRegisterRepository } from 'electron/domain/repository/ICashRegisterRepository'

export class GetCashRegisterUseCase {
  constructor(private cashRegisterRepository: ICashRegisterRepository) {}

  async execute(cashRegisterId: string) {
    const cashRegister = await this.cashRegisterRepository.getCashRegister(cashRegisterId)
    return cashRegister
  }
}
