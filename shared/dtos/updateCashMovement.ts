export interface updateCashMovementDTO {
  amount: number
  financialOperation: 'E' | 'S'
  notes?: string
  id: string
}
