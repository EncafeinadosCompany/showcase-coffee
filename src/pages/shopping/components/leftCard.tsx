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
import {toast} from "react-hot-toast"
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
 
  // Obtener el empleado y el ID de la tienda desde Redux
  const employee = useAppSelector((state) => state.auth.employee);
  const id_store = employee ? employee.id_store : null;

  // Estado para almacenar el ID del empleado seleccionado
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

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

    // Crear el objeto de compra
    const shoppingData: ShoppingData = {
      shopping: {
        id_store: id_store, // Usar el id_store
        id_employee: selectedEmployeeId, // Usar el ID del empleado seleccionado
        date_entry: new Date().toISOString(), // Fecha actual en formato ISO
        status: true,
      },
      details: cartProducts.map((product) => ({
        id_variant_products: product.id_variant_products,
        roasting_date: new Date(product.roasting_date).toISOString(), // Convertir a ISO
        quantity: product.quantity,
        shopping_price: product.shopping_price,
        sale_price: product.sale_price,
      })),
    };

    // Mostrar los datos enviados en la consola
    console.log("Datos enviados:", JSON.stringify(shoppingData, null, 2));

    try {
      // Enviar la compra al backend
      await createShopping(shoppingData);
      toast.success("La consignación se ha creado correctamente.");

      // Limpiar el carrito después de crear la compra
      setcartProducts([]);
      setSelectedEmployeeId(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error al crear la consignación:", error);
      toast.error(error.response?.data?.message || "No se pudo crear la consignación.");
    }
  };

  const handleCancelConsignment = () => {
    setcartProducts([]);
    setSelectedEmployeeId(null); 
  };

  return (
    <Card className="bg-white shadow-lg h-[calc(96vh-80px)] overflow-hidden ">
      <CardHeader>
        <CardTitle className="relative font-libre-baskerville text-2xl text-[#755841] pb-2">
          <span className="block text-sm uppercase tracking-wider text-amber-600 mb-1 font-sans opacity-80">
            Consignación
          </span>
          <span className="relative inline-block">
            Productos a consignar
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
          <SelectEmployee onSelect={(employeeId: number) => setSelectedEmployeeId(employeeId)} />
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