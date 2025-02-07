import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchSaleVariants, addSale } from "@/features/transactions/saleSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

import Products from "./components/products";
import Cart from "./components/cart";
import Payment from "./components/payment";
import type { Sales, SalesPayload } from "@/types/transactions/saleModel";

export default function Sales() {
    const dispatch = useAppDispatch();
    const { saleVariants } = useAppSelector((state) => state.sales);

    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0); // Nuevo estado para el total

    useEffect(() => {
        dispatch(fetchSaleVariants());
    }, [dispatch]);

    const handleCompleteSale = (paymentMethod: string) => {
        if (cartProducts.length === 0) {
            console.error("No hay productos en el carrito.");
            return;
        }

        const saleData: SalesPayload = {
            sale: {
                date: new Date().toISOString(),
                type_payment: paymentMethod,
            },
            details: cartProducts.map(product => ({
                id_variant_products: product.variant.id,
                quantity: product.quantity,
            }))
        };

        try {
            dispatch(addSale(saleData));
            
            console.log("Venta registrada con éxito:", saleData);

            setCartProducts([]);
            setTotal(0); 

            dispatch(fetchSaleVariants());
        } catch (error) {
            console.error("Error al registrar la venta:", error);
        }
    };

    const handleCancelSale = () => {
        setCartProducts([]);
        setTotal(0);  
    };

    return (
        <div>
            <h6 className="text-4xl font-libre-baskerville text-[#4A3728] mb-4">
                Ventas
            </h6>
            <div className="flex gap-4">

                <section className="w-[35%]">
                    <Products products={saleVariants} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                </section>

                <section className="w-[40%]">
                    <Cart cartProducts={cartProducts} setCartProducts={setCartProducts} setTotal={setTotal} />
                </section>

                <section className="w-[25%]">
                    <Payment total={total} onCompleteSale={handleCompleteSale} onCancelSale={handleCancelSale} />
                </section>
            </div>
        </div>
    );
}
