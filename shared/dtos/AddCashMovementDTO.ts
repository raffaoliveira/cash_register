export interface AddCashMovementDTO {
  amount: number
  financialOperation: 'E' | 'S'
  cashRegisterId: string
  notes?: string
}
