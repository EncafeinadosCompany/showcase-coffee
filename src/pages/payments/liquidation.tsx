import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentModal } from "./components/payment-modal";
import DepositsModal from "./components/details-modal";
import { fetchLiquidations } from "@/features/payments/liquidations/liquidationSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Liquidation } from "@/types/payments/liquidation";
import { fetchTotalDepositsByLiquidation } from "@/features/payments/deposits/depositSlice";
import Paginator from "@/components/common/paginator";
import usePagination from "@/components/hooks/usePagination";


export default function LiquidationModule() {
  const { liquidations } = useAppSelector((state) => state.liquidations);
  const { deposits } = useAppSelector((state) => state.deposits);

  const [totalDeposits, setTotalDeposits] = useState<{ [key: number]: number }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<Liquidation | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filteredProviders, setFilteredProviders] = useState<Liquidation[]>([]);

  const dispatch = useAppDispatch();

  const pagination = usePagination<Liquidation>({
    initialItemsPerPage: 5
  });

  useEffect(() => {
    dispatch(fetchLiquidations());
  }, [dispatch]);

  useEffect(() => {
    liquidations.forEach((liquidation) => {
      dispatch(fetchTotalDepositsByLiquidation(liquidation.id.toString()));
    });
  }, [dispatch, liquidations]);

  useEffect(() => {
    const depositTotals: { [key: number]: number } = {};
    deposits.forEach((deposit) => {
      depositTotals[deposit.id_liquidation] = (depositTotals[deposit.id_liquidation] || 0) + deposit.amount;
    });
    setTotalDeposits(depositTotals);
  }, [deposits]);

  useEffect(() => {
    const filtered = liquidations.filter((provider) =>
      provider.provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProviders(filtered);
    pagination.setTotalItems(filtered.length);
  }, [liquidations, searchTerm]);

  const handlePayment = (provider: Liquidation) => {
    setSelectedProvider(provider);
    setIsPaymentModalOpen(true);
  };

  const handleDetails = (provider: Liquidation) => {
    setSelectedProvider(provider);
    setIsDetailsModalOpen(true);
  };

  const currentPage = pagination.paginatedData(filteredProviders);

  return (
    <div className="p-2 h-full space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="title">Gestión de Liquidaciones</h1>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Buscar deudas con proveedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/80 backdrop-blur rounded-full pl-10"
          />
          <Search className="search" />
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur flex-1 flex flex-col max-h-[calc(100vh-150px)]">
        <CardContent className="p-0">
          <div className="overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-amber-800">Nombre</TableHead>
                  <TableHead className="text-amber-800">Deuda Actual</TableHead>
                  <TableHead className="text-amber-800">Total Abonado</TableHead>
                  <TableHead className="text-amber-800">Estado</TableHead>
                  <TableHead className="text-amber-800">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPage.length === 0 ? (
                  searchTerm.trim() === "" ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <h3 className="text-xl font-semibold mb-2">
                          No hay liquidaciones disponibles
                        </h3>
                        <p className="text-muted-foreground">
                          ¡Realice una compra para comenzar!
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <h3 className="text-xl font-semibold mb-2">
                          No se encontraron Liquidaciones
                        </h3>
                        <p className="text-muted-foreground">
                          Intenta con otro término de búsqueda.
                        </p>
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  currentPage.map((provider) => (
                    <TableRow key={provider.id} className="hover:bg-amber-50">
                      <TableCell className="font-medium">{provider.provider.name}</TableCell>
                      <TableCell>
                        {provider.current_debt.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                      </TableCell>
                      <TableCell>
                        {(totalDeposits[provider.id] || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${provider.status === true ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                        >
                          Activo
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handlePayment(provider)}
                          className="mr-2 bg-amber-600 hover:bg-amber-500 text-white rounded-full"
                        >
                          Abono
                        </Button>
                        <Button
                          onClick={() => handleDetails(provider)}
                          variant="outline"
                          className="border-amber-600 text-amber-600 hover:bg-amber-100 rounded-full"
                        >
                          Ver detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {/* Paginador */}
          <div className="border-t">
            <Paginator
              totalItems={filteredProviders.length}
              itemsPerPage={pagination.itemsPerPage}
              currentPage={pagination.currentPage}
              onPageChange={pagination.handlePageChange}
              onItemsPerPageChange={pagination.handleItemsPerPageChange}
              pageSizeOptions={[5, 10, 20, 50]}
            />
          </div>
        </CardContent>
      </Card>

      {selectedProvider && (
        <>
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            liquidation={selectedProvider}
          />
          <DepositsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            liquidationId={selectedProvider.id}
          />
        </>
      )}
    </div>
  );
}