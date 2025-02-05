import { ShoppingVariant } from './ShoppingVariant';

export interface Shopping {
    id:number;
    id_store:number;
    id_employees:number;
    date_entry: Date;
    status:Boolean;
    detail:Array<ShoppingVariant>;
  }