
export interface variantType {
id?: string | number | null ,
grammage: string,
stock?: number,
id_product: string | number,
image_url: string,
}

export interface VariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId:number,
  variants: { grammage: string; stock: number; id_product: number | string }[];
  product_name: string;
  imagen?: string;
  brand?: {
    name: string;
    description: string;
  };
  attributes?: {
    description: string;
    id: number;
    attributes_products: {
      value: string;
    };
  }[];
}

export interface Variant {
  grammage: string;
  stock: number;
  id_product: number | string;
}