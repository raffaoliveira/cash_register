import { ICashRegisterRepository } from 'electron/domain/repository/ICashRegisterRepository'

export class FindAllCashRegisterClosedUseCase {
  constructor(private cashRegisterRepository: ICashRegisterRepository) {}

  async execute() {
    const cashRegister = await this.cashRegisterRepository.findAllCashRegisterClosed()
    return cashRegister
  }
}
