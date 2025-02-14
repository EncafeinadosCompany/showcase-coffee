export interface Liquidation {
  id: number
  current_debt: number
  status: boolean
  provider: {name: string}
}
  