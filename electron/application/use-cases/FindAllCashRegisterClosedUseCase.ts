import { ICashRegisterRepository } from 'electron/domain/repository/ICashRegisterRepository'

export class FindAllCashRegisterClosedUseCase {
  constructor(private cashRegisterRepository: ICashRegisterRepository) {}

  async execute() {
    try {
      const cashRegister = await this.cashRegisterRepository.findAllCashRegisterClosed()
      return cashRegister
    } catch (error) {
      throw new Error('Error find all cash register closed')
    }
  }
}
