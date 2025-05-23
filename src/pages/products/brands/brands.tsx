import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Facebook, Instagram, Twitter, Linkedin, Globe, Calendar, RefreshCw, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchBrands } from "@/features/products/brands/brandSlice";
import CartsBrands from "./components/cartsBrands";
import { Brand } from "@/types/products/PDF";
import usePagination from "@/components/hooks/usePagination";
import Paginator from "@/components/common/paginator";
import { CardContent } from "@/components/ui/card";


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
  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brands?.brands ?? []);

  const pagination = usePagination<Brand>({
    initialItemsPerPage: 10
  });

  const filteredCoffee = (brands ?? []).filter((coffee) =>
    coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPage = pagination.paginatedData(filteredCoffee);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    // last background: bg-[#F5E6D3]
    <div className="h-full w-full p-2 space-y-3 overflow-hidden">

      <div className="mb-3 flex justify-between items-center">
        <h1 className="title">Gestión de Marcas</h1>
      </div>

      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Buscar Marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/80 backdrop-blur rounded-full pl-10"
          />
          <Search className="search" />
        </div>

        <Link to="/form-brands">
          <Button
            variant="outline"
            data-cy="add-brand-button"
            className="bg-white hover:bg-amber-100 rounded-full text-amber-800 hover:text-amber-800 text-sm font-medium">
            <Plus className="mr-1 h-4 w-4 text-amber-800 " /> Registrar Marca
          </Button>
        </Link>
      </div>

      <div className="space-y-3 h-full flex flex-col">

        <div className="flex-1 flex flex-col max-h-[calc(100vh-150px)]">
          <CardContent className="border-none p-0 flex-1 flex flex-col">

            <div className="overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">

              {filteredCoffee.length === 0 ? (
                <div className="text-center py-12 mx-auto">
                  <h3 className="text-xl font-semibold mb-2">No se encontraron Marcas</h3>
                  <img width="20%" className="mx-auto" src="./public/undraw_page-not-found_6wni .svg" />
                  <p className="text-muted-foreground">Intenta con una búsqueda diferente</p>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                  {currentPage.map((coffee) => (
                    <Dialog data-cy="brand-list" key={coffee.id}>
                      <CartsBrands brands={coffee}></CartsBrands>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold flex justify-between">
                            {coffee.name}
                            <Link to= {`/form-brands/${coffee.id}`}>
                            <Button variant="outline" className="bg-white hover:bg-amber-100 rounded-full text-amber-800 hover:text-amber-800 text-sm font-medium">
                            Editar
                            </Button>
                            </Link>
                          </DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="mt-4 max-h-[60vh] overflow-auto pr-4">
                          <div className="space-y-6">
                            <div className="relative w-full h-64">
                              <img
                                src={coffee.image_url || "/public/undraw_coffee_7r49.svg"}
                                alt={coffee.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Descripción</h4>
                              <p>{coffee.description}</p>
                            </div>
                            <Separator />
                            <div>
                              <h4 className="font-semibold text-lg mb-2">Redes Sociales</h4>
                              <div className="grid grid-cols-2 gap-4">
                                {coffee.social_networks && coffee.social_networks.map((network, index) => (
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
                                  Creado: {new Date(coffee.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                <span>
                                  Actualizado: {new Date(coffee.updated_at).toLocaleDateString()}
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
    </div>
  );

}