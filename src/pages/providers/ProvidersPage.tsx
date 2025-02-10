import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  fetchProvidersByStore,
  addProvider,
  editProvider,
  associateProvider,
} from "@/features/companies/providerSlice";
import { Plus, Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Provider } from "@/types/companies/provider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { ProviderForm } from "./ProviderForm";

export const ProvidersPage = () => {
  const dispatch = useAppDispatch();
  const { providers, isLoading, error } = useAppSelector(
    (state) => state.providers
  );
  const employee = useAppSelector((state) => state.auth.employee);
  const storeId = employee?.id_store;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
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

  const validateForm = (formData: Omit<Provider, "id">) => {
    if (!formData.name?.trim()) {
      alert("El nombre es obligatorio.");
      return false;
    }
    if (!formData.nit?.trim() || !/^\d+$/.test(formData.nit)) {
      alert("El NIT debe ser un valor numérico.");
      return false;
    }
    if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Ingrese un correo electrónico válido.");
      return false;
    }
    if (!formData.phone?.trim() || !/^\d{7,10}$/.test(formData.phone)) {
      alert("El teléfono debe tener entre 7 y 10 dígitos.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const providerData = Object.fromEntries(formData.entries()) as unknown as Omit<Provider, "id">;

    if (!validateForm(providerData)) {
      return;
    }

    try {
      if (editingId !== null) {
        await dispatch(editProvider({ id: editingId.toString(), provider: providerData }));
        setEditingId(null);
      } else {
        const newProvider = await dispatch(addProvider(providerData)).unwrap();

        if (employee?.id_store && newProvider?.id) {
          await dispatch(
            associateProvider({
              storeId: employee.id_store,
              providerId: newProvider.id,
            })
          );
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
          <Input
            placeholder="Buscar proveedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Button
          onClick={() => setViewMode("cards")}
          variant={viewMode === "cards" ? "default" : "outline"}
        >
          <Grid className="mr-2 h-4 w-4" /> Cards
        </Button>
        <Button
          onClick={() => setViewMode("list")}
          variant={viewMode === "list" ? "default" : "outline"}
        >
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

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
      )}

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
                  <Card
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider)}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">
                        {provider.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">NIT: {provider.nit}</p>
                      <p className="text-sm text-gray-600">
                        Email: {provider.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        Teléfono: {provider.phone}
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
                      <TableRow 
                        key={provider.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedProvider(provider)}
                      >
                        <TableCell className="font-medium">
                          {provider.name}
                        </TableCell>
                        <TableCell>{provider.nit}</TableCell>
                        <TableCell>{provider.email}</TableCell>
                        <TableCell>{provider.phone}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              provider.status
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
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
              {Array.from({
                length: Math.ceil(filteredProviders.length / itemsPerPage),
              }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(filteredProviders.length / itemsPerPage)
                      )
                    )
                  }
                  className={
                    currentPage ===
                    Math.ceil(filteredProviders.length / itemsPerPage)
                      ? "disabled"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}

      <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Proveedor</DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <div className="space-y-4">
              <p><span className="font-semibold">Nombre:</span> {selectedProvider.name}</p>
              <p><span className="font-semibold">NIT:</span> {selectedProvider.nit}</p>
              <p><span className="font-semibold">Email:</span> {selectedProvider.email}</p>
              <p><span className="font-semibold">Teléfono:</span> {selectedProvider.phone}</p>
              <p><span className="font-semibold">Dirección:</span> {selectedProvider.address}</p>
              <p>
                <span className="font-semibold">Estado:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedProvider.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedProvider.status ? "Activo" : "Inactivo"}
                </span>
              </p>
              {selectedProvider.bankAccounts && selectedProvider.bankAccounts.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Cuentas Bancarias:</h3>
                  {selectedProvider.bankAccounts.map((account, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                      <p><span className="font-semibold">Banco:</span> {account.bank}</p>
                      <p><span className="font-semibold">Tipo de Cuenta:</span> {account.type_account}</p>
                      <p><span className="font-semibold">Número de Cuenta:</span> {account.bank_account}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProvidersPage;