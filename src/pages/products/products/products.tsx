import { Link } from "react-router-dom"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

import CartsProducts from "./components/cartsProducts"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { fetchProducts } from "@/features/products/products/productSlice"
import Paginator from "@/components/common/paginator"
import usePagination from "@/components/hooks/usePagination"
import { Product } from "@/types/products/PDF"
import { CardContent } from "@/components/ui/card"
export default function ProductosPage() {

  const dispatch = useAppDispatch()
  const { products } = useAppSelector((state) => state.products)

  const [searchTerm, setSearchTerm] = useState("");

  const pagination = usePagination<Product>({
    initialItemsPerPage: 4
  });

  const filteredCoffee = products.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const currentPage = pagination.paginatedData(filteredCoffee);


  return (
    // last background: bg-[#F5E6D3]
    <div className="h-full w-full p-2 space-y-3 overflow-hidden">

      <div className="mb-3 flex justify-between items-center">
        <h1 className="title">Gestión de Productos</h1>
      </div>

      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Buscar cafés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/80 backdrop-blur rounded-full pl-10"
          />
          <Search className="search" />
        </div>

        <Link to="/form-products">
          <Button
            variant="outline"
            size="lg"
            className="bg-white hover:bg-amber-100 rounded-full text-amber-800 hover:text-amber-800 text-sm font-medium"
          >
            <Plus className="mr-1 h-4 w-4 text-amber-800" /> Registrar Producto
          </Button>
        </Link>
      </div>

      <div className="space-y-3 h-full flex flex-col">

        <div className="flex-1 flex flex-col max-h-[calc(100vh-150px)]">
          <CardContent className="p-0 flex-1 flex flex-col">

            <div className="overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">

              {currentPage.length === 0 ? (
                <div className="text-center py-12 mx-auto">
                  <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
                  <img width={"20%"} className="mx-auto" src="./public/undraw_page-not-found_6wni .svg" />
                  <p className="text-muted-foreground mt-4">Intenta con una búsqueda diferente</p>
                </div>
              ) : (
                <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {currentPage.map((coffee) => (
                    <CartsProducts key={coffee.id} products={coffee} />
                  ))}
                </div>
              )}
            </div>

            {filteredCoffee.length > 0 && (
              <div className="">
                <Paginator
                  totalItems={filteredCoffee.length}
                  itemsPerPage={pagination.itemsPerPage}
                  currentPage={pagination.currentPage}
                  onPageChange={pagination.handlePageChange}
                  onItemsPerPageChange={pagination.handleItemsPerPageChange}
                  pageSizeOptions={[4, 12, 20]}
                />
              </div>
            )}

          </CardContent>
        </div>

      </div>
    </div >
  );

}