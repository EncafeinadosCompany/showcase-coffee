import { Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { productType } from "@/types/products/product";
import { ShoppingVariant } from "@/types/shopping/ShoppingVariant";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartShopping from "./cartProducts";

export default function LeftCard(
    {products, cartProducts, setcartProducts, totalCompra}:{
        products: productType[];
        cartProducts: ShoppingVariant[];
        setcartProducts: React.Dispatch<React.SetStateAction<ShoppingVariant[]>>;
        totalCompra: number;
    }
) {

    return (
        <Card className="bg-white shadow-lg h-[730px] overflow-hidden">
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
                <CartShopping cartProducts={cartProducts} setcartProducts={setcartProducts} products={products}></CartShopping> 
            </ScrollArea>
        <CardFooter>
            <div className="w-auto mx-auto">
            <h1>Aqui ira el select del proveedor</h1>
            <button className="w-full mt-2  bg-[#36270b] hover:bg-[#3a2d11] text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-200"> Generar consignación</button>
            <button className="w-full mt-2  bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-200  "> Cancelar consignación</button>
            </div>
            <div>
                <h1 className="text-xl">Total: ${totalCompra.toFixed(2)}</h1>
            </div>
          </CardFooter>
        </Card>
    )
}