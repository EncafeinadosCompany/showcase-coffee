import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ImageIcon, User, Mail, Phone, MapPin, ToggleLeft, Settings, MoreHorizontal, Edit, Trash2} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Store } from "@/types/companies/store";

export default function ListStore({
  currentStores,
  handleStatusChange,
  handleDelete,
}: {
  handleStatusChange: (id: number) => void;
  handleDelete: (id: number) => void;
  currentStores: Store[];
}){
  return (
   
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F5E6D3] rounded-xl border-[#D4C3B8]">
            <TableHead className="py-4">
              <div className="flex items-center gap-2 text-[#6F4E37]">
                <ImageIcon className="h-4 w-4" />
                <span className="font-medium">Logo</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2 text-[#6F4E37]">
                <User className="h-4 w-4" />
                <span className="font-medium">Nombre</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2 text-[#6F4E37]">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Correo</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2 text-[#6F4E37]">
                <Phone className="h-4 w-4" />
                <span className="font-medium">Teléfono</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2 text-[#6F4E37]">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">Ubicación</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2 text-[#6F4E37]">
                <ToggleLeft className="h-4 w-4" />
                <span className="font-medium">Estado</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2 text-[#6F4E37]">
                <Settings className="h-4 w-4" />
                <span className="font-medium">Acciones</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStores.map((store) => (
            <TableRow
              key={store.id}
              className="hover:bg-[#f5e6d357] transition-colors duration-200"
            >
              <TableCell className="py-3">
                {store.logo ? (
                  <img
                    src={store.logo || "/placeholder.svg"}
                    alt={`Logo de ${store.name}`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#8B4513]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#8B4513] flex items-center justify-center text-white font-medium">
                    {store.name.charAt(0)}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span className="font-medium text-[#4A3728]">{store.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-[#6F4E37]">{store.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-[#6F4E37]">{store.phone}</span>
              </TableCell>
              <TableCell>
                <span className="text-[#6F4E37]">{store.address}</span>
              </TableCell>
              <TableCell>
                <Switch
                  checked={store.status}
                  onCheckedChange={() => handleStatusChange(store.id)}
                  className="data-[state=checked]:bg-[#8B4513]"
                />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-[#F5E6D3]"
                    >
                      <MoreHorizontal className="h-4 w-4 text-[#6F4E37]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white border border-[#D4C3B8]"
                  >
                    <DropdownMenuLabel className="text-[#6F4E37] font-medium">
                      Acciones
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[#D4C3B8]" />
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(store.email)}
                      className="hover:bg-[#F5E6D3] text-[#6F4E37] cursor-pointer"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Copiar correo
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-[#F5E6D3] text-[#6F4E37] cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(store.id)}
                      className="hover:bg-[#F5E6D3] text-[#6F4E37] cursor-pointer"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
