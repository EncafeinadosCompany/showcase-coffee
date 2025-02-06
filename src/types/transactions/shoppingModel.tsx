import { ShoppingVariant } from './ShoppingVariant';

export interface Shopping {
    id:number;
    id_store:number;
    id_employees:number;
    date_entry: Date;
    status:boolean;
    detail:Array<ShoppingVariant>;
  }

export interface ShoppingVariant2 {
  shopping: {
    id_store: number;
    id_employee: number;
    date_entry: string;
  };
  details: {
    id_variant_products: number;
    roasting_date: string;
    quantity: number;
    shopping_price: number;
    sale_price: number;
  }
}