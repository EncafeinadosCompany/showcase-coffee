import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

interface SaleVariant {
  id: number;
  id_sale: number;
  id_variant_products: number;
  quantity: number;
  subtotal: string;
  status: boolean;
}

interface Sale {
  id: number;
  date: string;
  type_payment: string;
  total: string | null;
  status: boolean;
  sales_variant: SaleVariant[];
}

interface SalesTableProps {
  sales: Sale[];
  onSaleClick?: (sale: Sale) => void;
}

export const SalesTable = React.memo(({ sales, onSaleClick }: SalesTableProps) => {
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaleClick = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDialogOpen(true);
    if (onSaleClick) {
      onSaleClick(sale);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  };

  const formatCurrency = (amount: string | null) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(Number(amount));
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
                <TableHead>Método de Pago</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow
                  key={sale.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSaleClick(sale)}
                >
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{formatDate(sale.date)}</TableCell>
                  <TableCell className="capitalize">{sale.type_payment}</TableCell>
                  <TableCell>{formatCurrency(sale.total)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sale.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sale.status ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Venta #{selectedSale?.id}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Fecha</p>
                <p className="text-sm">{selectedSale && formatDate(selectedSale.date)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Método de Pago</p>
                <p className="text-sm capitalize">{selectedSale?.type_payment}</p>
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
                  {selectedSale?.sales_variant.map((variant) => (
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
              <p className="text-lg font-medium">
                Total: {selectedSale && formatCurrency(selectedSale.total)}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});