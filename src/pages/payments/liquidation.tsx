"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { PaymentModal } from "./components/payment-modal"
import DepositsModal from "./components/details-modal"; import { fetchLiquidations } from "@/features/payments/liquidations/liquidationSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { Liquidation } from "@/types/payments/liquidation"
import { fetchTotalDepositsByLiquidation } from "@/features/payments/deposits/depositSlice"

export default function LiquidationModule() {

  const { liquidations } = useAppSelector((state) => state.liquidations)
  const { deposits } = useAppSelector((state) => state.deposits);

  const [totalDeposits, setTotalDeposits] = useState<{ [key: number]: number }>({});
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<Liquidation | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLiquidations())
  }, [dispatch])

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

  const itemsPerPage = 5
  const filteredProviders = liquidations.filter((provider) =>
    provider.provider.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage)
  const paginatedProviders = filteredProviders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => { setCurrentPage(page) }

  const handlePayment = (provider: Liquidation) => {
    setSelectedProvider(provider)
    setIsPaymentModalOpen(true)
  }

  const handleDetails = (provider: Liquidation) => {
    setSelectedProvider(provider)
    setIsDetailsModalOpen(true)
  }

  return (
    <div className="p-2 h-full space-y-3">

      <div className="flex justify-between items-center">
        <h1 className="title">
          Gestión de Liquidaciones
        </h1>
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

      <Card className="bg-white/80 backdrop-blur">
        <CardContent className="p-0">
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
              {paginatedProviders.map((provider) => (
                <TableRow key={provider.id} className="hover:bg-amber-50">
                  <TableCell className="font-medium">{provider.provider.name}</TableCell>
                  <TableCell>{provider.current_debt.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</TableCell>
                  <TableCell>{(totalDeposits[provider.id] || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</TableCell>
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
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                    className={`${currentPage === index + 1 ? "bg-amber-600 hover:bg-amber-500" : "bg-amber-100 hover:bg-amber-200"
                      } rounded-full text-white`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
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
  )
}

