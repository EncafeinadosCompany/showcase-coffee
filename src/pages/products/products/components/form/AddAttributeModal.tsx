import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Tag, Info, Search } from "lucide-react";
import { useState,} from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { productSchema } from "./validation";
import * as z from "zod";

type ProductFormValues = z.infer<typeof productSchema>;

interface Attribute {
  id: string | number;
  description: string;
}

interface AttributeDialogProps {
  attributes: Attribute[];
  fields: any[];
  append: UseFieldArrayAppend<ProductFormValues, "attributes">;
  onClose: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AttributeDialog({
  attributes,
  fields,
  append,
  // onClose,
  open,
  setOpen
}: AttributeDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getAvailableAttributes = () => {
    const addedAttributeIds = new Set<string | number>(
      fields
        .filter(field => field.id)
        .map(field => field.id)
    );

    const addedDescriptions = new Set(
      fields
        .filter(field => field.description && !field.id)
        .map(field => field.description)
    );

    return attributes.filter(attr =>
      !addedAttributeIds.has(attr.id) &&
      !addedDescriptions.has(attr.description) &&
      attr.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const availableAttributes = getAvailableAttributes();

  const handleAddAttribute = (attr: Attribute) => {
    append({
      id: typeof attr.id === 'number' ? attr.id : undefined,
      description: attr.description,
      value: "",
    });
    setOpen(false);
  };

  const handleCreateCustomAttribute = () => {
    append({ description: "", value: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#6F4E37]">Agregar nuevo atributo</DialogTitle>
          <DialogDescription>
            Seleccione un atributo existente o cree uno nuevo.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar características..."
            className="pl-10 border-[#6F4E37]/30 focus:border-[#6F4E37] rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ScrollArea className="h-56 rounded-xl border border-[#6F4E37]/20 p-2">
          {availableAttributes.length > 0 ? (
            availableAttributes.map((attr) => (
              <div
                key={attr.id}
                className="flex items-center p-2 hover:bg-[#6F4E37]/10 rounded-xl cursor-pointer group transition-colors"
                onClick={() => handleAddAttribute(attr)}
              >
                <Tag className="h-4 w-4 text-[#6F4E37] mr-2" />
                <span>{attr.description}</span>
                <Plus className="ml-auto h-4 w-4 text-[#6F4E37] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          ) : searchQuery ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Info className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500">No se encontraron características con "{searchQuery}"</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Info className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500">Todos las características ya han sido agregados</p>
            </div>
          )}
        </ScrollArea>

        <div className="mt-4">
          <Button
            className="w-full bg-[#6F4E37]/10 hover:bg-[#6F4E37]/20 text-[#6F4E37] rounded-xl flex items-center justify-center"
            onClick={handleCreateCustomAttribute}
          >
            <Plus className="mr-2 h-4 w-4" />
            Crear atributo personalizado
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}