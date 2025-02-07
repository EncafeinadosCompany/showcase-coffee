"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  fetchStores,
  addStore,
  editStore,
  removeStore,
} from "../../features/companies/storeSlice";
import {
  Search,
  Upload,
  ChevronLeft,
  ChevronRight,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Store } from "@/types/companies/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ListStore from "./components/ListStore";

export default function Stores() {
  const dispatch = useDispatch<AppDispatch>();
  const { stores } = useSelector((state: RootState) => state.stores);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState<Store[]>(stores);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const currentStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [newStore, setNewStore] = useState<Partial<Store>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: true,
  });

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
    setIsModalOpen(false);
    setNewStore({ name: "", email: "", phone: "", address: "", status: true });
    setSelectedFile(null);
  };

  const handleDelete = (id: number) => {
    dispatch(removeStore(id.toString()));
  };

  const handleStatusChange = (id: number) => {
    const storeToUpdate = stores.find((store) => store.id === id);
    if (storeToUpdate) {
      dispatch(
        editStore({
          id: id.toString(),
          store: { status: !storeToUpdate.status },
        })
      );
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <Card className="bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full h-full border-none">
        <CardHeader>
          <CardTitle className="text-[#4A3728] text-3xl">
            Gestión de Tiendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#db8935] hover:bg-[#8B4513] rounded-full text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  <Coffee className="mr-2 h-5 w-5" /> Añadir Nueva Cafetería
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#faf6f1] border-2 border-[#6F4E37] sm:max-w-[550px] rounded-lg shadow-xl">
                <DialogHeader>
                  <DialogTitle className="text-[#4A3728] text-2xl font-bold flex items-center justify-center">
                    <Coffee className="mr-2 h-6 w-6" /> Añadir Nueva Cafetería
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-[#4A3728] font-semibold"
                      >
                        Nombre de la Cafetería
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ej: Café Aroma"
                        name="name"
                        value={newStore.name}
                        onChange={handleInputChange}
                        className="border-[#8C7A6B] bg-[#FFF8E7] focus:ring-[#6F4E37] focus:border-[#6F4E37] rounded-[9px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-[#4A3728] font-semibold"
                      >
                        Correo Electrónico
                      </Label>
                      <Input
                        id="email"
                        placeholder="cafe@ejemplo.com"
                        name="email"
                        type="email"
                        value={newStore.email}
                        onChange={handleInputChange}
                        className="border-[#8C7A6B] bg-[#FFF8E7] focus:ring-[#6F4E37] focus:border-[#6F4E37]  rounded-[9px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-[#4A3728] font-semibold"
                      >
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        placeholder="123-456-7890"
                        name="phone"
                        value={newStore.phone}
                        onChange={handleInputChange}
                        className="border-[#8C7A6B] bg-[#FFF8E7] focus:ring-[#6F4E37] focus:border-[#6F4E37]  rounded-[9px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-[#4A3728] font-semibold"
                      >
                        Dirección
                      </Label>
                      <Input
                        id="address"
                        placeholder="Calle del Café, 123"
                        name="address"
                        value={newStore.address}
                        onChange={handleInputChange}
                        className="border-[#8C7A6B] bg-[#FFF8E7] focus:ring-[#6F4E37] focus:border-[#6F4E37]  rounded-[9px]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="logo"
                      className="text-[#4A3728] font-semibold"
                    >
                      Logo de la Cafetería
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="logo"
                        type="file"
                        onChange={handleFileChange}
                        className="border-[#8C7A6B] bg-[#FFF8E7] focus:ring-[#6F4E37] focus:border-[#6F4E37]  rounded-[9px]"
                      />
                      <Label htmlFor="logo" className="cursor-pointer">
                        <Upload className="h-6 w-6 text-[#6F4E37]" />
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="status"
                      checked={newStore.status}
                      onCheckedChange={(checked) =>
                        setNewStore({ ...newStore, status: checked })
                      }
                      className="data-[state=checked]:bg-[#6F4E37]"
                    />
                    <Label
                      htmlFor="status"
                      className="text-[#4A3728] font-semibold"
                    >
                      Cafetería Activa
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#6F4E37] hover:bg-[#8B4513] text-[#F5E6D3] font-semibold transition-all duration-300"
                  >
                    Crear Cafetería
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
                className="pl-10 border-[#8C7A6B] bg-[#fff] min-w-[300px] rounded-xl"
              />
            </div>
          </div>

          <div className="bg-white overflow-hidden">
            <div className="space-y-4">
              <ListStore
                currentStores={currentStores}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
              />

              {/* Pagination controls */}
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  className="border-[#D4C3B8] text-[#6F4E37] hover:bg-[#F5E6D3]"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-[#6F4E37]">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  className="border-[#D4C3B8] text-[#6F4E37] hover:bg-[#F5E6D3]"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
