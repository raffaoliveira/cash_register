import { ICashMovement } from 'shared/interface/ICashMovement'

export function calculateTotalMovements(movements: ICashMovement[]): number {
  return movements.reduce((total, movement) => {
    if (movement.financialOperation === 'E') {
      return total + movement.amount
    }
    return total - movement.amount
  }, 0)
}

export function calculateTotalCash(
  openingBalance: number | undefined,
  movements: ICashMovement[]
): number {
  return (openingBalance ?? 0) + calculateTotalMovements(movements)
}
