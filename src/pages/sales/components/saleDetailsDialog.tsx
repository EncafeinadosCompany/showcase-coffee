import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDate, formatCurrency } from "@/features/common/formatters/formatters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SaleDetailsDialogProps } from "@/types/transactions/salesModuleInterfaces";
import { getVariantById } from "@/features/products/variants/vatiantSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export const SaleDetailsDialog: React.FC<SaleDetailsDialogProps> = ({ sale, isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [variantNames, setVariantNames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchVariants = async () => {
      if (!sale) return;

      const variantPromises = sale.sales_variant.map(async (variant) => {
        try {
          const response = await dispatch(getVariantById(variant.id_variant_products)).unwrap();
          return { id: variant.id_variant_products, name: `${response.product.name} ${response.grammage} ` };
        } catch (error) {
          console.error("Error al obtener la variante:", error);
          return { id: variant.id_variant_products, name: "No encontrado" };
        }
      });

      const results = await Promise.all(variantPromises);
      setVariantNames((prev) => ({
        ...prev,
        ...Object.fromEntries(results.map((res) => [res.id, res.name])),
      }));
    };

    fetchVariants();
  }, [sale, dispatch]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-amber-800">Detalles de la Venta #{sale?.id}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-amber-800">Fecha</p>
              <p className="text-sm">{sale && formatDate(sale.date)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Método de Pago</p>
              <p className="text-sm capitalize">{sale?.type_payment}</p>
            </div>
          </div>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-amber-800">Producto</TableHead>
                  <TableHead className="text-amber-800">Cantidad</TableHead>
                  <TableHead className="text-amber-800">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale?.sales_variant.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell>{variantNames[variant.id_variant_products] || "Cargando..."}</TableCell>
                    <TableCell>{variant.quantity}</TableCell>
                    <TableCell>{formatCurrency(variant.subtotal)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-right">
            <p className="text-lg font-medium">Total: {sale && formatCurrency(sale.total)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
