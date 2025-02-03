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
    
}