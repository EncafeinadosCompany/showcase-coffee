import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {TableBody,Table,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchProducts } from "@/features/products/products/productSlice";
import { fetchBrands } from "@/features/products/brands/brandSlice";
import { fetchSaleVariants } from "@/features/transactions/saleSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { productType } from "@/types/products/product";

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(
    null
  );
  const { products } = useAppSelector((state) => state.products);
  const { brands } = useAppSelector((state) => state.brands);
  const { saleVariants } = useAppSelector((state) => state.sales);
  const dispach = useAppDispatch();

  useEffect(() => {
    dispach(fetchProducts());
    dispach(fetchBrands());
    dispach(fetchSaleVariants());
  }, [dispach]);

  const productsPerPage = 6;
  const filteredProducts =
    selectedBrand === "all"
      ? products
      : products.filter((p) => p.brand?.name === selectedBrand);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const slogans = [
    "Descubre el arte del buen café",
    "Tu vitrina de café y especialidades",
    "El mejor café, a un clic de ti",
    "Explora, elige y disfruta tu café ideal",
    "Café de calidad, presentado para ti",
    "Donde el aroma y el diseño se encuentran",
    "Vitrina de café: descubre tu próximo favorito",
    "Café seleccionado, listo para ti",
    "Un mundo de café en exhibición",
    "Tu espacio para descubrir el café perfecto",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-amber-200" />
              <span className="text-amber-200 font-medium">
                Café de especialidad.
              </span>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="relative h-[60vh] flex items-center justify-center">
          <img
            src="https://www.pdxaromatics.com/wp-content/uploads/2014/06/coffee.jpg"
            alt="Coffee cup on dark background"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-200 text-center z-10 px-4">
            {slogans[index]}
          </h1>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
            <div className="container mx-auto px-4">
              <div className="flex space-x-6 overflow-x-auto scrollbar-hide py-4">
                <button
                  onClick={() => setSelectedBrand("all")}
                  className={`relative px-4 py-2 font-medium transition-colors ${selectedBrand === "all"
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                    }`}
                >
                  Todas las marcas
                  {selectedBrand === "all" && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-500" />
                  )}
                </button>
                {brands.map((category) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      category.name && setSelectedBrand(category.name)
                    }
                    className={`relative px-4 py-2 font-medium transition-colors ${selectedBrand === category.name
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    {category.name}
                    {selectedBrand === category.name && (
                      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-square relative overflow-hidden bg-zinc-900 rounded-lg">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="text-amber-200 font-medium">{product.name}</h3>
                  <p className="text-zinc-500 text-xs">{product.brand?.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(i + 1)}
                className={
                  currentPage === i + 1
                    ? "bg-amber-200 text-zinc-900"
                    : "border-zinc-800 text-zinc-400"
                }
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </section>
      </main>
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="bg-zinc-900 text-zinc-100 border-zinc-800 max-w-lg p-4 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-amber-200">
              {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>

          {/* Imagen más pequeña */}
          <div className="w-[200px] h-[200px] overflow-hidden rounded-lg">
            <img
              src={selectedProduct?.image_url || "/placeholder.svg"}
              alt={selectedProduct?.name || "Product image"}
              className="w-full h-full object-fill"
            />
          </div>

          {/* ScrollArea con tamaño más pequeño */}
          <ScrollArea className="max-h-64 overflow-auto mt-4">
            <div className="space-y-4">
              {/* Variantes */}
              <div>
                <h3 className="text-lg font-medium text-amber-200 mb-2">
                  Referencias
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-zinc-400">Gramaje</TableHead>
                      <TableHead className="text-zinc-400">Precio</TableHead>
                      <TableHead className="text-zinc-400">Unidades</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProduct?.product?.map((variant, i) => (
                      <TableRow key={i} className="border-zinc-800">
                        <TableCell className="text-zinc-300">
                          {variant.grammage}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {(() => {
                            const saleVariant = saleVariants.find(
                              (s) => s.variant.id === variant.id
                            );
                            return saleVariant
                              ? saleVariant.sale_price.toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP",
                              })
                              : "N/A";
                          })()}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {variant.stock}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Atributos */}
              <div>
                <h3 className="text-lg font-medium text-amber-200 mb-2">
                  Atributos
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProduct?.attributes?.map((attr, i) => (
                    <div key={i} className="bg-zinc-800/50 p-2 rounded-lg">
                      <p className="text-zinc-400 text-sm">
                        {attr.description}
                      </p>
                      <p className="text-zinc-200">
                        {attr.attributes_products?.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      ;
    </div>
  );
};

export default Page;
