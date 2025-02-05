export interface getProductsType {
    
    id: Number,
	name: string,
	status: boolean,
	brand: {
			name: string,
			description: string,
			id: number},
    attributes?: Array<{ description:string; id:number, attributes_products:{ valor:string} }>
}
