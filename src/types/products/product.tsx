export interface productType {
    id: string | number,
    name?: string,
    id_brand?: number,
    attributes?: Array<{ name: string, value: string }>
}