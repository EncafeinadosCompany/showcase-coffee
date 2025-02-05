import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { productType } from "@/types/products/product";
import { ShoppingVariant } from "@/types/shopping/ShoppingVariant";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Coffee, Minus, Plus, Trash2 } from "lucide-react";

export default function CartShopping({ cartProducts, setcartProducts, products }:{
    products: productType[];
    cartProducts: ShoppingVariant[];
    setcartProducts: React.Dispatch<React.SetStateAction<ShoppingVariant[]>>;
}) {
  
  const { variants } = useAppSelector((state) => state.variants);

  const changeVariant = (varianteId: string | number, cantidad: number) => {
    setcartProducts((prev) => {
      return prev.map((p) =>
        Number(p.id_variant_products) === Number(varianteId)
          ? { ...p, quantity: Math.max(0, (p.quantity ?? 0) + cantidad) }
          : p
      );
    });
  };

  const deleteVariant = (varianteId: string | number) => {
    setcartProducts((prev) => prev.filter((p) => Number(p.id_variant_products) !== Number(varianteId)));
  };

  return (
    <CardContent>
      <div className="space-y-3 p-2">
        {cartProducts.map((c, index) => {
          const variant = variants.find((v) => v.id === c.id_variant_products);
          const product = products.find((p) => p.id === variant?.id_product);
          
          return (
            <div
              key={c.id_variant_products ?? `cart-item-${index}`}
              className="bg-amber-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 text-amber-700" />
                    <span className="font-medium text-gray-800">
                      {product?.name ?? "Producto desconocido"}
                      <span className="text-sm text-gray-600">
                        {variant?.grammage ?? "Variante desconocida"}g
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                    onClick={() => variant?.id && changeVariant(c.id_variant_products.toString(), -1)}
                  >
                    <Minus className="h-3 w-3 text-amber-700" />
                  </Button>
                  <span className="w-8 text-center font-medium text-gray-700">
                    {c.quantity ?? 0}
                  </span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                    onClick={() => variant?.id && changeVariant(variant.id.toString(), 1)}
                  >
                    <Plus className="h-3 w-3 text-amber-700" />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 border-red-200 hover:bg-red-50 hover:border-red-300"
                    onClick={() => variant?.id && deleteVariant(variant.id)}
                  >
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  );
}
