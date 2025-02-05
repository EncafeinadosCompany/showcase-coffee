import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { productType } from "@/types/products/product";
import { variantType } from "@/types/products/variant";
import { Coffee, Minus, Plus, Trash2 } from "lucide-react";

export default function CartShopping({ cartProducts, setcartProducts, products }:{
    products: productType[];
    cartProducts: variantType[];
    setcartProducts: React.Dispatch<React.SetStateAction<variantType[]>>;
}) {
    
    const changeVariant = (varianteId: string | number, cantidad: number ) => {
        setcartProducts((prev) => {
          const nuevoCarrito = structuredClone(prev); 
          return nuevoCarrito.map((p) => {
            if (Number(p.id) === Number(varianteId)) {
              return {
                ...p,
                stock: Math.max(0, (p.stock ?? 0) + cantidad), 
              };
            }
            return p;
          });
        });
      };
    
    const deleteVariant = (varianteId: string | number) => {
        setcartProducts((prev) => prev.filter((p) => Number(p.id) !== Number(varianteId)));
    };

    const handleStockChange = (varianteId: string | number, newStock: number) => {
        setcartProducts((prev) => {
            const nuevoCarrito = structuredClone(prev);
            return nuevoCarrito
                .map((p) => {
                    if (Number(p.id) === Number(varianteId)) {
                        return {
                            ...p,
                            stock: Math.max(0, newStock),
                        };
                    }
                    return p;
                })
                .filter((p) => p.stock > 0); // Elimina los productos con stock 0
        });
    };

    return (
        <CardContent>
            <div className="space-y-3 p-2">
                {cartProducts.map((variant) => (
                    variant.id !== null && (
                    <div
                        key={variant.id}
                        className="bg-amber-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Coffee className="h-4 w-4 text-amber-700" />
                                    <span className="font-medium text-gray-800">
                                        {products.find((e) => variant.id_product === e.id)?.name || "undefined"}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {variant.grammage}
                                    </span>
                                </div>
                                <p className="text-amber-800 font-semibold">
                                    ${variant.sale_price}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                                    onClick={() =>
                                        variant.id !== null &&
                                        changeVariant(variant.id.toString(), -1)
                                    }
                                >
                                    <Minus className="h-3 w-3 text-amber-700" />
                                </Button>

                                <input
                                    type="text"
                                    className="w-16 text-center font-medium text-gray-700"
                                    value={variant.stock}
                                    onChange={(e) =>
                                        handleStockChange(variant.id.toString(), Number(e.target.value))
                                    }
                                />

                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                                    onClick={() =>
                                        variant.id !== null &&
                                        changeVariant(variant.id.toString(), 1)
                                    }
                                >
                                    <Plus className="h-3 w-3 text-amber-700" />
                                </Button>

                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 border-red-200 hover:bg-red-50 hover:border-red-300"
                                    onClick={() =>
                                        variant.id !== null && deleteVariant(variant.id)
                                    }
                                >
                                    <Trash2 className="h-3 w-3 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    )
                ))}
            </div>
        </CardContent>
    );
}
