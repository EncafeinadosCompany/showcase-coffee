import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {Search,Facebook,Instagram,Twitter,Linkedin,Globe,Calendar,RefreshCw,Plus,ArrowLeft} from "lucide-react";
import {Dialog,DialogContent,DialogHeader,DialogTitle} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchBrands } from "@/features/products/brands/brandSlice";

import CartsBrands from "./components/cartsBrands";

const getSocialIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "facebook":
      return <Facebook className="h-4 w-4" />;
    case "instagram":
      return <Instagram className="h-4 w-4" />;
    case "twitter":
      return <Twitter className="h-4 w-4" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
};

export default function Brands() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((state) => state.brands);
  const itemsPerPage = 4;

  const filteredCoffee = brands.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.ceil(filteredCoffee.length / itemsPerPage);
  const currentCoffeeItems = filteredCoffee.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className=" bg-[#F5E6D3] text-[#4A3933] h-full transition-all duration-700 overflow-y-auto py-4 px-4 ">
      <div className="">
        <div className="flex items-center justify-between ">
          <Link to="/details">
            <Button
              variant="outline"
              className="mb-4 bg-amber-600 rounded-[5px]  hover:bg-amber-700 hover:shadow-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4 text-black" /> Volver
            </Button>
          </Link>
          <Link to="/form-brands">
            <Button
              variant="outline"
              className="mb-4 bg-[#dda15e] rounded-[5px]  hover:bg-[#99582aad] hover:shadow-sm"
            >
              <Plus className="mr-1 h-4 w-4 text-black" /> Crear Marca
            </Button>
          </Link>
        </div>
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
              <Dialog key={coffee.id}>
                  <CartsBrands brands={coffee}></CartsBrands>    
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {coffee.name}
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="mt-4 max-h-[60vh] overflow-auto pr-4">
                    <div className="space-y-6">
                      <div className="relative w-full h-64">
                        <img
                          src={
                            coffee.image_url || "/public/undraw_coffee_7r49.svg"
                          }
                          alt={coffee.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">
                          Descripción
                        </h4>
                        <p>{coffee.description}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-lg mb-2">
                          Redes Sociales
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {coffee.social_networks.map((network, index) => (
                            <a
                              key={index}
                              href={network.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-sm text-blue-600 hover:underline"
                            >
                              {getSocialIcon(network.social_network.name)}
                              <span>{network.description}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>
                            Creado:{" "}
                            {new Date(coffee.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          <span>
                            Actualizado:{" "}
                            {new Date(coffee.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
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
  );
}
