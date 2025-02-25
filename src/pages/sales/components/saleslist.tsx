import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatCurrency } from "@/features/common/formatters/formatters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Sale, Sales } from "@/types/transactions/saleModel";
import { SaleDetailsDialog } from "./saleDetailsDialog";
import { SalesFilters } from "./saleFilters";

import Paginator from "@/components/common/paginator";
import usePagination from "@/components/hooks/usePagination";
import { SalesTableProps } from "@/types/transactions/salesModuleInterfaces";

export const SalesTable = React.memo(({ sales, onSaleClick }: SalesTableProps) => {
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredSales, setFilteredSales] = useState<Sale[]>(sales);

  const pagination = usePagination<Sales>({
    initialItemsPerPage: 5
  });

  const handleSaleClick = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDialogOpen(true);
    if (onSaleClick) {
      onSaleClick(sale);
    }
  };

  const currentPage = pagination.paginatedData(filteredSales);

  return (
    <div className="space-y-1 h-full flex flex-col">
      <SalesFilters sales={sales} onFilterChange={setFilteredSales} />

      <Card className="bg-white/80 backdrop-blur flex-1 flex flex-col max-h-[calc(100vh-150px)]">
        <CardContent className="p-0 flex-1 flex flex-col">

          <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)]">
            <Table className="">
              <TableHeader>
                <TableRow className="hover:bg-amber-50">
                  <TableHead className="text-amber-800">ID</TableHead>
                  <TableHead className="text-amber-800">Fecha</TableHead>
                  <TableHead className="text-amber-800">Método de Pago</TableHead>
                  <TableHead className="text-amber-800">Total</TableHead>
                  <TableHead className="text-amber-800">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPage.length > 0 ? (
                  currentPage.map((sale) => (
                    <TableRow
                      key={sale.id}
                      className="cursor-pointer hover:bg-amber-50"
                      onClick={() => handleSaleClick(sale)}
                    >
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{formatDate(sale.date)}</TableCell>
                      <TableCell className="capitalize">{sale.type_payment}</TableCell>
                      <TableCell>{formatCurrency(sale.total)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${sale.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {sale.status ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No se encontraron resultados con los filtros aplicados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginador (siempre visible) */}
          <div className="border-t">
            <Paginator
              totalItems={filteredSales.length}
              itemsPerPage={pagination.itemsPerPage}
              currentPage={pagination.currentPage}
              onPageChange={pagination.handlePageChange}
              onItemsPerPageChange={pagination.handleItemsPerPageChange}
              pageSizeOptions={[5, 10, 20, 50]}
            />
          </div>
        </CardContent>
      </Card>

      <SaleDetailsDialog
        sale={selectedSale}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
});