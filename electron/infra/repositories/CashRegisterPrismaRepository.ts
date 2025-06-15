import { ICashRegisterRepository } from 'electron/domain/repository/ICashRegisterRepository'
import { prisma } from '../prisma/client'
import { ICloseCashRegisterDTO } from 'shared/dtos/CloseCashRegisterDTO'
import { CashRegister } from '../../domain/entities/CashRegister'

export class CashRegisterPrismaRepository implements ICashRegisterRepository {
  async open(cashRegister: CashRegister): Promise<CashRegister> {
    try {
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
    } catch (error) {
      throw new Error('Error opening new cash register')
    }
  }
  async close(cashRegister: ICloseCashRegisterDTO): Promise<void> {
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
      throw new Error('Error closing cash register')
    }
  }
  async findOpen(): Promise<CashRegister | null> {
    try {
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
    } catch (error) {
      throw new Error('Error finding open cash register')
    }
  }

  async findCashRegisterForDate(date: Date): Promise<boolean> {
    try {
      const cashExistForDate = await prisma.cashRegister.findFirst({
        where: {
          openedAt: date,
        },
      })
      if (cashExistForDate) {
        return true
      }
      return false
    } catch (error) {
      throw new Error('Error finding cash register exist for date')
    }
  }

  async findAllCashRegisterClosed(): Promise<CashRegister[]> {
    try {
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
    } catch (error) {
      throw new Error('Error finding all cash register closed')
    }
  }

  async getCashRegister(data: string): Promise<CashRegister | null> {
    try {
      const cashRegister = await prisma.cashRegister.findFirst({
        where: {
          id: data,
        },
      })
      if (cashRegister) {
        return new CashRegister(
          cashRegister.openingBalance,
          cashRegister.openedAt,
          cashRegister.closedAt!,
          cashRegister.closingBalance!,
          cashRegister.id
        )
      }
      return null
    } catch (error) {
      throw new Error('Error getting cash register')
    }
  }
}
