// ProvidersPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchProviders, fetchProvidersByStore, addProvider, editProvider } from "@/features/companies/providerSlice";
import { Plus, Search, List, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Provider } from "@/types/companies/provider";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { associateProvider } from "@/features/companies/providerSlice";
import { ProviderForm } from "./ProviderForm";

export const ProvidersPage = () => {
  const dispatch = useAppDispatch();
  const { providers, isLoading, error } = useAppSelector((state) => state.providers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const [showDialog, setShowDialog] = useState(false);
  const employee = useAppSelector((state) => state.auth.employee);
  const storeId = employee?.id_store;

  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (storeId) {
      dispatch(fetchProvidersByStore(storeId));
    }
  }, [storeId, dispatch]);

  useEffect(() => {
    setFilteredProviders(
      providers.filter(
        (provider) =>
          provider?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          provider?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider?.phone?.includes(searchTerm) ||
          provider?.nit?.includes(searchTerm)
      )
    );
  }, [providers, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProviders.slice(indexOfFirstItem, indexOfLastItem);

  const handleSubmit = async (form: Omit<Provider, "id">) => {
    try {
      if (editingId !== null) {
        await dispatch(editProvider({ id: editingId.toString(), provider: form }));
        setEditingId(null);
      } else {
        const newProvider = await dispatch(addProvider(form)).unwrap();
        if (employee?.id_store && newProvider?.id) {
          await dispatch(associateProvider({ storeId: employee.id_store, providerId: newProvider.id }));
        }
      }
      setShowDialog(false);
    } catch (error) {
      console.error("Error saving provider:", error);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Proveedores</h1>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Buscar proveedores..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-8" />
        </div>

        <Button onClick={() => setViewMode("cards")} variant={viewMode === "cards" ? "default" : "outline"}>
          <Grid className="mr-2 h-4 w-4" /> Cards
        </Button>
        <Button onClick={() => setViewMode("list")} variant={viewMode === "list" ? "default" : "outline"}>
          <List className="mr-2 h-4 w-4" /> Lista
        </Button>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Registrar proveedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full sm:max-w-2xl mx-1 sm:mx-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingId ? "Editar Proveedor" : "Añadir Nuevo Proveedor"}
              </DialogTitle>
            </DialogHeader>
            <ProviderForm
              initialData={editingId ? providers.find((p) => p.id === editingId) : undefined}
              onSubmit={handleSubmit}
              onClose={() => setShowDialog(false)}
              isEditing={editingId !== null}
            />
          </DialogContent>
        </Dialog>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {viewMode === "cards" ? (
            <ScrollArea className="h-[350px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map((provider) => (
                  <Card key={provider.id}>
                    <CardHeader>
                      <CardTitle>{provider.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>NIT: {provider.nit}</p>
                      <p>Email: {provider.email}</p>
                      <p>Teléfono: {provider.phone}</p>
                      <p>Dirección: {provider.address}</p>
                      <p>
                        Estado:{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            provider.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {provider.status ? "Activo" : "Inactivo"}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>NIT</TableHead>
                      <TableHead>Correo</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">{provider.name}</TableCell>
                        <TableCell>{provider.nit}</TableCell>
                        <TableCell>{provider.email}</TableCell>
                        <TableCell>{provider.phone}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              provider.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {provider.status ? "Activo" : "Inactivo"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "disabled" : ""}
                />
              </PaginationItem>
              {Array.from({ length: Math.ceil(filteredProviders.length / itemsPerPage) }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProviders.length / itemsPerPage)))
                  }
                  className={currentPage === Math.ceil(filteredProviders.length / itemsPerPage) ? "disabled" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default ProvidersPage;