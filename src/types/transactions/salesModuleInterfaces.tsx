import { Sale } from "./saleModel";

export interface SalesTableProps {
  sales: Sale[];
  onSaleClick?: (sale: Sale) => void;
}

export interface SaleDetailsDialogProps {
  sale: Sale | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface SalesFiltersProps {
  sales: Sale[];
  onFilterChange: (filteredSales: Sale[]) => void;
}

export interface PaymentSectionProps {
  total: number;
  onCompleteSale: (paymentMethod: string) => void;
  onCancelSale: () => void;
}

export interface CartProduct {
    variant: any;
    id: number;
    id_product: number;
    grammage: string;
    sale_price: number;
    quantity: number;
    name: string;
}

export interface CartProps {
    cartProducts: CartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}

export type ProductType = {
  id: number;
  sale_price: number;
  quantity: number;
  remaining_quantity: number;
  variant: {
    id: number;
    grammage: string;
    stock: number;
    product: {
      id: number;
      name: string;
    };
  };
};