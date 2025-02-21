import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coffee, Search } from "lucide-react";

import FormShopping from "./formShopping";
import NewVariantDialog from "./newVariants";
import { ShoppingDetail } from "@/types/transactions/shoppingModel";
import { productType } from "@/types/products/product";
import { useState } from "react";

export default function RightCard({
  products,
  cartProducts,
  setcartProducts,
}: {
  products: productType[];
  cartProducts: ShoppingDetail[];
  setcartProducts: React.Dispatch<React.SetStateAction<ShoppingDetail[]>>;
}) {
  const [searchTerm, setSearch] = useState("");
  const productosFiltrados = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-white shadow-lg h-[calc(96vh-80px)] overflow-hidden">
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
        <div className="flex gap-2 mb-2">
          <div className="relative w-full">
            <Input
              className="rounded pl-10"
              placeholder="Buscar producto por nombre..."
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-700" />
          </div>
        </div>
        <ScrollArea className="min-h-[50px] transition-all duration-300">
          <Accordion type="single" collapsible className="w-full mb-2">
            {productosFiltrados.map((producto) => (
              <AccordionItem value={producto.id.toString()} key={producto.id}>
                <AccordionTrigger className="text-left">
                  {producto.name}
                </AccordionTrigger>
                <AccordionContent className="overflow-hidden">
                  <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-6xl">
                      {producto.product?.map((variante) => (
                        <Card
                          key={variante.id}
                          className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 w-full max-w-sm"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">
                                  {/* {producto.name} */}
                                </h3>
                                <p className="text-sm text-gray-600 break-words">
                                  {variante.grammage}
                                </p>
                              </div>
                              <Coffee className="h-5 w-5 text-amber-700 flex-shrink-0" />
                            </div>

                            <div className="mt-3 space-y-2">
                              <FormShopping
                                variant_id={Number(variante.id)}
                                cartProducts={cartProducts}
                                setcartProducts={setcartProducts}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <NewVariantDialog productoId={producto.id} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
