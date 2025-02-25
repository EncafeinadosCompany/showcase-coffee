import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coffee, Minus, Plus, Trash2} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";


interface CartProduct {
    variant: any;
    id: number;
    id_product: number;
    remaining_quantity: number;
    grammage: string;
    sale_price: number;
    quantity: number;
    name: string;
}

interface CartProps {
    cartProducts: CartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}

export default function Cart({ cartProducts, setCartProducts, setTotal }: CartProps) {

    useEffect(() => {
        setTotal(calculateTotal());
    }, [cartProducts, setTotal]);


    const changeVariant = (variantId: number, quantity: number, price: number) => {
        setCartProducts((prev) =>
            prev.map((p) =>
                Number(p.variant.id) === Number(variantId) && p.sale_price === price
                    ? { ...p, quantity: Math.min(p.remaining_quantity, Math.max(0, (p.quantity ?? 0) + quantity)) }
                    : p
            ).filter(p => p.quantity > 0)
        );
    };

    const deleteVariant = (variantId: number, price: number) => {
        console.log(variantId, price)
        setCartProducts((prev) =>
            prev.filter((p) => !(Number(p.variant.id) === Number(variantId) && Number(p.sale_price) === Number(price)))
        );
    };

    const handleQuantityChange = (
        variantId: number,
        price: number,
        value: string,
        setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>
    ) => {
        const newQuantity = value ? Number(value) : 1;
        if (!isNaN(newQuantity)) {
            setCartProducts((prev) =>
                prev.map((p) =>
                    p.variant.id === variantId && p.sale_price === price
                        ? { ...p, quantity: Math.min(p.remaining_quantity, Math.max(1, newQuantity)) }
                        : p
                )
            );
        }
    };

    const handleBlur = (
        variantId: number,
        value: string,
        price: number,
        setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>
    ) => {
        if (!value) {
            setCartProducts((prev) =>
                prev.map((p) =>
                    p.variant.id === variantId && p.sale_price === price ? { ...p, quantity: 1 } : p
                )
            );
        }
    };

    const calculateTotal = () => {
        return cartProducts.reduce((total, variant) => total + (variant.sale_price * (variant.quantity ?? 0)), 0);
    };

    const CartItem = ({ variant }: { variant: CartProduct }) => (
        <div className="bg-amber-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Coffee className="h-4 w-4 text-amber-700" />
                        <span className="font-medium text-gray-800">
                            {variant.variant.product.name} {variant.variant.grammage}
                        </span>
                    </div>
                    <p className="text-amber-800 font-semibold">
                        {variant.sale_price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                        onClick={() => variant.variant.id && changeVariant(variant.variant.id, -1, variant.sale_price)}
                        disabled={!variant.quantity}
                    >
                        <Minus className="h-3 w-3 text-amber-700" />
                    </Button>

                    <Input
                        type="currency"
                        value={variant.quantity}
                        min={1}
                        max={variant.variant.stock}
                        className="w-12 h-8 text-center p-1 border-amber-200 focus:border-amber-300"
                        onChange={(e) => handleQuantityChange(variant.variant.id, variant.sale_price, e.target.value, setCartProducts)}
                        onBlur={(e) => handleBlur(variant.variant.id, e.target.value, variant.sale_price, setCartProducts)}
                    />

                    <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                        onClick={() => variant.variant.id && changeVariant(variant.variant.id, 1, variant.sale_price)}
                    >
                        <Plus className="h-3 w-3 text-amber-700" />
                    </Button>

                    <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 border-red-200 hover:bg-red-50 hover:border-red-300"
                        onClick={() => variant.variant.id  && variant.sale_price && deleteVariant(variant.variant.id, variant.sale_price)}
                    >
                        <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <Card className="bg-white shadow-lg h-[calc(100vh-120px)] overflow-hidden">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Coffee className="h-6 w-6 text-amber-700" />
                    <CardTitle className="text-lg font-semibold text-[#4A3728]">
                        Carrito
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[350px]">
                    <div className="space-y-3 p-2">
                        {cartProducts.length === 0 ? (
                            <div className="text-center py-12 mx-auto">
                                <h3 className="text-xl font-semibold mb-2">
                                    No hay productos en el carrito
                                </h3>
                                <img
                                    width={"55%"}
                                    className="mx-auto"
                                    src="./public/undraw_add-to-cart_c8f2.svg"
                                    alt="Carrito vacío"
                                />
                            </div>
                        ) : (
                            cartProducts.map((variant, index) => (
                                <CartItem key={`${variant.id}-${variant.sale_price}-${index}`} variant={variant} />
                            ))
                        )}
                    </div>
                </ScrollArea>


                <CardFooter className="border-t mt-auto">
                    <div className="flex w-full justify-between items-center">
                        <span className="text-lg font-semibold text-[#4A3728]">Total:</span>
                        <span className="text-2xl font-bold text-[#755841]">
                            {calculateTotal().toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                        </span>
                    </div>
                </CardFooter>

            </CardContent>

        </Card>
    );
}