export interface IAddCashMovementDTO {
  amount: number
  financialOperation: 'E' | 'S'
  cashRegisterId: string
  notes?: string
}
