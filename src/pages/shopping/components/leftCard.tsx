import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { productType } from "@/types/products/product";
import { ShoppingDetail, ShoppingData } from "@/types/transactions/shoppingModel";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartShopping from "./cartProducts";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useToast } from "@/components/hooks/use-toast";
import { createShopping } from "@/features/transactions/shoppingService";
import SelectEmployee from "./selectEmployee";

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
  const { toast } = useToast();

  // Obtener el empleado y el ID de la tienda desde Redux
  const employee = useAppSelector((state) => state.auth.employee);
  const id_store = employee ? employee.id_store : null;

  const handleGenerateConsignment = async () => {
    if (!id_store) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se ha asignado una tienda.",
      });
      return;
    }

    if (cartProducts.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No hay productos en la consignación.",
      });
      return;
    }

    // Crear el objeto de compra
    const shoppingData: ShoppingData = {
      shopping: {
        id_store: id_store, // Usar el id_store
        id_employee: 2, // Cambiar a "id_employee"
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
      toast({
        title: "Éxito",
        description: "La consignación se ha creado correctamente.",
      });

      // Limpiar el carrito después de crear la compra
      setcartProducts([]);
    } catch (error: any) {
      console.error("Error al crear la consignación:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "No se pudo crear la consignación.",
      });
    }
  };

  return (
    <Card className="bg-white shadow-lg h-[calc(100vh-80px)] overflow-hidden ">
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
          <SelectEmployee/>
          {/* Botón para generar la consignación */}
          <button
            onClick={handleGenerateConsignment}
            className="w-full mt-2 bg-[#36270b] hover:bg-[#3a2d11] text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-200"
          >
            Generar consignación
          </button>
          <button className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-200">
            Cancelar consignación
          </button>
        </div>
        <div className="w-[40%] justify-end flex flex-col gap-2">
            <span className="text-lg font-semibold text-[#4A3728]">Total a consignar:</span>
            <span className="text-2xl font-bold text-[#755841]">${totalCompra.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}