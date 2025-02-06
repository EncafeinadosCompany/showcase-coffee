import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchSaleVariants } from "@/features/transactions/saleSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

import Products from "./components/products";
import Cart from "./components/cart";
import Payment from "./components/payment";

export default function Sales() {
    const dispatch = useAppDispatch();
    const { saleVariants } = useAppSelector((state) => state.sales);

    console.log(saleVariants);
    const [cartProducts, setCartProducts] = useState<any[]>([]);

    useEffect(() => {
        dispatch(fetchSaleVariants());
    }, [dispatch]);

    const handleCompleteSale = (paymentMethod: string, receivedAmount: number) => {
        // Aquí manejas la lógica de completar la venta
        console.log('Venta completada:', { paymentMethod, receivedAmount, products: cartProducts });
        // Limpia el carrito después de completar la venta
        setCartProducts([]);
    };

    const handleCancelSale = () => {
        // Aquí manejas la lógica de cancelar la venta
        setCartProducts([]);
    };

    return (
        <div>
            <h6 className="text-4xl font-libre-baskerville text-[#4A3728] mb-4">
                Ventas
            </h6>
            <div className="flex gap-4">
                {/* Productos - más ancho para mejor visualización */}
                <section className="w-[35%]">
                    <Products products={saleVariants} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                </section>

                {/* Carrito y Pagos - comparten el espacio restante */}
                <section className="w-[40%]">
                    <Cart products={saleVariants} cartProducts={cartProducts} setCartProducts={setCartProducts} />
                </section>

                <section className="w-[25%]">
                    <Payment
                        total={cartProducts.reduce((total, product) => total + (product.sale_price * (product.stock ?? 0)), 0)}
                        onCompleteSale={handleCompleteSale}
                        onCancelSale={handleCancelSale}
                    />
                </section>
            </div>
        </div>
    );
}