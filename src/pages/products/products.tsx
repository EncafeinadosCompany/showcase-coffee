import { Coffee } from "lucide-react"
import ProductManagement from "./components/product-management"

export const Products = () => {
  return (
    <main className="container mx-auto p-4 flex justify-center items-center min-h-screen">
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl w-full">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex flex-wrap justify-center items-center gap-3">
          <Coffee className="h-8 w-8 text-[#36270b]" />
          <h1 className="text-3xl sm:text-4xl font-bold text-center font-libre-baskerville text-[#36270b]">
            El Rincón del Café
          </h1>
          <Coffee className="h-8 w-8 text-[#36270b]" />
        </div>
        <p className="text-amber-800 text-base sm:text-lg font-medium italic text-center">
          Gestión de Inventario
        </p>
      </div>
      <ProductManagement />
    </div>
  </main>  
  )
}
