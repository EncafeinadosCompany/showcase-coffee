"use client"

import React, { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { fetchShoppingVariantsByShoppingId } from "@/features/transactions/shoppingSlice"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

// Interfaces remain the same
interface ShoppingDetail {
  id_shopping: number
  sale_price: number
  quantity: number
  variant: {
    id: number
    grammage: string
    stock: number
    product: {
      id: number
      name: string
    }
  }
}

interface ShoppingwitDetail {
  id: number
  id_store: number
  id_employee: number
  date_entry: string
  status: boolean
  shopping_variant: ShoppingDetail[]
}

interface ShoppingTableProps {
  shopping: ShoppingwitDetail[]
  onShoppingClick?: (shopping: ShoppingwitDetail) => void
}

export const ShoppingTable = React.memo(({ shopping, onShoppingClick }: ShoppingTableProps) => {
  const dispatch = useAppDispatch()
  const { shoppingVariant, isLoading } = useAppSelector((state) => state.shopping)

  const [selectedShopping, setSelectedShopping] = useState<ShoppingwitDetail | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleShoppingClick = (shopping: ShoppingwitDetail) => {
    setSelectedShopping(shopping)
    setIsDialogOpen(true)

    dispatch(fetchShoppingVariantsByShoppingId(String(shopping.id))).then((action) => {
      if (Array.isArray(action.payload)) {
        setSelectedShopping((prev) => ({
          ...prev!,
          shopping_variant: action.payload,
        }))
      }
    })

    if (onShoppingClick) {
      onShoppingClick(shopping)
    }
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm")
  }

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "N/A"
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(amount)
  }

  const filteredShopping = useMemo(() => {
    return shopping.filter(
      (item) =>
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(item.date_entry).toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [shopping, searchTerm])

  const paginatedShopping = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredShopping.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredShopping, currentPage])

  const totalPages = Math.ceil(filteredShopping.length / itemsPerPage)

  return (
    <div className="p-2 space-y-3">

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

      <Card className="bg-white/80 backdrop-blur">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referencia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedShopping.map((shopping) => (
                <TableRow
                  key={shopping.id}
                  className="cursor-pointer hover:bg-coffee-50 transition-colors duration-150"
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-coffee-600">
          Mostrando {paginatedShopping.length} de {filteredShopping.length} resultados
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-coffee-700">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent aria-describedby="shopping-details-description" className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-coffee-800">Detalles de la Compra #{selectedShopping?.id}</DialogTitle>
            <DialogDescription id="shopping-details-description" className="text-coffee-600">
              Información detallada sobre la compra seleccionada.
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
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
})

