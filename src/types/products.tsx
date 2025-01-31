export interface productType {
    id: number,
    name: string,
    id_brand: number,
    attributes: Array<{ name: string, value: string }>
}