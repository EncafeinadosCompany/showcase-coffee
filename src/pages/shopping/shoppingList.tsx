import React, { useState, useMemo, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchShoppingVariantsByShoppingId, fetchShopping } from "@/features/transactions/shoppingSlice";
import { Search } from "lucide-react";
import { formatDate, formatCurrency } from "@/features/common/formatters/formatters";
import { usePagination } from "@/components/hooks/usePagination";
import Paginator from "@/components/common/paginator";
import { ShoppingwhitDetail } from "@/types/transactions/shoppingModel";

const ShoppingTable = React.memo(() => {
  const dispatch = useAppDispatch();
  const { shopping, shoppingVariant, isLoading } = useAppSelector((state) => state.shopping);

  const [selectedShopping, setSelectedShopping] = useState<ShoppingwhitDetail | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar los datos de shopping al montar el componente
  useEffect(() => {
    dispatch(fetchShopping());
  }, [dispatch]);

  const handleShoppingClick = (shopping: ShoppingwhitDetail) => {
    setSelectedShopping(shopping);
    setIsDialogOpen(true);

    dispatch(fetchShoppingVariantsByShoppingId(String(shopping.id))).then((action) => {
      if (Array.isArray(action.payload)) {
        setSelectedShopping((prev) => ({
          ...prev!,
          shopping_variant: action.payload,
        }));
      }
    });
  };

  const filteredShopping = useMemo(() => {
    return shopping.filter(
      (item) =>
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(item.date_entry).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [shopping, searchTerm]);

  const pagination = usePagination<ShoppingwhitDetail>({
    initialItemsPerPage: 5,
  });

  const totalShoppingValue = useMemo(() => {
    if (!selectedShopping || !selectedShopping.shopping_variant) return 0;
    return selectedShopping.shopping_variant.reduce((total, variant) => total + (variant.shopping_price * variant.quantity), 0);
  }, [selectedShopping]);

  const currentPage = pagination.paginatedData(filteredShopping);

  return (
    <div className="space-y-1 h-full flex flex-col">
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Buscar por referencia o fecha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full pl-10"
          />
          <Search className="search" size={18} />
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur flex-1 flex flex-col max-h-[calc(100vh-150px)]">
        <CardContent className="p-0 flex-1 flex flex-col">
          <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-amber-50">
                  <TableHead className="text-amber-800">Referencia</TableHead>
                  <TableHead className="text-amber-800">Fecha</TableHead>
                  <TableHead className="text-amber-800">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPage.length > 0 ? (
                  currentPage.map((shopping) => (
                    <TableRow
                      key={shopping.id}
                      className="cursor-pointer hover:bg-amber-50 duration-150"
                      onClick={() => handleShoppingClick(shopping)}
                    >
                      <TableCell className="font-medium text-coffee-700">00{shopping.id}</TableCell>
                      <TableCell className="text-coffee-600">{formatDate(shopping.date_entry)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${shopping.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                        >
                          {shopping.status ? "Activo" : "Inactivo"}
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

          <div className="">
            <Paginator
              totalItems={filteredShopping.length}
              itemsPerPage={pagination.itemsPerPage}
              currentPage={pagination.currentPage}
              onPageChange={pagination.handlePageChange}
              onItemsPerPageChange={pagination.handleItemsPerPageChange}
              pageSizeOptions={[5, 10, 20, 50]}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent aria-describedby="shopping-details-description" className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-coffee-800">Detalles de la Consignación #{selectedShopping?.id}</DialogTitle>
            <DialogDescription id="shopping-details-description" className="text-coffee-600">
              Información detallada sobre la consignación seleccionada.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-coffee-500">Fecha</p>
                <p className="text-sm text-coffee-700">{selectedShopping && formatDate(selectedShopping.date_entry)}</p>
              </div>
            </div>
            <div className="mt-4">
              {isLoading ? (
                <p className="text-center text-coffee-600">Cargando detalles...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-coffee-100">
                      <TableHead className="text-coffee-700">Producto</TableHead>
                      <TableHead className="text-coffee-700">Gramaje</TableHead>
                      <TableHead className="text-coffee-700">Cantidad</TableHead>
                      <TableHead className="text-coffee-700">Precio de Compra</TableHead>
                      <TableHead className="text-coffee-700">Precio de Venta</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(shoppingVariant) &&
                      shoppingVariant.map((variant, index) => (
                        <TableRow key={`${variant.variant.id}-${index}`} className="hover:bg-coffee-50">
                          <TableCell className="text-coffee-800">{variant.variant.product?.name || "N/A"}</TableCell>
                          <TableCell className="text-coffee-700">{variant.variant.grammage || "N/A"}</TableCell>
                          <TableCell className="text-coffee-700">{variant.quantity || "N/A"}</TableCell>
                          <TableCell className="text-coffee-700">{formatCurrency(variant.shopping_price)}</TableCell>
                          <TableCell className="text-coffee-700">{formatCurrency(variant.sale_price)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="mt-6 text-right font-semibold text-sl text-coffee-800">
              Total consignado: {formatCurrency(totalShoppingValue)}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default ShoppingTable;