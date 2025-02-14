import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchVariants } from "@/features/products/variants/vatiantSlice";
import { fetchProducts } from "@/features/products/products/productSlice";
import { fetchShopping } from "@/features/transactions/shoppingSlice";

import { Button } from "@/components/ui/button";
import { ListIcon, XIcon } from "lucide-react";

import RightCard from "./components/rightCard";
import LeftCard from "./components/leftCard";
import { ShoppingTable } from "./shoppingList";
import { ShoppingDetail } from "@/types/transactions/shoppingModel";

export default function Shopping() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { shopping } = useAppSelector((state) => state.shopping);

  const [cartProducts, setCartProducts] = useState<ShoppingDetail[]>([]);
  const [showShoppingList, setShowShoppingList] = useState(false);

  useEffect(() => {
    dispatch(fetchVariants());
    dispatch(fetchProducts());
    dispatch(fetchShopping());
  }, [dispatch]);

  const totalCompra = cartProducts.reduce(
    (sum, producto) => sum + producto.shopping_price * producto.quantity,
    0
  );

  const toggleShoppingList = () => {
    setShowShoppingList(!showShoppingList);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h6 className="text-amber-600 text-5xl md:text-3xl font-extrabold">
          Consignaciones
        </h6>
        <Button
          onClick={toggleShoppingList}
          variant="outline"
          className="flex items-center gap-2"
        >
          {showShoppingList ? (
            <>
              <XIcon className="h-4 w-4" />
              Cerrar Lista
            </>
          ) : (
            <>
              <ListIcon className="h-4 w-4" />
              Ver consignaciones
            </>
          )}
        </Button>
      </div>

      {showShoppingList ? (
        <div className="mb-4">
          <ShoppingTable shopping={shopping} />
        </div>
      ) : (
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
      )}
    </div>
  );
}