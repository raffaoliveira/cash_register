import { ICashRegisterRepository } from 'electron/domain/repository/ICashRegisterRepository'
import { prisma } from '../prisma/client'
import { CloseCashRegisterDTO } from 'shared/dtos/CloseCashRegisterDTO'
import { CashRegister } from '../../domain/entities/CashRegister'

export class CashRegisterPrismaRepository implements ICashRegisterRepository {
  async open(cashRegister: CashRegister): Promise<CashRegister> {
    const result = await prisma.cashRegister.create({
      data: {
        openingBalance: cashRegister.openingBalance,
        openedAt: cashRegister.openedAt,
      },
    })
    return new CashRegister(
      result.openingBalance,
      result.openedAt,
      result.closedAt ?? undefined,
      result.closingBalance ?? undefined,
      result.id
    )
  }
  async close(cashRegister: CloseCashRegisterDTO): Promise<void> {
    try {
      await prisma.cashRegister.update({
        data: {
          closedAt: cashRegister.closedAt,
          closingBalance: cashRegister.closingBalance,
        },
        where: {
          id: cashRegister.id,
        },
      })
    } catch (error) {
      throw new Error('Erro ao fechar caixa' + error)
    }
  }
  async findOpen(): Promise<CashRegister | null> {
    const cashRegister = await prisma.cashRegister.findFirst({
      where: { closedAt: null },
    })

    if (!cashRegister) return null

    return new CashRegister(
      cashRegister.openingBalance,
      cashRegister.openedAt,
      cashRegister.closedAt ?? undefined,
      cashRegister.closingBalance ?? undefined,
      cashRegister.id
    )
  }

  async findCashRegisterForDate(date: Date): Promise<boolean> {
    const cashExistForDate = await prisma.cashRegister.findFirst({
      where: {
        openedAt: date,
      },
    })
    if (cashExistForDate) {
      return true
    }
    return false
  }

  async findAllCashRegisterClosed(): Promise<CashRegister[]> {
    const allCashRegisterClosed = await prisma.cashRegister.findMany({
      where: {
        closedAt: {
          not: null,
        },
      },
    })
    const listCashRegister = allCashRegisterClosed.map((cashRegister) => {
      return new CashRegister(
        cashRegister.openingBalance,
        cashRegister.openedAt,
        cashRegister.closedAt!,
        cashRegister.closingBalance!,
        cashRegister.id
      )
    })

    return listCashRegister
  }
}
