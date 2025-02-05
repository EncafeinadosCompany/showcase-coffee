export interface productType
{
     
     id: number,
     name: string,
     id_brand?: number,
     status: boolean,
	 brand?: {
			name: string,
			description: string,
			id: number},
     attributes?: Array<{ id?:number, description:string; valor?: string, attributes_products?:{ valor:string} }>
     variants?: 
          Array<
          {id: string | number,
          grammage: string,
          stock: number,
          roasting_date: Date | string,
          shopping_price: number,
          sale_price: number,
          id_product: string | number,
          images?: Array<{url: string}>}>
    
}