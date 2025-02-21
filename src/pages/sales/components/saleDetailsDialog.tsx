import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Sale } from "@/types/transactions/saleModel";

interface SaleDetailsDialogProps {
  sale: Sale | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatCurrency = (amount: string | null) => {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(Number(amount));
};

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd/MM/yyyy HH:mm");
};

export const SaleDetailsDialog: React.FC<SaleDetailsDialogProps> = ({ sale, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalles de la Venta #{sale?.id}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha</p>
              <p className="text-sm">{sale && formatDate(sale.date)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Método de Pago</p>
              <p className="text-sm capitalize">{sale?.type_payment}</p>
            </div>
          </div>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Producto</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale?.sales_variant.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell>{variant.id_variant_products}</TableCell>
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
