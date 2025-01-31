"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchProviders, addProvider, editProvider } from "@/features/providers/providerSlice";
import { Plus, MoreHorizontal, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Provider } from "@/types/providers/providers";

export const ProvidersPage = () => {
  const dispatch = useAppDispatch();
  const { providers, isLoading, error } = useAppSelector((state) => state.providers);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const [form, setForm] = useState<Omit<Provider, "id">>({
    name: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
    bank_account: "",
    type_account: "",
    bank: "",
    status: true,
    logo: null,
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProviders(
      providers.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.phone.includes(searchTerm)
      )
    );
  }, [providers, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      dispatch(editProvider({ id: editingId.toString(), provider: form }));
      setEditingId(null);
    } else {
      dispatch(addProvider(form));
    }
    setForm({
      name: "",
      nit: "",
      email: "",
      phone: "",
      address: "",
      bank_account: "",
      type_account: "",
      bank: "",
      status: true,
      logo: null,
    });
  };

  const handleEdit = (provider: Provider) => {
    setEditingId(provider.id);
    setForm({
      name: provider.name,
      nit: provider.nit,
      email: provider.email,
      phone: provider.phone,
      address: provider.address,
      bank_account: provider.bank_account,
      type_account: provider.type_account,
      bank: provider.bank,
      status: provider.status,
      logo: provider.logo,
    });
  };


  return (
    <div className="p-8 bg-[#F5E6D3] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#4A3728]">Gestión de Proveedores</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading && <p className="text-[#4A3728] mb-4">Cargando...</p>}

      <div className="flex justify-between items-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#A9B18F] hover:bg-[#98A17E] text-white">
              <Plus className="mr-2 h-4 w-4" /> {editingId ? "Editar Proveedor" : "Añadir Nuevo Proveedor"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#F5E6D3] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[#4A3728]">{editingId ? "Editar Proveedor" : "Añadir Nuevo Proveedor"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(form).map((key) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    id={key}
                    value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={`Ingrese ${key}`}
                    className="border-[#8C7A6B]"
                  />
                </div>
              ))}
              <Button type="submit" className="w-full bg-[#A9B18F] hover:bg-[#98A17E] text-white">
                {editingId ? "Actualizar Proveedor" : "Crear Proveedor"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8C7A6B]" />
          <Input
            placeholder="Buscar proveedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[#8C7A6B] bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#8C7A6B]">
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Correo Electrónico</TableHead>
              <TableHead className="text-white">Teléfono</TableHead>
              <TableHead className="text-white text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProviders.map((provider) => (
              <TableRow key={provider.id} className="hover:bg-[#E5D6C3]">
                <TableCell className="font-medium text-[#4A3728]">{provider.name}</TableCell>
                <TableCell>{provider.email}</TableCell>
                <TableCell>{provider.phone}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(provider.email)}>
                        Copiar correo electrónico
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(provider)}>
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                     
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
