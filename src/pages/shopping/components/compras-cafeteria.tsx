"use client"

import { useState } from "react"
import { Plus, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Producto {
  id: number
  nombre: string
  cantidad: number
  fechaTostion: string
  precioCompra: number
  precioVenta: number
  porcentajeGanancia: number
}

export default function ComprasCafeteria() {
  const [productosDisponibles] = useState([
    { id: 1, nombre: "Café Colombiano" },
    { id: 2, nombre: "Café Etíope" },
    { id: 3, nombre: "Café Brasileño" },
  ])
  const [busqueda, setBusqueda] = useState("")
  const [productosCompra, setProductosCompra] = useState<Producto[]>([])
  const [productoActual, setProductoActual] = useState<Producto>({
    id: 0,
    nombre: "",
    cantidad: 0,
    fechaTostion: "",
    precioCompra: 0,
    precioVenta: 0,
    porcentajeGanancia: 0,
  })

  const buscarProducto = () => {
    const productoEncontrado = productosDisponibles.find((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    if (productoEncontrado) {
      setProductoActual({ ...productoActual, id: productoEncontrado.id, nombre: productoEncontrado.nombre })
    }
  }

  const agregarProducto = () => {
    if (
      productoActual.nombre &&
      productoActual.cantidad > 0 &&
      productoActual.fechaTostion &&
      productoActual.precioCompra > 0 &&
      productoActual.porcentajeGanancia >= 0
    ) {
      const precioVenta = productoActual.precioCompra * (1 + productoActual.porcentajeGanancia / 100)
      setProductosCompra([...productosCompra, { ...productoActual, precioVenta }])
      setProductoActual({
        id: 0,
        nombre: "",
        cantidad: 0,
        fechaTostion: "",
        precioCompra: 0,
        precioVenta: 0,
        porcentajeGanancia: 0,
      })
      setBusqueda("")
    }
  }

  const eliminarProducto = (id: number) => {
    setProductosCompra(productosCompra.filter((producto) => producto.id !== id))
  }

  const calcularPrecioVenta = (precioCompra: number, porcentajeGanancia: number) => {
    return precioCompra * (1 + porcentajeGanancia / 100)
  }

  const totalCompra = productosCompra.reduce((sum, producto) => sum + producto.precioCompra * producto.cantidad, 0)

  return (
    <div >
      <h1 className="text-4xl font-bold text-[#4A3728] p-4 mb-8">Compras de Café</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="bg-white shadow-lg h-[450px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-[#4A3728]">Buscar y Agregar Producto</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto h-[calc(100%-130px)]">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Buscar producto"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="border-[#8C7A6B]"
              />
              <Button onClick={buscarProducto} className="bg-[#A9B18F] hover:bg-[#8C7A6B]">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {productoActual.nombre && (
              <form className="space-y-4">
                <div>
                  <Label htmlFor="nombre" className="text-[#4A3728]">
                    Producto
                  </Label>
                  <Input id="nombre" value={productoActual.nombre} readOnly className="border-[#8C7A6B]" />
                </div>
                <div>
                  <Label htmlFor="cantidad" className="text-[#4A3728]">
                    Cantidad (kg)
                  </Label>
                  <Input
                    id="cantidad"
                    type="text"
                    value={productoActual.cantidad}
                    onChange={(e) => setProductoActual({ ...productoActual, cantidad: Number(e.target.value) })}
                    className="border-[#8C7A6B]"
                  />
                </div>
                <div>
                  <Label htmlFor="fechaTostion" className="text-[#4A3728]">
                    Fecha de Tostión
                  </Label>
                  <Input
                    id="fechaTostion"
                    type="date"
                    value={productoActual.fechaTostion}
                    onChange={(e) => setProductoActual({ ...productoActual, fechaTostion: e.target.value })}
                    className="border-[#8C7A6B]"
                  />
                </div>
                <div>
                  <Label htmlFor="precioCompra" className="text-[#4A3728]">
                    Precio de Compra (por kg)
                  </Label>
                  <Input
                    id="precioCompra"
                    type="text"
                    value={productoActual.precioCompra}
                    onChange={(e) => setProductoActual({ ...productoActual, precioCompra: Number(e.target.value) })}
                    className="border-[#8C7A6B]"
                  />
                </div>
                <div>
                  <Label htmlFor="porcentajeGanancia" className="text-[#4A3728]">
                    Porcentaje de Ganancia
                  </Label>
                  <Input
                    id="porcentajeGanancia"
                    type="text"
                    value={productoActual.porcentajeGanancia}
                    onChange={(e) => {
                      const porcentaje = Number(e.target.value)
                      const precioVenta = calcularPrecioVenta(productoActual.precioCompra, porcentaje)
                      setProductoActual({
                        ...productoActual,
                        porcentajeGanancia: porcentaje,
                        precioVenta: precioVenta,
                      })
                    }}
                    className="border-[#8C7A6B]"
                  />
                </div>
                <div>
                  <Label htmlFor="precioVenta" className="text-[#4A3728]">
                    Precio de Venta (por kg)
                  </Label>
                  <Input
                    id="precioVenta"
                    type="number"
                    value={productoActual.precioVenta.toFixed(2)}
                    readOnly
                    className="border-[#8C7A6B]"
                  />
                </div>
                <Button onClick={agregarProducto} className="w-full bg-[#A9B18F] hover:bg-[#8C7A6B] text-white">
                  <Plus className="mr-2 h-4 w-4" /> Agregar a la Compra
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg h-[450px] overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-[#4A3728]">Productos en la Compra</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto h-[calc(100%-130px)]">
            <ul className="space-y-4">
              {productosCompra.map((producto) => (
                <li key={producto.id} className="flex items-center justify-between bg-[#F5E6D3] p-4 rounded-md">
                  <div>
                    <span className="font-semibold text-[#4A3728]">{producto.nombre}</span>
                    <span className="ml-2 text-[#8C7A6B]">
                      ({producto.cantidad} kg - Tostión: {producto.fechaTostion})
                    </span>
                    <div className="text-sm text-[#8C7A6B]">
                      Compra: ${producto.precioCompra}/kg - Venta: ${producto.precioVenta.toFixed(2)}/kg
                    </div>
                    <div className="text-sm text-[#8C7A6B]">Ganancia: {producto.porcentajeGanancia}%</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => eliminarProducto(producto.id)}>
                    <Trash2 className="h-5 w-5 text-[#4A3728]" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="bg-[#8C7A6B] text-white rounded-b-lg">
            <div className="w-full flex justify-between items-center">
              <span>Total de productos: {productosCompra.length}</span>
              <span>Valor total de compra: ${totalCompra.toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

