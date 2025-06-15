import { CashRegister } from '../../domain/entities/CashRegister'
import { ICashRegisterRepository } from 'electron/domain/repository/ICashRegisterRepository'
import { IOpenCashRegisterDTO } from '../../../shared/dtos/OpenCashRegisterDTO'

export class OpenCashRegisterUseCase {
  constructor(private cashRegisterRepository: ICashRegisterRepository) {}

  async execute({
    openedAt,
    openingBalance,
  }: IOpenCashRegisterDTO): Promise<CashRegister> {
    const existCashOpen = await this.cashRegisterRepository.findOpen()
    const existCashForDate = await this.cashRegisterRepository.findCashRegisterForDate(
      openedAt
    )

    if (existCashOpen) {
      throw new Error('There is an open cash register')
    }
    if (existCashForDate) {
      throw new Error('There is already a cash register for that date')
    }

    const newCashRegister = new CashRegister(openingBalance, openedAt)

    const newCashRegisterId = await this.cashRegisterRepository.open(newCashRegister)

    return newCashRegisterId
  }
}
