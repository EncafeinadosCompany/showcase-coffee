import { useState, useEffect } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"

import { fetchVariants } from "@/features/products/variants/vatiantSlice";
import { fetchProducts, getID} from "@/features/products/products/productSlice";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Minus, Plus, Search, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NuevaVarianteDialog from "./components/newVariants";
import { variantType } from "@/types/products/variant";
import { productType } from "@/types/products/product";

export default function Shopping() {

  const dispatch = useAppDispatch();

  const { variants } = useAppSelector((state) => state.variants);
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
        setcurrentProduct({ ...currentProduct, id: productFound.id, name: productFound.name });
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al buscar producto:", error);
    }
  };

  // const addProduct = () => {
  //   if (
  //     currentProduct.name &&
  //     currentProduct.quantity > 0 &&
  //     currentProduct.roastingDate &&
  //     currentProduct.shoppingPrice > 0 &&
  //     currentProduct.porcentage >= 0
  //   ) {
  //     const salePrice = currentProduct.shoppingPrice * (1 + currentProduct.porcentage / 100);
  //     setcartProducts([...cartProducts, { ...currentProduct, salePrice }]);
  //     setcurrentProduct({
  //       id: 0,
  //       name: "",
  //       quantity: 0,
  //       roastingDate: "",
  //       shoppingPrice: 0,
  //       salePrice: 0,
  //       porcentage: 0,
  //     });
  //     setSearch("");
  //   }
  // };

  // const deleteProduct = (id: number) => {
  //   setcartProducts(cartProducts.filter((producto) => producto.id !== id));
  // };

 


  const changeVariant = (productoId: string | number, varianteId: string | number, cantidad: number) => {
    console.log("Cambio de variante:", productoId, varianteId, cantidad);
  
    setcartProducts((prev) => {
      const nuevoCarrito = structuredClone(prev); // Clona el estado para evitar mutaciones
  
      return nuevoCarrito.map((p) => {
        if (Number(p.id) === Number(varianteId)) {
          return {
            ...p,
            stock: Math.max(0, (p.stock ?? 0) + cantidad), // Asegura que stock nunca sea undefined
          };
        }
        return p;
      });
    });
  };


  const deleteVariant = (varianteId: string | number) => {
    console.log("Eliminando variante con ID:", varianteId);
  
    setcartProducts((prev) =>
      prev.filter((p) => Number(p.id) !== Number(varianteId)) // Filtra y deja solo los que NO coincidan con el ID
    );
  };
  

  const agregarProducto = (variante: variantType) => {
    setcartProducts((prev) => {
      const nuevoCarrito = structuredClone(prev); // Clona el estado para asegurar la actualización
  
      // Buscar si la variante ya está en el carrito
      const productoEnCarrito = nuevoCarrito.find((p) => Number(p.id) === Number(variante.id));
  
      if (productoEnCarrito) {
        return nuevoCarrito.map((p) =>
          Number(p.id) === Number(variante.id)
            ? { ...p, stock: (p.stock || 0) + 1 } // Solo incrementa stock
            : p
        );
      } else {
        return [...nuevoCarrito, { ...variante, stock: 1 }]; // Agrega nuevo producto con stock=1
      }
    });
  };
 
  const productosFiltrados = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // const totalCompra = cartProducts.reduce((sum, producto) => sum + producto.shoppingPrice * producto.quantity, 0);

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#4A3728] p-4 mb-8">Compras de Café</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-white shadow-lg h-[500px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-[#4A3728]">Buscar y Agregar Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input placeholder="Buscar producto" value={searchTerm} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchProduct}><Search className="h-4 w-4" /></Button>

            </div>
          <ScrollArea className="h-[calc(100vh-500px)] p-5">
          <Accordion type="single" collapsible className="w-full">
            {productosFiltrados.map((producto) => (
              <AccordionItem value={producto.id.toString()} key={producto.id}>
                <AccordionTrigger>{producto.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {producto.variants?.map((variante) => (
                      <Card key={variante.id}>
                        <CardHeader>
                          <CardTitle>
                            {producto.name} - {variante.grammage}g
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-4">
                          <AspectRatio ratio={1 / 1} className="w-24">
                          {/* <img
                            src={variante?.images?.map(e)|| "/public"}
                            alt={producto.name}
                            className="rounded-full object-cover w-full h-full"
                          /> */}
                          </AspectRatio>
                            <div>
                              <p>Fecha de tostión: {variante.roasting_date.toString()}</p>
                              <p>Precio: ${variante.sale_price}</p>
                              <p>Stock: {variante.stock}</p>
                            </div>
                          </div>
                          <Button
                            className="mt-2 bg-[#6F4E37] hover:bg-[#5A3E2B] text-white w-full"
                            onClick={() => agregarProducto(variante)}
                          >
                            Agregar
                          </Button>
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
        <Card className="bg-white shadow-lg h-[450px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-[#755841]">Productos en la Compra</CardTitle>
        
          </CardHeader>
          <CardContent>
           
            <ScrollArea className="h-[calc(100vh-200px)]">
              {cartProducts.map((variant) => (
                <div key={variant.id} className="mb-2 p-2 border rounded flex items-center justify-between">
                  <div>
                    <p>
                      {products.find((e) => variant.id_product === e.id)?.name || "undefined"} - {variant.grammage}g
                    </p>
                    <p>Precio: ${variant.sale_price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => changeVariant(variant.id_product.toString(), variant.id.toString(), -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{variant.stock}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => changeVariant(variant.id_product.toString(), variant.id.toString(), 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteVariant(variant.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            {/* <div>Total: ${totalCompra.toFixed(2)}</div> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}