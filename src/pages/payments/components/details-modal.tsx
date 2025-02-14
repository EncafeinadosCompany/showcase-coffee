import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DetailsModalProps {
  isOpen: boolean
  onClose: () => void
  provider: {
    name: string
    totalDebt: number
    status: string
  }
}

export function DetailsModal({ isOpen, onClose, provider }: DetailsModalProps) {
  // Mock data for provider details
  const transactions = [
    { date: "2023-05-01", description: "Compra de café", amount: 500 },
    { date: "2023-05-15", description: "Abono parcial", amount: -200 },
    { date: "2023-06-01", description: "Compra de azúcar", amount: 300 },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-amber-50 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-amber-800">Detalles del Proveedor</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-amber-700 mb-2">{provider.name}</h3>
          <p className="text-amber-600 mb-1">Deuda Total: ${provider.totalDebt.toFixed(2)}</p>
          <p className="text-amber-600 mb-4">Estado: {provider.status}</p>
          <h4 className="text-md font-semibold text-amber-700 mb-2">Historial de Transacciones</h4>
          <Table>
            <TableHeader>
              <TableRow className="bg-amber-100">
                <TableHead className="text-amber-800">Fecha</TableHead>
                <TableHead className="text-amber-800">Descripción</TableHead>
                <TableHead className="text-amber-800">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index} className="hover:bg-amber-100">
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={transaction.amount < 0 ? "text-green-600" : "text-red-600"}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

