import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

import { fetchSaleVariants, addSale } from "@/features/transactions/saleSlice";
import type { Sales, SalesPayload } from "@/types/transactions/saleModel";

import { toast } from "react-hot-toast";

import Products from "./components/products";
import Payment from "./components/payment";
import Cart from "./components/cart";

export default function Sales() {
    const dispatch = useAppDispatch();
    const { saleVariants } = useAppSelector((state) => state.sales);

    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        dispatch(fetchSaleVariants());
    }, [dispatch]);

    const handleCompleteSale = async (paymentMethod: string) => {
        if (cartProducts.length === 0) {
            toast.error("No hay productos en el carrito.");
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
            await dispatch(addSale(saleData)).unwrap(); 

            toast.success("¡Venta realizada con éxito!", {
                icon: "✅",
                duration: 4000,
                style: { 
                    background: "#FFF8E1",
                    color: "#6D4C41",
                    border: "1px solid #4E342E",
                    padding: "12px",
                    borderRadius: "8px",
                    fontWeight: "bold"
                }
            });            
    
            setCartProducts([]);
            setTotal(0);
    
            dispatch(fetchSaleVariants());
        } catch (error) {
            toast.error("Error al registrar la venta.", {
                duration: 4000,
                style: { background: "#d32f2f", color: "#fff" },
            });
            console.error("Error al registrar la venta:", error);
        }
    };
    
    const handleCancelSale = () => {
        setCartProducts([]);
        setTotal(0);
    
        toast.error("Error al registrar la venta.", {
            icon: "❌",
            duration: 4000,
            style: { 
                background: "#B71C1C",
                color: "#FFEBEE",
                border: "1px solid #7F0000",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold"
            }
        });
        
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
