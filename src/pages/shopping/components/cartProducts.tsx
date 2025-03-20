import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { productType } from "@/types/products/product";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ShoppingDetail } from "@/types/transactions/shoppingModel";
import { Coffee, Minus, Plus, Trash2 } from "lucide-react";

export default function CartShopping({ 
  cartProducts, 
  setcartProducts, 
  products 
}: {
  products: productType[];
  cartProducts: ShoppingDetail[];
  setcartProducts: React.Dispatch<React.SetStateAction<ShoppingDetail[]>>;
}) {
  const { variants } = useAppSelector((state) => state.variants);
  const [inputValues, setInputValues] = useState<Record<string | number, string>>({});

  const updateQuantity = (variantId: string | number, newQuantity: number) => {
    const quantity = Math.max(0, newQuantity);
    
    setcartProducts((prev) => {
      if (quantity === 0) {
        return prev.filter((p) => Number(p.id_variant_products) !== Number(variantId));
      }
      
      return prev.map((p) =>
        Number(p.id_variant_products) === Number(variantId)
          ? { ...p, quantity }
          : p
      );
    });
  };

  const handleInputChange = (variantId: string | number, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [variantId]: value
    }));
  };

  const handleInputBlur = (variantId: string | number) => {
    const currentValue = inputValues[variantId] || '0';
    const numValue = parseInt(currentValue, 10) || 0;
    
    updateQuantity(variantId, numValue);
    
    if (numValue === 0) {
      setInputValues(prev => {
        const newValues = { ...prev };
        delete newValues[variantId];
        return newValues;
      });
    } else {
      setInputValues(prev => ({
        ...prev,
        [variantId]: numValue.toString()
      }));
    }
  };

  const changeVariant = (variantId: string | number, change: number) => {
    setcartProducts((prev) => {
      const product = prev.find((p) => Number(p.id_variant_products) === Number(variantId));
      const currentQuantity = product?.quantity ?? 0;
      const newQuantity = Math.max(0, currentQuantity + change);

      if (newQuantity === 0) {
        return prev.filter((p) => Number(p.id_variant_products) !== Number(variantId));
      }

      setInputValues(prev => ({
        ...prev,
        [variantId]: newQuantity.toString()
      }));

      return prev.map((p) =>
        Number(p.id_variant_products) === Number(variantId)
          ? { ...p, quantity: newQuantity }
          : p
      );
    });
  };

  const deleteVariant = (variantId: string | number) => {
    setcartProducts((prev) => 
      prev.filter((p) => Number(p.id_variant_products) !== Number(variantId))
    );
    setInputValues(prev => {
      const newValues = { ...prev };
      delete newValues[variantId];
      return newValues;
    });
  };

  return (
    <CardContent>
      <div className="space-y-3 p-2">
        {cartProducts.map((c, index) => {
          const variant = variants.find((v) => v.id === c.id_variant_products);
          const product = products.find((p) => p.id === variant?.id_product);
          const inputValue = inputValues[c.id_variant_products] ?? c.quantity?.toString() ?? '0';
          
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
                      <span className="text-sm text-gray-600 ml-1">
                        {variant?.grammage ?? "Variante desconocida"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                    onClick={() => variant?.id && changeVariant(c.id_variant_products.toString(), -1)}
                  >
                    <Minus className="h-3 w-3 text-amber-700" />
                  </Button>

                  <Input
                    type="number"
                    value={inputValue}
                    onChange={(e) => variant?.id && handleInputChange(c.id_variant_products.toString(), e.target.value)}
                    onBlur={() => variant?.id && handleInputBlur(c.id_variant_products.toString())}
                    className="w-16 h-8 text-center p-1 border-amber-200 focus:border-amber-300  "
                    min="0"
                  />

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                    onClick={() => variant?.id && changeVariant(c.id_variant_products.toString(), 1)}
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