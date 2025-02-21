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
import toast from "react-hot-toast";

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
      toast.error("Error al agregar la variante")
    } else {
      dispatch(addVariant(nuevaVariante));
      console.log("Variante agregada", nuevaVariante);
      toast.success(`La variante de ${gramaje}g ha sido agregada`)
    }
    setGramaje("");
    setIsModalOpen(false);
    dispatch(fetchProducts());
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
          <DialogTitle>Agregar Nueva Variante</DialogTitle>
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
              required
            />
          </div>

          <Button
            type="submit"
            className="bg-[#6F4E37] hover:bg-[#5A3E2B] text-white"
          >
            Agregar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
