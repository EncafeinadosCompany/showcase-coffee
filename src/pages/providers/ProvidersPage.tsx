import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  fetchProvidersByStore,
  addProvider,
  editProvider,
  associateProvider,
} from "@/features/companies/providerSlice";
import { Plus, Search, Grid, List, Building2, Mail, Phone } from "lucide-react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "react-hot-toast";

const ProviderCard = React.memo(
  ({
    provider,
    onClick,
  }: {
    provider: Provider;
    onClick: (provider: Provider) => void;
  }) => (
    <Card
      onClick={() => onClick(provider)}
      className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur"
    >
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          {provider.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Building2 className="h-4 w-4 mr-2 text-amber-800" />
          <span>NIT: {provider.nit}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2 text-amber-800" />
          <span>{provider.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2 text-amber-800" />
          <span>{provider.phone}</span>
        </div>
      </CardContent>
      <CardFooter>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            provider.status
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {provider.status ? "Activo" : "Inactivo"}
        </span>
      </CardFooter>
    </Card>
  )
);

const ProviderTable = React.memo(
  ({
    providers,
    onProviderClick,
  }: {
    providers: Provider[];
    onProviderClick: (provider: Provider) => void;
  }) => (
    <Card className="bg-white/80 backdrop-blur">
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
            {providers.map((provider) => (
              <TableRow
                key={provider.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onProviderClick(provider)}
              >
                <TableCell className="font-medium">{provider.name}</TableCell>
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
  )
);

const ProviderDetails = React.memo(
  ({ provider, onClose }: { provider: Provider; onClose: () => void }) => (
    <DialogContent className="max-w-2xl bg-white/95 backdrop-blur">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-amber-600">
          Detalles del Proveedor
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold text-amber-700">Nombre:</span>
            <p className="text-gray-700">{provider.name}</p>
          </div>
          <div>
            <span className="font-semibold text-amber-700">NIT:</span>
            <p className="text-gray-700">{provider.nit}</p>
          </div>
          <div>
            <span className="font-semibold text-amber-700">Email:</span>
            <p className="text-gray-700">{provider.email}</p>
          </div>
          <div>
            <span className="font-semibold text-amber-700">Teléfono:</span>
            <p className="text-gray-700">{provider.phone}</p>
          </div>
        </div>

        <div>
          <span className="font-semibold text-amber-700">Dirección:</span>
          <p className="text-gray-700">{provider.address}</p>
        </div>

        <div>
          <span className="font-semibold text-amber-700">Estado:</span>
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              provider.status
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {provider.status ? "Activo" : "Inactivo"}
          </span>
        </div>

        {provider.bankAccounts && provider.bankAccounts.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-amber-800 mb-3">
              Cuentas Bancarias:
            </h3>
            <div className="grid gap-3">
              {provider.bankAccounts.map((account, index) => (
                <div
                  key={index}
                  className="bg-amber-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-semibold text-amber-800">Banco:</span>
                      <p className="text-gray-700">{account.bank}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-800">
                        Tipo de Cuenta:
                      </span>
                      <p className="text-gray-700">{account.type_account}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-amber-800">
                        Número de Cuenta:
                      </span>
                      <p className="text-gray-700">{account.bank_account}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <DialogFooter className="mt-6">
        <Button onClick={onClose} className="bg-amber-600 hover:bg-amber-800 rounded-full">
          Cerrar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
);

export const ProvidersPage = () => {
  const dispatch = useAppDispatch();
  const { providers, isLoading, error } = useAppSelector(
    (state) => state.providers
  );
  const employee = useAppSelector((state) => state.auth.employee);
  const storeId = employee?.id_store;

  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const itemsPerPage = 6;

  useEffect(() => {
    if (storeId) {
      dispatch(fetchProvidersByStore(storeId))
        .unwrap()
        .catch((error) => {
          toast.error("No se pudieron cargar los proveedores");
        });
    }
  }, [storeId, dispatch, toast]);

  const filteredProviders = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return providers.filter(
      (provider) =>
        provider?.name?.toLowerCase()?.includes(searchTermLower) ||
        provider?.email?.toLowerCase().includes(searchTermLower) ||
        provider?.phone?.includes(searchTerm) ||
        provider?.nit?.includes(searchTerm)
    );
  }, [providers, searchTerm]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProviders.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProviders, currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProviders.length / itemsPerPage),
    [filteredProviders.length]
  );

  const validateForm = useCallback(
    (formData: Omit<Provider, "id">) => {
      if (!formData.name?.trim()) {
        toast("El nombre es obligatorio", { icon: "⚠️" });
        return false;
      }
      if (!formData.nit?.trim() || !/^\d+$/.test(formData.nit)) {
        toast("El NIT debe ser un valor numérico", { icon: "⚠️" });
        return false;
      }
      if (
        !formData.email?.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        toast("Ingrese un correo electrónico válido", { icon: "⚠️" });
        return false;
      }
      if (!formData.phone?.trim() || !/^\d{7,10}$/.test(formData.phone)) {
        toast("El teléfono debe tener entre 7 y 10 dígitos", { icon: "⚠️" });
        return false;
      }
      return true;
    },
    [toast]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const providerData = Object.fromEntries(
      formData.entries()
    ) as unknown as Omit<Provider, "id">;

    if (!validateForm(providerData)) {
      return;
    }

    try {
      if (editingId !== null) {
        await dispatch(
          editProvider({ id: editingId.toString(), provider: providerData })
        ).unwrap();
        toast.success("Proveedor actualizado correctamente");
        setEditingId(null);
      } else {
        const newProvider = await dispatch(addProvider(providerData)).unwrap();

        if (employee?.id_store && newProvider?.id) {
          await dispatch(
            associateProvider({
              storeId: employee.id_store,
              providerId: newProvider.id,
            })
          ).unwrap();
        }
        toast.success("Proveedor creado correctamente");
      }

      setShowDialog(false);
    } catch (error) {
      toast.error("Error al guardar el proveedor");
    }
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleProviderClick = useCallback((provider: Provider) => {
    setSelectedProvider(provider);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-600">
          Gestión de Proveedores
        </h1>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-800 rounded-full">
              <Plus className="mr-2 h-5 w-5" /> Registrar proveedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full sm:max-w-2xl mx-1 sm:mx-auto bg-white/90 backdrop-blur">
            <DialogHeader>
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
            className={`bg-amber-500 hover:bg-amber-900 rounded-full`}
            >
            <Grid className="mr-2 h-4 w-4" /> Cards
            </Button>
          <Button
            onClick={() => setViewMode("list")}
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            className="bg-amber-500 hover:bg-amber-900 rounded-full"
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
                {currentItems.map((provider) => (
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
              providers={currentItems}
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