import { useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchVariants } from "@/features/products/variants/vatiantSlice";
import { fetchProducts} from "@/features/products/products/productSlice";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import { Coffee,Search} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import NuevaVarianteDialog from "./components/newVariants";
import { variantType } from "@/types/products/variant";
import CartShopping from "./components/cartProducts";

export default function Shopping() {

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const [searchTerm, setSearch] = useState("");
  const [cartProducts, setcartProducts] = useState<variantType[]>([]);
  const [currentProduct, setcurrentProduct] = useState({
    id: 0,
    name: "",
    quantity: 0,
    roastingDate: "",
    shoppingPrice: 0,
    salePrice: 0,
    porcentage: 0,
  });

  useEffect(() => {
    dispatch(fetchVariants());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const searchProduct = () => {
    try {
      const productFound = products.find((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (productFound) {
        setcurrentProduct({
          ...currentProduct,
          id: productFound.id,
          name: productFound.name,
        });
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al buscar producto:", error);
    }
  };

  const agregarProducto = (variante: variantType) => {
    setcartProducts((prev) => {
      const nuevoCarrito = structuredClone(prev); 

      const productoEnCarrito = nuevoCarrito.find(
        (p) => Number(p.id) === Number(variante.id)
      );

      if (productoEnCarrito) {
        return nuevoCarrito.map((p) =>
          Number(p.id) === Number(variante.id)
            ? { ...p, stock: (p.stock || 0) + 1 } 
            : p
        );
      } else {
        return [...nuevoCarrito, { ...variante, stock: 1 }]; 
      }
    });
  };

  const productosFiltrados = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ESTO SERVIRA MÁS ADELANTE, NO BORRAR!!

  // const totalCompra = cartProducts.reduce((sum, producto) => sum + producto.shoppingPrice * producto.quantity, 0);

  return (
    <div>
      <h1 className="text-4xl font-libre-baskerville text-[#4A3728] p-4 mb-8">
        Consignaciones
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-white shadow-lg h-[500px] overflow-hidden">
          <CardHeader>
          <div className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-amber-700" />
          <CardTitle className="font-libre-baskerville text-2xl text-[#4A3728]">
            <span className="block text-sm font-sans text-amber-600 uppercase tracking-wider mb-1">
              Productos Disponibles
            </span>
            Buscar y Agregar Producto
          </CardTitle>
        </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Buscar producto"
                value={searchTerm}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={searchProduct}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-500px)] p-5">
              <Accordion type="single" collapsible className="w-full">
                {productosFiltrados.map((producto) => (
                  <AccordionItem
                    value={producto.id.toString()}
                    key={producto.id}
                  >
                    <AccordionTrigger>{producto.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {producto.variants?.map((variante) => (
                          <Card
                            key={variante.id}
                            className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-800">
                                    {producto.name}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {variante.grammage}g
                                  </p>
                                </div>
                                <Coffee className="h-5 w-5 text-amber-700" />
                              </div>

                              <div className="mt-3 space-y-2">
                                <div className="text-xs text-gray-600">
                                  Fecha de tostión:
                                  <span className="ml-1 font-medium">
                                    {new Date(
                                      variante.roasting_date
                                    ).toLocaleDateString()}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-bold text-amber-800">
                                    ${variante.sale_price}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Stock: {variante.stock}
                                  </span>
                                </div>

                                <button
                                  onClick={() => agregarProducto(variante)}
                                  className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                  Agregar
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <NuevaVarianteDialog productoId={producto.id} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg h-[500px] overflow-hidden">
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
              <CartShopping cartProducts={cartProducts} setcartProducts={setcartProducts} products={products}></CartShopping>
          <CardFooter>
            {/* <div>Total: ${totalCompra.toFixed(2)}</div> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
