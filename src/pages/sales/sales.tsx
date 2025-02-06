import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchSaleVariants } from "@/features/transactions/saleSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

import Products from "./saleProducts";
import Cart from "./salesCart";

export default function Sales() {
    const dispatch = useAppDispatch();
    const { saleVariants } = useAppSelector((state) => state.sales);

    console.log(saleVariants);
    const [cartProducts, setCartProducts] = useState<any[]>([]);

    useEffect(() => {
        dispatch(fetchSaleVariants());
    }, [dispatch]);

    return (
        <div>
            <h6 className="text-4xl font-libre-baskerville text-[#4A3728] mb-4">
                Ventas
            </h6>
            <div className="grid gap-8 md:grid-cols-2">
                <section>
                    <Products products={saleVariants} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                </section>
                <section>
                    <Cart products={saleVariants} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                </section>
            </div>
        </div>
    );
}