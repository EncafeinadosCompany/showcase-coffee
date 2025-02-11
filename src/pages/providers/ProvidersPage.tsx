import { useState } from "react";
import { Plus, Search, Grid, List } from "lucide-react";

import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ProviderDetails } from "./components/ProvidersDetails";
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

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-600">
          Gestión de Proveedores
        </h1>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-amber-200 hover:bg-amber-500 rounded-full text-amber-800 text-sm font-medium">
              <Plus className="mr-2 h-5 w-5" /> Registrar proveedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full sm:max-w-2xl mx-1 sm:mx-auto bg-white/90 backdrop-blur">
            <DialogHeader></DialogHeader>
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

      <div className="flex gap-4 mb-6">
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
            className={`bg-amber-200 hover:bg-amber-600 rounded-full text-amber-800 text-sm font-medium`}
            >
            <Grid className="mr-2 h-4 w-4" /> Cards
            </Button>
          <Button
            onClick={() => setViewMode("list")}
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            className={`bg-amber-200 hover:bg-amber-600 rounded-full text-amber-800 text-sm font-medium`}
          >
            <List className="mr-2 h-4 w-4" /> Lista
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-800"></div>
        </div>
      ) : (
        <>
          {viewMode === "cards" ? (
            <ScrollArea className="h-[350px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <ProviderTable
              providers={providers}
              onProviderClick={handleProviderClick}
            />
          )}

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
                    className="bg-amber-500 hover:bg-amber-800 rounded-full text-white"
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
        </>
      )}

      {selectedProvider && (
        <Dialog
          open={!!selectedProvider}
          onOpenChange={() => setSelectedProvider(null)}
        >
          <ProviderDetails
            provider={selectedProvider}
            onClose={() => setSelectedProvider(null)}
          />
        </Dialog>
      )}
    </div>
  );
};

export default ProvidersPage;