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
     attributes?: Array<{ id?:number, description:string; value?: string, attributes_products?:{ value:string} }>
     variants?: 
          Array<
          {id: string | number,
          grammage: string,
          stock: number,
          id_product: string | number,
          images?: Array<{url: string}>}>
    
}