import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Coffee, Search } from "lucide-react";
import { useState } from "react";

type ProductType = {
    id: number;
    sale_price: number;
    quantity: number;
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
                return nuevoCarrito.map((p) =>
                    Number(p.variant.id) === Number(producto.variant.id)
                        ? { ...p, quantity: (p.quantity || 0) + 1 }
                        : p
                );
            } else {
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
                            className="rounded pl-10"
                            placeholder="Buscar producto por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-700" />
                    </div>

                </div>
            </CardHeader>

            <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
                <Accordion type="single" collapsible className="w-full space-y-2">
                    {filteredProductNames.map((productName) => (
                        <AccordionItem
                            value={productName}
                            key={productName}
                            className="border rounded-lg overflow-hidden"
                        >
                            <AccordionTrigger className="px-4 py-3 hover:bg-amber-50">
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
                                            className="border-2 hover:border-amber-500 transition-all duration-200 w-full cursor-pointer"
                                            onClick={() => addProduct(product)}
                                        >
                                            <CardContent className="p-3 flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <h3 className="font-semibold text-lg text-gray-800">
                                                        {product.variant.grammage}
                                                    </h3>
                                                    <span className="px-3 py-1 bg-amber-100 rounded-full text-amber-800 text-sm self-center">
                                                        Stock: {product.variant.stock}
                                                    </span>
                                                </div>
                                                <p className="text-lg font-bold text-amber-800">
                                                    {product.sale_price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                                </p>
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