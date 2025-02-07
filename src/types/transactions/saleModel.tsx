export interface Sales {
  date: string;
  type_payment: string;
}

export interface SaleDetail {
  id_variant_products: number;
  quantity: number;
}

export interface SalesPayload {
  sale: Sales;
  details: SaleDetail[];
}
