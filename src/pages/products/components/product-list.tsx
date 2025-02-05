import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Coffee, CoffeeIcon as CoffeeBean, MouseIcon as Mug, Tag } from "lucide-react"
// import {fetchAttributes} from "@/features/products/attributes/attributeSlice"
import {fetchProducts} from "@/features/products/products/productSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Badge } from "@/components/ui/badge"


export default function ProductList() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [brandFilter, setBrandFilter] = useState("")
  const itemsPerPage = 5
  const {products} = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const {brands} = useAppSelector((state) => state.brands);


    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);


    useEffect(() => {
      console.log("Productos cargados:", products);
    }, [products]);

  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(search.toLowerCase()) 
    &&
    (brandFilter === "" || brandFilter ==="0" || product.brand?.id.toString() === brandFilter),
    console.log(brandFilter)
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="flex gap-6">
      <div className="flex relative items-center"> 
      <Input
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-white border-cafe-medium pl-10"
          
        />
        <Coffee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-600" size={18} />
      </div>
       
        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger className="w-[180px] bg-white border-cafe-medium">
            <SelectValue  defaultValue={"0"} placeholder="Filtrar por marca" />
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
            <TableRow className="bg-coffee-700 text-orange-100">
              <TableHead className="font-semibold">
                <div className="flex items-center space-x-2">
                  <Mug size={18} />
                  <span>Nombre</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center space-x-2">
                  <Tag size={18} />
                  <span>Marca</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center space-x-2">
                  <CoffeeBean size={18} />
                  <span>Atributos</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {paginatedProducts.map((product) => (
            <TableRow key={product.id} className="bg-white hover:bg-cafe-cream">
              <TableCell>{product.name}</TableCell>
              <TableCell>{brands.find((b) => b.id === product.brand?.id)?.name}</TableCell>
              <TableCell>
                {product.attributes?.map((attr, index) => (
                  <span key={index} className="text-cafe-medium gap-2 flex mb-4">
                     {attr.description} :
                     <Badge> {attr.attributes_products?.valor || "N/A"}</Badge>
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

