import { CashMovement } from '../../domain/entities/CashMovement'
import { ICashMovementRepository } from '../../domain/repository/ICashMovementRepository'
import { prisma } from '../prisma/client'

export class ClashMovementPrismaRepository implements ICashMovementRepository {
  async include(cashMovement: CashMovement): Promise<CashMovement> {
    const newCashMovement = await prisma.cashMovement.create({
      data: {
        amount: cashMovement.amount,
        cashRegisterId: cashMovement.cashRegisterId,
        financialOperation: cashMovement.financialOperation,
        notes: cashMovement.notes,
      },
    })
    return new CashMovement(
      newCashMovement.amount,
      newCashMovement.cashRegisterId,
      newCashMovement.financialOperation,
      newCashMovement.notes ?? undefined,
      newCashMovement.id,
      newCashMovement.createdAt ?? undefined
    )
  }

  async findMany(cashRegisterId: string): Promise<CashMovement[]> {
    const cashMovements = await prisma.cashMovement.findMany({
      where: {
        cashRegisterId: cashRegisterId,
      },
    })
    return cashMovements.map(
      (movement) =>
        new CashMovement(
          movement.amount,
          movement.cashRegisterId,
          movement.financialOperation,
          movement.notes ?? undefined,
          movement.id,
          movement.createdAt ?? undefined
        )
    )
  }
}
