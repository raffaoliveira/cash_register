export interface IUpdateCashMovementDTO {
  amount: number
  financialOperation: 'E' | 'S'
  notes?: string
  id: string
}
