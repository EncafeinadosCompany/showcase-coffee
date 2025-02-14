import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchShoppingVariantsByShoppingId } from "@/features/transactions/shoppingSlice";

// Modelos corregidos
interface ShoppingDetail {
    id_shopping: number;
    sale_price: number;
    quantity: number;
    variant: {
        id: number;
        grammage: string;
        stock: number;
        product: {
            id: number;
            name: string;
        };
    };
}

interface ShoppingwitDetail {
    id: number;
    id_store: number;
    id_employee: number;
    date_entry: string;
    status: boolean;
    shopping_variant: ShoppingDetail[];
}

interface ShoppingTableProps {
    shopping: ShoppingwitDetail[];
    onShoppingClick?: (shopping: ShoppingwitDetail) => void;
}

export const ShoppingTable = React.memo(({ shopping, onShoppingClick }: ShoppingTableProps) => {
    const dispatch = useAppDispatch();
    const { shoppingVariant, isLoading } = useAppSelector((state) => state.shopping);

    const [selectedShopping, setSelectedShopping] = useState<ShoppingwitDetail | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleShoppingClick = (shopping: ShoppingwitDetail) => {
        setSelectedShopping(shopping);
        setIsDialogOpen(true);

        dispatch(fetchShoppingVariantsByShoppingId(shopping.id))
            .then((action) => {
                if (Array.isArray(action.payload)) {
                    setSelectedShopping((prev) => ({
                        ...prev!,
                        shopping_variant: action.payload,
                    }));
                }
            });

        if (onShoppingClick) {
            onShoppingClick(shopping);
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "dd/MM/yyyy HH:mm");
    };

    const formatCurrency = (amount: number | null) => {
        if (!amount) return "N/A";
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
        }).format(amount);
    };

    return (
        <>
            <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shopping.map((shopping) => (
                                <TableRow
                                    key={shopping.id}
                                    className="cursor-pointer hover:bg-gray-50"
                                    onClick={() => handleShoppingClick(shopping)}
                                >
                                    <TableCell className="font-medium">{shopping.id}</TableCell>
                                    <TableCell>{formatDate(shopping.date_entry)}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${shopping.status
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {shopping.status ? "Activo" : "Inactivo"}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent aria-describedby="shopping-details-description" className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Detalles de la Compra #{selectedShopping?.id}</DialogTitle>
                        <DialogDescription id="shopping-details-description">
                            Información detallada sobre la compra seleccionada.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Fecha</p>
                                <p className="text-sm">{selectedShopping && formatDate(selectedShopping.date_entry)}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            {isLoading ? (
                                <p className="text-center">Cargando detalles...</p>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Producto</TableHead>
                                            <TableHead>Gramage</TableHead>
                                            <TableHead>Cantidad</TableHead>
                                            <TableHead>Precio de Compra</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Array.isArray(shoppingVariant) &&
                                            shoppingVariant.map((variant, index) => (
                                                <TableRow key={`${variant.variant.id}-${index}`}>
                                                    <TableCell>{variant.variant.product?.name || "N/A"}</TableCell>
                                                    <TableCell>{variant.variant.grammage || "N/A"}</TableCell>
                                                    <TableCell>{variant.quantity || "N/A"}</TableCell>
                                                    <TableCell>{formatCurrency(variant.shopping_price)}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
});
