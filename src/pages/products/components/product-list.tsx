import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchProducts } from "@/features/products/products/productSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import ProductCard from "./ProductCard";
import { fetchBrands } from "@/features/products/brands/brandSlice";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [brandFilter, setBrandFilter] = useState("");
  const itemsPerPage = 4;
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { brands } = useAppSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBrands());
  }, [dispatch]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (brandFilter === "" || brandFilter === "0" || product.brand?.id?.toString() === brandFilter)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 p-6">
      <div className="flex gap-4">
        <div className="flex relative items-center flex-1 max-w-md">
          <Input
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-50 pl-10 rounded-2xl"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger className="w-[180px] bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium">
            <SelectValue defaultValue="0" placeholder="Filtrar por Marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Todas las Marcas</SelectItem>
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-600">Page {currentPage} of {totalPages}</div>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              variant={currentPage === page ? "default" : "outline"}
              className={`min-w-[40px] ${currentPage === page ? "bg-coffee-600" : "text-coffee-600"}`}
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
