import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchSaleVariants, addSale, fetchSales } from "@/features/transactions/saleSlice";
import type { SalesPayload } from "@/types/transactions/saleModel";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ListIcon, XIcon } from "lucide-react";

import Products from "./components/products";
import Payment from "./components/payment";
import Cart from "./components/cart";
import { SalesTable } from "./components/saleslist";
import { showToast } from "@/features/common/toast/toastSlice";

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
      details: cartProducts.map((product) => ({
        id_shopping_variant: product.id,
        id_variant_products: product.variant.id,
        sale_price: product.sale_price,
        quantity: product.quantity,
      })),
    };

    try {
      await dispatch(addSale(saleData)).unwrap();
      await dispatch(fetchSales());

      dispatch(showToast({ message: "¡Venta realizada con éxito!", type: "success" }));

      setCartProducts([]);
      setTotal(0);

      dispatch(fetchSaleVariants());
    } catch (error) {
      toast.error("Error al registrar la venta.");
      console.error("Error al registrar la venta:", error);
    }
  };

  const handleCancelSale = () => {
    setCartProducts([]);
    setTotal(0);
    dispatch(showToast({ message: "Venta cancelada.", type: "error" }));
  };

  const toggleSalesList = () => {
    setShowSalesList(!showSalesList);
  };

  return (
    <div className="h-full w-full p-2 space-y-3 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="title">Ventas</h1>
        <Button
          onClick={toggleSalesList}
          variant="outline"
          className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium"
        >
          {showSalesList ? (
            <>
              <XIcon className="h-4 w-4" /> Cerrar Lista
            </>
          ) : (
            <>
              <ListIcon className="h-4 w-4" /> Ver Historial de Ventas
            </>
          )}
        </Button>
      </div>

      {showSalesList ? (
        <SalesTable sales={sales} />
      ) : (
        <div className="flex gap-4 h-full w-full">
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
      )}
    </div>
  );
}
