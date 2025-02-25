import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { SalesPayload } from "@/types/transactions/saleModel";
import { fetchSaleVariants, addSale, fetchSales } from "@/features/transactions/saleSlice";

import { Button } from "@/components/ui/button";
import { ListIcon, XIcon } from "lucide-react";

import Cart from "./components/cart";
import Payment from "./components/payment";
import Products from "./components/products";
import { SalesTable } from "./components/salesList";
import { showToast } from "@/features/common/toast/toastSlice";

export default function Sales() {
  const dispatch = useAppDispatch();
  const { saleVariants, sales } = useAppSelector((state) => state.sales);

  const [total, setTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [showSalesList, setShowSalesList] = useState(false);

  useEffect(() => {
    dispatch(fetchSaleVariants());
    dispatch(fetchSales());
  }, [dispatch]);

  const handleCompleteSale = async (paymentMethod: string) => {
    if (cartProducts.length === 0) {
      dispatch(showToast({ message: "No hay productos en el carrito.", type: "error" }));
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
      dispatch(showToast({ message: "¡Venta realizada con éxito!", type: "success" }));

      await dispatch(fetchSales());
      dispatch(fetchSaleVariants());

      setCartProducts([]);
      setTotal(0);

    } catch (error) {
      dispatch(showToast({ message: "Error al registrar la venta.", type: "error" }));
      console.error("Error al registrar la venta:", error);
    }
  };

  const handleCancelSale = () => {
    setCartProducts([]);
    setTotal(0);
    dispatch(showToast({ message: "Venta cancelada.", type: "info" }));
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
