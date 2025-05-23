export interface productType
{
     
     id: number ,
     name: string,
     id_brand?: number,
     image_url?: string | undefined,
     status: boolean,
	 brand?: {
			name: string,
			description: string,
			id: number},
     attributes?: Array<{ id?:number, description:string; value?: string, attributes_products?:{ value:string} }>
     product?: 
          Array<
          {id: string | number,
          grammage: string,
          stock: number,
          id_product: string | number,
          images?: Array<{url: string}>}>
    
}