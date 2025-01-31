export interface productType
{
     product: {
     id?: number
     name?: string
     id_brand?: number
    }
     attributes?: Array<{ description: string; value: string }>
    
    // brands?: Array<{
    //   id: number
    //   name: string
    // }>
}