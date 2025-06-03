export interface ICashMovement {
  amount: number
  cashRegisterId: string
  financialOperation: 'E' | 'S'
  notes?: string
  id?: string
  createdAt: Date
}
