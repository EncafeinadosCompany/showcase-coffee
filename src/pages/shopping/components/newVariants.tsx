import { variantType } from "@/types/products/variant";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { fetchVariants, addVariant } from "@/features/products/variants/vatiantSlice";


export default function NuevaVarianteDialog({
    productoId,
  }: { productoId: number}) {
    const [gramaje, setGramaje] = useState("")
    const [fechaTostion, setFechaTostion] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [precioCompra, setPrecioCompra] = useState("")
    const [porcentajeVenta, setPorcentajeVenta] = useState("")
    const [precioVenta, setPrecioVenta] = useState("")
    const { variants} = useAppSelector((state) => state.variants);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (precioCompra && porcentajeVenta) {
        const precio = Number.parseFloat(precioCompra)
        const porcentaje = Number.parseFloat(porcentajeVenta)
        const nuevoPrecioVenta = precio * (1 + porcentaje / 100)
        setPrecioVenta(nuevoPrecioVenta.toFixed(2))
      }
    }, [precioCompra, porcentajeVenta])
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const fechaActual = new Date()
      const fechaTostionDate = new Date(fechaTostion)
      const diferenciaMeses =
        (fechaActual.getFullYear() - fechaTostionDate.getFullYear()) * 12 +
        (fechaActual.getMonth() - fechaTostionDate.getMonth())
  
      if (diferenciaMeses > 3) {
        alert("La fecha de tostión no puede ser mayor a 3 meses")
        return
      }
  
      const nuevaVariante: variantType = {
        id:0,
        grammage: gramaje,
        roasting_date: fechaTostion,
        stock: Number.parseInt(cantidad),
        shopping_price: Number.parseFloat(precioCompra),
        sale_price: Number.parseFloat(precioVenta),
        id_product:productoId,
        images: [{url:"example.svg"}]
      }

      dispatch(addVariant(nuevaVariante))
      setGramaje("")
      setFechaTostion("")
      setCantidad("")
      setPrecioCompra("")
      setPorcentajeVenta("")
      setPrecioVenta("")
      console.log(productoId)
    }
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 bg-[#6F4E37] hover:bg-[#5A3E2B] text-white">
            <Coffee className="mr-2 h-4 w-4" /> Agregar Variante
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Variante</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="gramaje" className="block text-sm font-medium text-gray-700">
                Gramaje
              </label>
              <Input id="gramaje" type="number" value={gramaje} onChange={(e) => setGramaje(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="fechaTostion" className="block text-sm font-medium text-gray-700">
                Fecha de Tostión
              </label>
              <Input
                id="fechaTostion"
                type="date"
                value={fechaTostion}
                onChange={(e) => setFechaTostion(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
                Cantidad
              </label>
              <Input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="precioCompra" className="block text-sm font-medium text-gray-700">
                Precio de Compra
              </label>
              <Input
                id="precioCompra"
                type="number"
                step="0.01"
                value={precioCompra}
                onChange={(e) => setPrecioCompra(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="porcentajeVenta" className="block text-sm font-medium text-gray-700">
                Porcentaje de Venta
              </label>
              <Input
                id="porcentajeVenta"
                type="number"
                step="0.1"
                value={porcentajeVenta}
                onChange={(e) => setPorcentajeVenta(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="precioVenta" className="block text-sm font-medium text-gray-700">
                Precio de Venta
              </label>
              <Input id="precioVenta" type="number" step="0.01" value={precioVenta} readOnly />
            </div>
            <Button type="submit" className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white">
              Agregar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
  