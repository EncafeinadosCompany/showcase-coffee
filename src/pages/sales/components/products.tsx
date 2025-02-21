import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Separator } from "@radix-ui/react-select";
import { Coffee, Search } from "lucide-react";
import { useState } from "react";

type ProductType = {
    id: number;
    sale_price: number;
    quantity: number;
    remaining_quantity: number;
    variant: {
        id: number;
        grammage: string;
        stock: number;
        product: {
            id: number;
            name: string;
        }
    }
}

export default function Products({
    products = [],
    setCartProducts
}: {
    products: ProductType[];
    cartProducts: ProductType[];
    setCartProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}) {
    const [searchTerm, setSearch] = useState("");

    const addProduct = (producto: ProductType) => {
        setCartProducts((prev) => {
            const nuevoCarrito = structuredClone(prev);
            const productoEnCarrito = nuevoCarrito.find((p) => Number(p.variant.id) === Number(producto.variant.id));

            if (productoEnCarrito) {
                if (productoEnCarrito.quantity < producto.variant.stock) {
                    return nuevoCarrito.map((p) =>
                        Number(p.variant.id) === Number(producto.variant.id)
                            ? { ...p, quantity: (p.quantity || 0) + 1 }
                            : p
                    );
                } else {
                    return nuevoCarrito;
                }
            } else {
                if (producto.variant.stock > 0) {
                    return [
                        ...nuevoCarrito,
                        {
                            ...producto,
                            quantity: 1,
                            variant: {
                                ...producto.variant,
                                product: { ...producto.variant.product }
                            }
                        },
                    ];
                } else {
                    return nuevoCarrito;
                }
            }
        });
    };

    const groupedProducts = products.reduce((acc, product) => {
        const productName = product.variant?.product?.name;
        if (!productName) return acc;

        if (!acc[productName]) {
            acc[productName] = [];
        }
        acc[productName].push(product);
        return acc;
    }, {} as Record<string, ProductType[]>);

    const filteredProductNames = Object.keys(groupedProducts).filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    console.log(groupedProducts)
    return (
        <Card className="bg-white shadow-lg h-[calc(100vh-120px)] overflow-hidden">
            <CardHeader className="py-3">
                <div className="flex items-center gap-2">
                    <Coffee className="h-6 w-6 text-amber-700" />
                    <CardTitle className="text-lg font-semibold text-[#4A3728]">
                        Productos Disponibles
                    </CardTitle>
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="relative w-full">
                        <Input
                            className=" pl-10 rounded-full"
                            placeholder="Buscar producto por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-700" />
                    </div>

                </div>
            </CardHeader>

            <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
                <Accordion type="single" collapsible className="w-full space-y-2 ">
                    {filteredProductNames.map((productName) => (
                        <AccordionItem
                            value={productName}
                            key={productName}
                            className="border rounded-xl overflow-hidden hover:bg-amber-50"
                        >
                            <AccordionTrigger className="px-4 py-3 ">
                                <div className="flex items-center gap-2">
                                    <Coffee className="h-5 w-5 text-amber-700" />
                                    <span className="font-semibold">{productName}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-2">
                                <div className="flex flex-col gap-2">
                                    {groupedProducts[productName].map((product) => (
                                       <Card
                                       key={product.variant.id}
                                       className="group relative overflow-hidden border-2 hover:border-coffee-500 transition-all duration-200 w-full cursor-pointer bg-white"
                                       onClick={() => addProduct(product)}
                                     >
                                       <CardContent className="p-4">
                                         <div className="flex flex-col gap-3">
                                           {/* Header with grammage and coffee icon */}
                                           <div className="flex items-center justify-between">
                                             <h3 className="text-xl font-semibold text-coffee-800 flex items-center gap-2">
                                               <Coffee className="h-5 w-5 text-coffee-600" />
                                               {product.variant.grammage}
                                             </h3>
                                             <p className="text-lg font-bold text-coffee-700">
                                               {product.sale_price.toLocaleString("es-CO", {
                                                 style: "currency",
                                                 currency: "COP",
                                               })}
                                             </p>
                                           </div>
                                 
                                           <Separator className="bg-coffee-100" />
                                 
                                           {/* Stock information */}
                                           <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-2">
                                               <Badge variant="outline" className="bg-coffee-50 text-coffee-700 border-coffee-200">
                                                 Stock disponible: {product.variant.stock}
                                               </Badge>
                                             </div>
                                             <Badge variant="secondary" className="bg-coffee-100 text-coffee-800 hover:bg-coffee-200">
                                               Lote: {product.remaining_quantity}
                                             </Badge>
                                           </div>
                                         </div>
                                 
                                         {/* Hover effect overlay */}
                                         <div className="absolute inset-0 bg-coffee-500/0 group-hover:bg-coffee-500/5 transition-colors duration-200" />
                                       </CardContent>
                                     </Card>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}