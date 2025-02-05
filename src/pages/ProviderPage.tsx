import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchProviders, addProvider, editProvider } from "@/features/providers/providerSlice";
import { Plus, Search, Trash2, Landmark, List, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Provider, BankAccount } from "@/types/providers/providers";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

const BANK_OPTIONS = [
  "Banco de Bogotá",
  "Banco Popular",
  "Bancolombia",
  "Citibank",
  "BBVA Colombia",
  "Banco de Occidente",
  "Banco Caja Social",
  "Davivienda",
  "Scotiabank Colpatria",
];

const ACCOUNT_TYPES = [
  "Cuenta Corriente",
  "Cuenta de Ahorros",
];

export const ProvidersPage = () => {
  const dispatch = useAppDispatch();
  const { providers, isLoading, error } = useAppSelector((state) => state.providers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState<Omit<Provider, "id">>({
    name: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
    bankAccounts: [],
    status: true,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards"); // Modo de visualización
  const [currentPage, setCurrentPage] = useState(1); // Paginación
  const itemsPerPage = 6; // Máximo de cards por página

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProviders(
      providers.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.phone.includes(searchTerm) ||
          provider.nit.includes(searchTerm)
      )
    );
  }, [providers, searchTerm]);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProviders.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBankAccountChange = (index: number, key: keyof BankAccount, value: string) => {
    const updatedBankAccounts = [...form.bankAccounts];
    updatedBankAccounts[index] = {
      ...updatedBankAccounts[index],
      [key]: value,
    };
    setForm({ ...form, bankAccounts: updatedBankAccounts });
  };

  const validateAccountNumber = (value: string) => {
    return value.replace(/[^\d]/g, '').slice(0, 20);
  };

  const removeBankAccount = (index: number) => {
    setForm({
      ...form,
      bankAccounts: form.bankAccounts.filter((_, i) => i !== index),
    });
  };

  const addBankAccount = () => {
    setForm({
      ...form,
      bankAccounts: [...form.bankAccounts, { bank_account: "", type_account: "", bank: "" }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await dispatch(editProvider({ id: editingId.toString(), provider: form }));
        setEditingId(null);
      } else {
        await dispatch(addProvider(form));
      }
      setForm({
        name: "",
        nit: "",
        email: "",
        phone: "",
        address: "",
        bankAccounts: [],
        status: true,
      });
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
            <ScrollArea className="h-[470px]">
            <form onSubmit={handleSubmit} className="space-y-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nit">NIT</Label>
                  <Input
                    id="nit"
                    name="nit"
                    value={form.nit}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Landmark className="mr-2 h-5 w-5" />
                      <span className="font-semibold">Cuentas Bancarias</span>
                    </div>
                    <Button
                      type="button"
                      onClick={addBankAccount}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Cuenta
                    </Button>
                  </div>

                  <ScrollArea className="h-[70px] pr-4">
                    <div className="space-y-4">
                      {form.bankAccounts.map((account, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 items-start">
                          <div className="col-span-4">
                            <Label>Banco</Label>
                            <Select
                              value={account.bank}
                              onValueChange={(value) => handleBankAccountChange(index, "bank", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar banco" />
                              </SelectTrigger>
                              <SelectContent>
                                {BANK_OPTIONS.map((bank) => (
                                  <SelectItem key={bank} value={bank}>
                                    {bank}
                                  </SelectItem>
                                ))}
                                <SelectItem value="other">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                            {account.bank === "other" && (
                              <Input
                                placeholder="Ingrese el nombre del banco"
                                value={account.bank}
                                onChange={(e) => handleBankAccountChange(index, "bank", e.target.value)}
                                className="mt-2"
                              />
                            )}
                          </div>
                          <div className="col-span-3">
                            <Label>Tipo de Cuenta</Label>
                            <Select
                              value={account.type_account}
                              onValueChange={(value) => handleBankAccountChange(index, "type_account", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                {ACCOUNT_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-4">
                            <Label>Número de Cuenta</Label>
                            <Input
                              value={account.bank_account}
                              onChange={(e) => handleBankAccountChange(
                                index,
                                "bank_account",
                                validateAccountNumber(e.target.value)
                              )}
                              placeholder="0000000000"
                              className="w-full"
                            />
                          </div>
                          <div className="col-span-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBankAccount(index)}
                              className="text-red-500 hover:text-red-700 mt-6"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={form.status}
                    onCheckedChange={(checked) => setForm({ ...form, status: checked })}
                  />
                  <Label>Activo</Label>
                </div>
                <Button type="submit">
                  {editingId ? "Actualizar Proveedor" : "Crear Proveedor"}
                </Button>
              </div>
            </form>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
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
                          provider.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
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

          {/* Paginador */}
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
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredProviders.length / itemsPerPage)))}
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