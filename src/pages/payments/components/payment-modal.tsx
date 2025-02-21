"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { addDeposit } from "@/features/payments/deposits/depositSlice"
import { addImages } from "@/features/images/imageSlice"
import { fetchLiquidations } from "@/features/payments/liquidations/liquidationSlice"
import toast from "react-hot-toast"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  liquidation: { id: number, current_debt: number, provider: { name: string } }
}

export function PaymentModal({ isOpen, onClose, liquidation }: PaymentModalProps) {
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [reference, setReference] = useState("")
  const dispatch = useAppDispatch()

  useEffect(() => {

    if (Number(paymentAmount) > liquidation.current_debt) {
      toast.error("El valor a pagar no puede ser mayor a la deuda actual", {
        id: "paymentError"
      })
    }
    console.log(paymentAmount)
  }, [paymentAmount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imageUrl = "";
    if (paymentType === "transferencia" || paymentType === "tarjeta") {
      const fileInput = document.getElementById("reference") as HTMLInputElement
      const file = fileInput.files?.[0]
      if (file) {

        const response = await dispatch(addImages(file))
        imageUrl = response.payload.image_url
      }
    }

    await dispatch(addDeposit({
      date: new Date(),
      amount: Number(paymentAmount),
      voucher: imageUrl,
      type_payment: paymentType,
      id_liquidation: liquidation.id,
    }))


    dispatch(fetchLiquidations())
    setPaymentType("")
    setPaymentAmount("")
    setReference("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-amber-50">
        <DialogHeader>
          <DialogTitle className="text-amber-800">Realizar Abono</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className="text-right text-amber-700">
                Proveedor
              </Label>
              <Input id="provider" value={liquidation.provider.name} disabled className="col-span-3 bg-amber-100" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="totalDebt" className="text-right text-amber-700">
              Deuda Total
              </Label>
              <Input
              id="totalDebt"
              value={`COP $${liquidation.current_debt.toLocaleString("es-CO", { minimumFractionDigits: 2 })}`}
              disabled
              className="col-span-3 bg-amber-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentType" className="text-right text-amber-700">
                Tipo de Pago
              </Label>
              <Select onValueChange={setPaymentType} required>
                <SelectTrigger className="col-span-3 border-amber-300 focus:ring-amber-500">
                  <SelectValue placeholder="Seleccione el tipo de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(paymentType === "transferencia" || paymentType === "tarjeta") && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reference" className="text-right text-amber-700">
                  Referencia
                </Label>
                <div className="col-span-3">
                  <Input
                    id="reference"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        // You can handle the file upload here
                        // For now, we'll just set the file name as the reference
                        setReference(file.name)
                      }
                    }}
                    className="border-amber-300 focus:ring-amber-500"
                    required
                  />
                  {reference && <p className="mt-2 text-sm text-amber-600">Archivo seleccionado: {reference}</p>}
                </div>
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentAmount" className="text-right text-amber-700">
                Valor a Pagar
              </Label>
              <Input
                id="paymentAmount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="col-span-3 border-amber-300 focus:ring-amber-500"
                required
              />
            </div>

          </div>
          <DialogFooter>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white">
              Realizar Abono
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

