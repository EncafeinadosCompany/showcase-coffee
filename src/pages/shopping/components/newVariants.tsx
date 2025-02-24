import { variantType } from "@/types/products/variant";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { addVariant } from "@/features/products/variants/vatiantSlice";
import { fetchProducts } from "@/features/products/products/productSlice";
import { showToast } from "@/features/common/toast/toastSlice";

export default function NewVariantDialog({ productoId }: { productoId: number; }) {
  const [gramaje, setGramaje] = useState("");
  const { error } = useAppSelector((state) => state.variants);
  const dispatch = useAppDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const nuevaVariante: variantType = {
      grammage: gramaje,
      id_product: productoId,
      image_url: "example.svg",
    };

    if (error) {
      dispatch(showToast({ message: "Error al agregar la variante", type: "error" }));
    } else {
      dispatch(addVariant(nuevaVariante))
      .unwrap()
      .then(() => {
        dispatch(showToast({ message: `La variante de ${gramaje}g ha sido agregada`, type: "success" }));
        dispatch(fetchProducts());
      })
      .catch(() => {
        dispatch(showToast({ message: "La variante ya existe", type: "error" }));
      })
    
    }
    setGramaje("");
    setIsModalOpen(false);
    
  };

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 bg-[#6F4E37] hover:bg-[#5A3E2B] text-white">
          <Coffee className="mr-2 h-4 w-4" /> Agregar Variante
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle className="mx-auto">Agregar una nueva referencia</DialogTitle>
        </DialogHeader>
        <p id="dialog-description" className="sr-only">
          Por favor, completa los campos a continuación para agregar una nueva
          variante de producto.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="gramaje"
              className="block text-sm font-medium text-gray-700"
            >
              Gramaje
            </label>
            <Input
              id="gramaje"
              type="text"
              value={gramaje}
              onChange={(e) => setGramaje(e.target.value)}
              className="rouned-sm mt-2 border border-gray-300 focus:border-coffee-500 focus:rounded-sm focus:ring-coffee-500"
              required
            />
          </div>

          <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white rounded-sm w-1/2"
          >
            Agregar
          </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
