import {Link} from "react-router-dom"
import { ArrowLeft, Calendar, Plus, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

import CartsProducts from "./components/cartsProducts"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { fetchProducts } from "@/features/products/products/productSlice"
import { DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Separator } from "@radix-ui/react-select"
import CartsBrands from "../brands/components/cartsBrands"
export default function ProductosPage() {

  const dispatch = useAppDispatch()
  const {products} = useAppSelector((state) => state.products)

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { brands } = useAppSelector((state) => state.brands);
    const itemsPerPage = 4;
  
    const filteredCoffee = products.filter((coffee) =>
      coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const pageCount = Math.ceil(filteredCoffee.length / itemsPerPage);
    const currentCoffeeItems = filteredCoffee.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  useEffect(()=>{
    dispatch (fetchProducts())
  },[])


  return (
    <div className="bg-[#F5E6D3] text-[#4A3933] h-full transition-all duration-700 overflow-y-auto py-4 px-4 ">
   <div className="flex items-center justify-between ">
   <Link to="/details">
      <Button variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
    </Link>
    <Link to="/form-products">
      <Button variant="outline" className="mb-4">
      <Plus className="mr-1 h-4 w-4 text-black" /> Crear Producto
      </Button>
    </Link>
   </div>
    <div>
    <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Nuestra Selección de Marcas</h1>
          <p className="text-muted-foreground">
            Descubre nuestras marcar aleadas y disfruta de la mejor calidad de café
          </p>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="relative max-w-md w-full">
            <Input
              type="text"
              placeholder="Buscar café..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border-2 border-brown-300 focus:border-brown-500 focus:ring-2 focus:ring-brown-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        {filteredCoffee.length === 0 ? (
          <div className="text-center py-12 mx-auto  ">
            <h3 className="text-xl font-semibold mb-2">
              No se encontraron productos
            </h3>
            <img
              width={"20%"}
              className="mx-auto"
              src="./public/undraw_search-app_cpm0.svg"
            ></img>
            <p className="text-muted-foreground">
              Intenta con una búsqueda diferente
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCoffeeItems.map((coffee) => (
              <CartsProducts key={coffee.id} products={coffee}></CartsProducts>    
               
            ))}
          </div>
        )}
        {filteredCoffee.length > 0 && (
          <div className="mt-8 flex justify-center items-center space-x-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Anterior
            </Button>
            <span className="text-sm font-medium">
              Página {currentPage} de {pageCount}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage === pageCount}
              variant="outline"
              size="sm"
            >
              Siguiente
            </Button>
          </div>
        )}
    </div>
  </div>
  )
}

