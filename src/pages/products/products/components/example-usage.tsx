"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CombinedProductModal from "./combined-product-modal"

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Ejemplo de datos
  const productData = {
    product_name: "Café Especial Colombiano",
    productId: "123",
    imagen: "/placeholder.svg?height=400&width=600",
    variants: [
      { grammage: "250g", stock: 45 },
      { grammage: "500g", stock: 32 },
      { grammage: "1kg", stock: 18 },
    ],
    attributes: [
      { id: 1, description: "Aroma", attributes_products: { value: "Intenso con notas florales" } },
      { id: 2, description: "Sabor", attributes_products: { value: "Chocolate y caramelo" } },
      { id: 3, description: "Origen", attributes_products: { value: "Sierra Nevada, Colombia" } },
      { id: 4, description: "Variedad", attributes_products: { value: "Arábica" } },
      { id: 5, description: "Calidad", attributes_products: { value: "Premium" } },
    ],
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-amber-800 mb-6">Página de Producto</h1>

      {/* Ejemplo de uso controlado */}
      <Button onClick={() => setIsModalOpen(true)} className="mb-8 bg-amber-700 hover:bg-amber-800">
        Abrir Modal Controlado
      </Button>

      <CombinedProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} {...productData} />

      {/* Ejemplo de uso no controlado (con trigger interno) */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-amber-700 mb-4">Versión con trigger interno:</h2>
        <CombinedProductModal {...productData} />
      </div>
    </div>
  )
}

