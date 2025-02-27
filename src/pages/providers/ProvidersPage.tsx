import { useState, useEffect } from "react";
import { Plus, Search, Grid, List } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import usePagination from "@/components/hooks/usePagination";
import Paginator from "@/components/common/paginator";

export const ProvidersPage = () => {
  const {
    providers,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    showDialog,
    setShowDialog,
    editingId,
    setEditingId,
    handleSubmit,
  } = useProviders();

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);

  const pagination = usePagination<Provider>({
    initialItemsPerPage: 3
  });

  useEffect(() => {
    if (editingId) {
      const providerToEdit = providers.find(p => p.id === editingId) || null;
      setEditingProvider(providerToEdit);
      console.log("Setting editing provider:", providerToEdit);
    } else {
      setEditingProvider(null);
    }
  }, [editingId, providers]);

  const handleProviderClick = (provider: Provider) => { setSelectedProvider(provider) };

  // Add this new function to handle opening the dialog for a new provider
  const handleNewProviderClick = () => {
    // Reset editing state
    setEditingId(null);
    setEditingProvider(null);
    // Open the dialog
    setShowDialog(true);
  };

  const currentPage = pagination.paginatedData(providers);

  return (
    <div className="p-2 h-full space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="title">
          Gestión de Proveedores
        </h1>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>

          <Button
            onClick={handleNewProviderClick}
            size="lg"
            className="bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium"
          >
            <Plus className="mr-2 h-5 w-5" /> Registrar proveedor
          </Button>
          
          <DialogContent className="max-w-full sm:max-w-2xl mx-1 sm:mx-auto bg-white/90">
            <ScrollArea className="h-[470px]">
              <ProviderForm
                editingId={editingId}
                onSubmit={handleSubmit}
                initialData={editingProvider || undefined}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Buscar proveedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/80 backdrop-blur rounded-full pl-10"
          />
          <Search className="search" />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode("cards")}
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            className={`bg-white hover:bg-amber-100 rounded-full text-amber-800 text-sm font-medium`}
          >
            <Grid className="mr-2 h-4 w-4" /> Tarjetas
          </Button>
          <Button
            onClick={() => setViewMode("list")}
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            className={`bg-white hover:bg-amber-100 hover:text-amber-800 rounded-full text-amber-800 text-sm font-medium`}
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
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPage.map((provider) => (
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
              providers={currentPage}
              onProviderClick={handleProviderClick}
            />
          )}
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
            onEdit={(providerId) => {
              setEditingId(providerId);
              const providerToEdit = providers.find(p => p.id === providerId) || null;
              setEditingProvider(providerToEdit);
              setShowDialog(true);
            }}
          />
        </Dialog>
      )}

      <div className="">
        <Paginator
          totalItems={providers.length}
          itemsPerPage={pagination.itemsPerPage}
          currentPage={pagination.currentPage}
          onPageChange={pagination.handlePageChange}
          onItemsPerPageChange={pagination.handleItemsPerPageChange}
          pageSizeOptions={[3, 9, 20]}
        />
      </div>
    </div>
  );
};

export default ProvidersPage;