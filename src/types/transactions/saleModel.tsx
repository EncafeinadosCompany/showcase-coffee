export interface Sales {
  date: string;
  type_payment: string;
}

export interface SaleDetail {
  id_variant_products: number;
  quantity: number;
}

export interface Sale {
  id: number;
  date: string;
  type_payment: string;
  total: string | null;
  status: boolean;
  created_at?: string;
  updated_at?: string;
  sales_variant: SaleVariant[];
}

export interface SalesPayload {
  sale: Sales;
  details: SaleDetail[];
}

export interface SaleVariant {
  id: number;
  id_sale: number;
  id_variant_products: number;
  quantity: number;
  subtotal: string;
  status: boolean;
  created_at?: string;
  updated_at?: string;
}

