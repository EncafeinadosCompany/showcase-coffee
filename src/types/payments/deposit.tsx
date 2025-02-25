
export interface deposit {
  id: number
  date: Date
  amount: number
  type_payment: string
  id_liquidation: number
  voucher: string
}

export interface DepositsModalProps {
  isOpen: boolean;
  onClose: () => void;
  liquidationId: number;
}