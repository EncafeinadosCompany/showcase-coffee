"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchStores, addStore, editStore, removeStore } from "../../features/companies/storeSlice";
import { Plus, MoreHorizontal, Search, Edit, Trash2, Upload } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Store } from "@/types/companies/store";

export default function Stores() {
  const dispatch = useDispatch<AppDispatch>();
  const { stores } = useSelector((state: RootState) => state.stores);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState<Store[]>(stores);
  const [newStore, setNewStore] = useState<Partial<Store>>({ name: "", email: "", phone: "", address: "", status: true });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  useEffect(() => {
    setFilteredStores(
      stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          store.phone.includes(searchTerm) ||
          store.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [stores, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStore({ ...newStore, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const store: Omit<any, "id"> = {
      ...newStore,
      logo: selectedFile ? URL.createObjectURL(selectedFile) : null,
    };
    dispatch(addStore(store));
    setNewStore({ name: "", email: "", phone: "", address: "", status: true });
    setSelectedFile(null);
  };

  const handleDelete = (id: number) => {
    dispatch(removeStore(id.toString()));
  };

  const handleStatusChange = (id: number) => {
    const storeToUpdate = stores.find((store) => store.id === id);
    if (storeToUpdate) {
      dispatch(editStore({ id: id.toString(), store: { status: !storeToUpdate.status } }));
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#4A3728]">Gestión de Tiendas</h1>

      <div className="flex justify-between items-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#A9B18F] hover:bg-[#98A17E] text-white">
              <Plus className="mr-2 h-4 w-4" /> Añadir Nueva Tienda
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#F5E6D3] sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="text-[#4A3728]">Añadir Nueva Tienda</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Tienda</Label>
                  <Input
                    id="name"
                    placeholder="Nombre de la Tienda"
                    name="name"
                    value={newStore.name}
                    onChange={handleInputChange}
                    className="border-[#8C7A6B]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    placeholder="Correo Electrónico"
                    name="email"
                    type="email"
                    value={newStore.email}
                    onChange={handleInputChange}
                    className="border-[#8C7A6B]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    placeholder="Teléfono"
                    name="phone"
                    value={newStore.phone}
                    onChange={handleInputChange}
                    className="border-[#8C7A6B]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    placeholder="Dirección"
                    name="address"
                    value={newStore.address}
                    onChange={handleInputChange}
                    className="border-[#8C7A6B]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo de la Tienda</Label>
                <div className="flex items-center space-x-2">
                  <Input id="logo" type="file" onChange={handleFileChange} className="border-[#8C7A6B]" />
                  <Label htmlFor="logo" className="cursor-pointer">
                    <Upload className="h-6 w-6 text-[#8C7A6B]" />
                  </Label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newStore.status}
                  onCheckedChange={(checked) => setNewStore({ ...newStore, status: checked })}
                />
                <Label htmlFor="status">Tienda Activa</Label>
              </div>
              <Button type="submit" className="w-full bg-[#A9B18F] hover:bg-[#98A17E] text-white">
                Crear Tienda
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8C7A6B]" />
          <Input
            placeholder="Buscar tiendas..."
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
              <TableHead className="text-white">Logo</TableHead>
              <TableHead className="text-white">Nombre</TableHead>
              <TableHead className="text-white">Correo Electrónico</TableHead>
              <TableHead className="text-white">Teléfono</TableHead>
              <TableHead className="text-white">Dirección</TableHead>
              <TableHead className="text-white">Estado</TableHead>
              <TableHead className="text-white">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStores.map((store) => (
              <TableRow key={store.id} className="hover:bg-[#E5D6C3]">
                <TableCell>
                  {store.logo ? (
                    <img
                      src={store.logo || "/placeholder.svg"}
                      alt={`Logo de ${store.name}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#8C7A6B] flex items-center justify-center text-white font-bold">
                      {store.name.charAt(0)}
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-[#4A3728]">{store.name}</TableCell>
                <TableCell>{store.email}</TableCell>
                <TableCell>{store.phone}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>
                  <Switch
                    checked={store.status}
                    onCheckedChange={() => handleStatusChange(store.id)}
                    className="data-[state=checked]:bg-[#A9B18F]"
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(store.email)}>
                        Copiar correo electrónico
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(store.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
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
}