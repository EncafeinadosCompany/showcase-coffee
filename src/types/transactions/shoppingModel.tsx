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

export interface ShoppingwhitDetail {
  id: number;
  id_store: number;
  id_employee: number;
  date_entry: string;
  status: boolean;
  shopping_variant: ShoppingDetail[];
}

export interface ShoppingwhitDetail2 {
  id_store: number;
  id_employee: number;
  date_entry: string;
  status: boolean;
  shopping_variant: ShoppingDetail[];
}


export interface ShoppingDetails {
  id_shopping: number
  sale_price: number
  quantity: number
  variant: {
    id: number
    grammage: string
    stock: number
    product: {
      id: number
      name: string
    }
  }
}

export interface ShoppingwitDetails {
  id: number
  id_store: number
  id_employee: number
  date_entry: string
  status: boolean
  shopping_variant: ShoppingDetails[]
}

export interface ShoppingTableProps {
  shopping: ShoppingwitDetail[]
  onShoppingClick?: (shopping: ShoppingwitDetail) => void
}

export interface ShoppingWithoutId{
  id_store: number
  id_employee: number
  date_entry: string
  status: boolean
}

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
  id: number;
  id_store: number;
  id_employee: number;
  date_entry: string;
  status: boolean;
  shopping_variant: ShoppingDetail[];
}



export interface ShoppingDetails {
  id_shopping: number
  sale_price: number
  quantity: number
  variant: {
    id: number
    grammage: string
    stock: number
    product: {
      id: number
      name: string
    }
  }
}

export interface ShoppingwitDetails {
  id: number
  id_store: number
  id_employee: number
  date_entry: string
  status: boolean
  shopping_variant: ShoppingDetails[]
}

export interface ShoppingTableProps {
  shopping: ShoppingwitDetail[]
  onShoppingClick?: (shopping: ShoppingwitDetail) => void
}

export interface ShoppingWithoutId{
  id_store: number
  id_employee: number
  date_entry: string
  status:boolean
}