import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchVariants } from "@/features/products/variants/vatiantSlice";
import { fetchProducts} from "@/features/products/products/productSlice";
import { ShoppingVariant } from "@/types/shopping/ShoppingVariant";
import RightCard from "./components/rightCard";
import LeftCard from "./components/leftCard";

export default function Shopping() {

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  
  const [cartProducts, setcartProducts] = useState<ShoppingVariant[]>([]);
 


  useEffect(() => {
    dispatch(fetchVariants());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  // ESTO SERVIRA MÁS ADELANTE, NO BORRAR!!
  const totalCompra = cartProducts.reduce((sum, producto) => sum + producto.shopping_price * producto.quantity, 0);

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2">
        <RightCard products={products} cartProducts={cartProducts} setcartProducts={setcartProducts}></RightCard>
        <LeftCard  products= {products} cartProducts={cartProducts} setcartProducts={setcartProducts} totalCompra={totalCompra}></LeftCard>
      </div>
    </div>
  );
}
