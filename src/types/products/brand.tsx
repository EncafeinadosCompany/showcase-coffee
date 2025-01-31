export interface brandType {
    id?: string | number,
    name?: string,
    description?: string,
    products?: Array<{ id: string | number, name: string, status:boolean , create_at: string }>
}