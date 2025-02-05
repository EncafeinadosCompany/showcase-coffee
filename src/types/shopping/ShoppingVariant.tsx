export interface ShoppingVariant {
    id:number | null;
    id_shopping:number;
    id_variant_products:number;
    roasting_date:Date | string;
    quantity: number;
    shopping_price: number;
    sale_price: number;
    status: boolean;
  }