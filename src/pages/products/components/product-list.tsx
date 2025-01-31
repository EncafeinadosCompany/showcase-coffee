import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks/useAppSelector";
import { productType } from "@/types/products/product";
import { brandType } from "@/types/products/brand"
interface ProductListProps {

  products : productType[]
}




export default function ProductList({products}: ProductListProps) {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [brandFilter, setBrandFilter] = useState("")
  const itemsPerPage = 5
  const {brands} = useAppSelector((state) => state.brands);

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) 
    // &&
      // (brandFilter === "" || product.brandId.toString() === brandFilter),
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-white border-cafe-medium"
        />
        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger className="w-[180px] bg-white border-cafe-medium">
            <SelectValue placeholder="Filtrar por marca" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Todas las marcas</SelectItem>
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-cafe-medium text-cafe-cream">
            <TableHead className="text-cafe-light">Nombre</TableHead>
            <TableHead className="text-cafe-light">Marca</TableHead>
            <TableHead className="text-cafe-light">Atributos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((product) => (
            <TableRow key={product.id} className="bg-white hover:bg-cafe-cream">
              <TableCell>{product.name}</TableCell>
              {/* <TableCell>{brands.find((b) => b.id === product.id_brand)?.name}</TableCell> */}
              <TableCell>
                {product.attributes?.map((attr, index) => (
                  <span key={index} className="mr-2 text-cafe-medium">
                    {attr.name}: {attr.value}
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <div className="text-cafe-dark">
          Página {currentPage} de {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-cafe-light text-cafe-dark hover:bg-cafe-medium hover:text-cafe-cream"
          >
            Anterior
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-cafe-light text-cafe-dark hover:bg-cafe-medium hover:text-cafe-cream"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

