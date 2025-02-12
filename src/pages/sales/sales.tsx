import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

import { fetchSaleVariants, addSale, fetchSales } from "@/features/transactions/saleSlice";
import type { Sales, SalesPayload } from "@/types/transactions/saleModel";

import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ListIcon, XIcon } from "lucide-react";

import Products from "./components/products";
import Payment from "./components/payment";
import Cart from "./components/cart";
import { SalesTable } from "./saleslist";

export default function Sales() {
    const dispatch = useAppDispatch();
    const { saleVariants, sales } = useAppSelector((state) => state.sales);
    
    const [cartProducts, setCartProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [showSalesList, setShowSalesList] = useState(false);

    useEffect(() => {
        dispatch(fetchSaleVariants());
        dispatch(fetchSales());
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
            await dispatch(fetchSales());

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
    
        toast.error("Venta cancelada.", {
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

    const toggleSalesList = () => {
        setShowSalesList(!showSalesList);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h6 className="text-amber-600 text-5xl md:text-3xl font-extrabold">
                    Ventas
                </h6>
                <Button 
                    onClick={toggleSalesList}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    {showSalesList ? (
                        <>
                            <XIcon className="h-4 w-4" />
                            Cerrar Lista
                        </>
                    ) : (
                        <>
                            <ListIcon className="h-4 w-4" />
                            Ver Ventas
                        </>
                    )}
                </Button>
            </div>

            {showSalesList ? (
                <div className="mb-4">
                    <SalesTable sales={sales} />
                </div>
            ) : (
                <div className="flex gap-4">
                    <section className="w-[35%]">
                        <Products 
                            products={saleVariants} 
                            cartProducts={cartProducts} 
                            setCartProducts={setCartProducts} 
                        />
                    </section>

                    <section className="w-[40%]">
                        <Cart 
                            cartProducts={cartProducts} 
                            setCartProducts={setCartProducts} 
                            setTotal={setTotal} 
                        />
                    </section>

                    <section className="w-[25%]">
                        <Payment 
                            total={total} 
                            onCompleteSale={handleCompleteSale} 
                            onCancelSale={handleCancelSale} 
                        />
                    </section>
                </div>
            )}
        </div>
    );
}