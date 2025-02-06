export interface Shopping {
  id_store: number;
  id_employee: number;
  date_entry: string;
  status: boolean;
}

export interface ShoppingDetail {
  id_variant_products: number;
  roasting_date: string;
  quantity: number;
  shopping_price: number;
  sale_price: number;
}

export interface ShoppingData {
  shopping: Shopping;
  details: ShoppingDetail[];
}