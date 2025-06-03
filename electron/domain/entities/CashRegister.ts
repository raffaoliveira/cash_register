export class CashRegister {
  constructor(
    public readonly openingBalance: number,
    public readonly openedAt: Date,
    public readonly closedAt?: Date,
    public readonly closingBalance?: number,
    public readonly id?: string
  ) {
    if (openingBalance < 0) {
      throw new Error('Opening balance cannot be negative')
    }
  }
}
