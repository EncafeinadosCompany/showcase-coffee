import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchVariants } from "@/features/products/variants/vatiantSlice";
import { fetchProducts } from "@/features/products/products/productSlice";
import { fetchShopping } from "@/features/transactions/shoppingSlice";

import RightCard from "./components/rightCard";
import LeftCard from "./components/leftCard";
import { ShoppingDetail } from "@/types/transactions/shoppingModel";

export default function Shopping() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const [cartProducts, setCartProducts] = useState<ShoppingDetail[]>([]);

  useEffect(() => {
    dispatch(fetchVariants());
    dispatch(fetchProducts());
    dispatch(fetchShopping());
  }, [dispatch]);

  const totalCompra = cartProducts.reduce(
    (sum, producto) => sum + producto.shopping_price * producto.quantity,
    0
  );

  return (
    <div className="p-2 space-y-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="title">
          Gestión de Consignaciones
        </h1>
      </div>

      <div className="flex gap-4">
        <section className="w-[50%]">
          <RightCard
            products={products}
            cartProducts={cartProducts}
            setcartProducts={setCartProducts}
          />
        </section>

        <section className="w-[50%]">
          <LeftCard
            products={products}
            cartProducts={cartProducts}
            setcartProducts={setCartProducts}
            totalCompra={totalCompra}
          ></LeftCard>
        </section>
      </div>
    </div>
  );
}