export interface variantType {
id: string | number | null ,
grammage: string,
stock: number,
roasting_date: Date | string,
shopping_price: number,
sale_price: number,
id_product: string | number,
images?: Array<{url: string}>,
}