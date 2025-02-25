import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { productType } from "@/types/products/product";
import { ShoppingDetail, ShoppingData } from "@/types/transactions/shoppingModel";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartShopping from "./cartProducts";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createShopping } from "@/features/transactions/shoppingService";
import SelectEmployee from "./selectEmployee";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { showToast } from "@/features/common/toast/toastSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function LeftCard({
  products,
  cartProducts,
  setcartProducts,
  totalCompra,
}: {
  products: productType[];
  cartProducts: ShoppingDetail[];
  setcartProducts: React.Dispatch<React.SetStateAction<ShoppingDetail[]>>;
  totalCompra: number;
}) {

  const dispatch = useAppDispatch();
  const employee = useAppSelector((state) => state.auth.employee);
  const id_store = employee ? employee.id_store : null;

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [update, setUpdate] = useState(false);

  const handleGenerateConsignment = async () => {
    if (!id_store) {
      toast.error("No se ha asignado una tienda.")
      return;
    }

    if (!selectedEmployeeId) {
      toast.error("No se ha seleccionado un empleado.")
      return;
    }

    if (cartProducts.length === 0) {
      toast.error("No hay productos en la consignación.")
      return;
    }

    const shoppingData: ShoppingData = {
      shopping: {
        id_store: id_store,
        id_employee: selectedEmployeeId,
        date_entry: new Date().toISOString(),
        status: true,
      },
      details: cartProducts.map((product) => ({
        id_variant_products: product.id_variant_products,
        roasting_date: new Date(product.roasting_date).toISOString(),
        quantity: product.quantity,
        shopping_price: product.shopping_price,
        sale_price: product.sale_price,
      })),
    };

    try {
      await createShopping(shoppingData);
      dispatch(showToast({ message: "¡Consignación registrada con éxito!", type: "success" }));

      setcartProducts([]);
      setUpdate(true)

    } catch (error: any) {
      console.error("Error al crear la consignación:", error);
      dispatch(showToast({ message: error.response?.data?.message || "Error al registrar la consignación.", type: "error" }));

    }
  };

  const handleCancelConsignment = () => {
    setcartProducts([]);
    setSelectedEmployeeId(null);
  };

  return (
    <Card className="bg-white shadow-lg h-[calc(96vh-80px)] overflow-hidden ">
      <CardHeader>
        <CardTitle className="relative font-libre-baskerville text-2xl text-[#755841]">
          <span className="block text-sm uppercase tracking-wider text-amber-600 font-sans opacity-80">
            Consignación
          </span>
          <span className="relative inline-block text-[#4A3728]">
            Productos a Consignar
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-200"></span>
          </span>
        </CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-400px)]">
        <CartShopping
          cartProducts={cartProducts}
          setcartProducts={setcartProducts}
          products={products}
        />
      </ScrollArea>
      <CardFooter className="gap-20 border-t mt-auto ">
        <div className="w-[60%] flex flex-col gap-2">
          {/* Pasar la función onSelect a SelectEmployee */}
          <SelectEmployee update={update} onSelect={(employeeId: number) => setSelectedEmployeeId(employeeId)} />
          {/* Botón para generar la consignación */}
          <button
            onClick={handleGenerateConsignment}
            className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white  py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-200"
          >
            Generar consignación
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex w-full items-center gap-6 mt-2 py-2 px-4 bg-white hover:bg-slate-200 text-black border-[2px] rounded-2xl text-sm font-medium transition-colors duration-200">
                <ChevronLeft />
                Cancelar consignación
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Confirmar Cancelación
                </AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro que deseas cancelar esta consignación? Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Volver</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancelConsignment} className="bg-red-500 hover:bg-red-500">
                  Sí, cancelar consignación
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="w-[25%] flex flex-col gap-2 justify-center text-center">
          <span className="text-lg font-semibold text-[#4A3728] mb-3 ">Total a consignar:</span>
          <span className="text-xl font-bold text-[#755841]">
            {totalCompra.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}