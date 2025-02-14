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

export interface ShoppingwitDetail {
  id: number; // Asegúrate de que este campo esté presente
  id_store: number;
  id_employee: number;
  date_entry: string;
  status: boolean;
  shopping_variant: ShoppingDetail[]; // Asegúrate de que este campo esté presente
}