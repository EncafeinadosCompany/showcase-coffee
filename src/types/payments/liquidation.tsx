export interface Liquidation {
  id: number
  current_debt: number
  total_paid?: number
  status: boolean
  provider: {name: string}
}
  