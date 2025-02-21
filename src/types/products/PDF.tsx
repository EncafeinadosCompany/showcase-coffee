export interface Attribute {
    description: string;
    attributes_products: {
        value: string;
    };
}

export interface Brand {
    name: string;
    description: string;
}

export interface ProductVariant {
    grammage: string;
    stock: number;
    id_product: number | string;
}

export interface Product {
    product_name: string;
    imagen?: string;
    variants: ProductVariant[];
    brand?: Brand;
    attributes?: Attribute[];
    description?: string;
}