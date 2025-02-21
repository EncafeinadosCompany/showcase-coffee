import { useState } from "react";
import { Plus, Search, Grid, List } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import { ProviderDetails } from "./components/ProvidersDetails";
import { useProviders } from "../../hooks/useProviders";
import { Provider } from "@/types/companies/provider";
import { ProviderTable } from "./components/Table";
import { ProviderCard } from "./components/Card";
import { ProviderForm } from "./components/Form";

export const ProvidersPage = () => {
  const {
    providers,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    totalPages,
    showDialog,
    setShowDialog,
    editingId,
    // setEditingId,
    handleSubmit,
  } = useProviders();

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
  };

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-amber-600 text-5xl md:text-3xl font-bold">
          Gestión de Proveedores
        </h1>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium"
            >
              <Plus className="mr-2 h-5 w-5" /> Registrar proveedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full sm:max-w-2xl mx-auto bg-white/90">
            <ScrollArea className="h-[470px]">
              <ProviderForm
                editingId={editingId}
                onSubmit={handleSubmit}
                initialData={selectedProvider || undefined}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col gap-4 ">
        {/* Barra de búsqueda y vista */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-800 rounded-full" />
            <Input
              placeholder="Buscar proveedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-white/80 backdrop-blur rounded-full"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setViewMode("cards")}
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium"
            >
              <Grid className="mr-2 h-4 w-4" /> Cards
            </Button>
            <Button
              onClick={() => setViewMode("list")}
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium"
            >
              <List className="mr-2 h-4 w-4" /> Lista
            </Button>
          </div>
        </div>

        {/* Contenedor de la tabla o tarjetas */}
        <div className="flex-1 min-h-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-800"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : viewMode === "cards" ? (
            <ScrollArea className="h-full max-h-[calc(100vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                {providers.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    onClick={handleProviderClick}
                  />
                ))}
              </div>

            </ScrollArea>
          ) : (
            <div className="h-full max-h-[calc(100vh-200px)] overflow-auto">
              <ProviderTable
                providers={providers}
                onProviderClick={handleProviderClick}
              />
            </div>
          )}
        </div>

        {/* Paginación */}
        <div className="h-12 flex items-center justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={currentPage === 1 ? "disabled" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                    className="bg-amber-600 hover:bg-amber-500 rounded-full text-white"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className={currentPage === totalPages ? "disabled" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );

};

export default ProvidersPage;
