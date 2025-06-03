export class CashMovement {
  constructor(
    public readonly amount: number,
    public readonly cashRegisterId: string,
    public readonly financialOperation: 'E' | 'S',
    public readonly notes?: string,
    public readonly id?: string,
    public readonly createdAt?: Date
  ) {}
}
