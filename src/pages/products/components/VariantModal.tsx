import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchProducts } from "@/features/products/products/productSlice";
import { FC, useEffect } from "react";
import { Coffee, Package, Scale } from "lucide-react";

interface VariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  variants: { grammage: string; stock: number; id_product:number|string}[];
}

const VariantModal: FC<VariantModalProps> = ({ isOpen, onClose, variants }) => {

  const dispatch = useAppDispatch();
  const {products} = useAppSelector((state) => state.products);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="p-6 max-w-lg bg-[#faf6f1] h-[calc(100vh-120px)]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-[#582f0e]">
          <Coffee className="h-6 w-6" />
          Presentaciones
        </DialogTitle>
        <p className="text-[#8b7355] mt-2">Selecciona el tamaño de café que prefieras</p>
      </DialogHeader>

      <Accordion type="single" collapsible className="mt-4 overflow-y-auto ">
        {variants?.length > 0 ? (
          variants.map((variant) => (
            <AccordionItem
              key={variant.grammage}
              value={variant.grammage}
              className="border-[#dbc1ac] px-2">
              <AccordionTrigger className="hover:text-[#713f12]">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-[#713f12]" />
                  <span className="font-medium">{variant.grammage} </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 h-[calc(70vh-90px)]">
                <div className="space-y-3 py-0">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-[#8b7355]" />
                    <span className="text-[#713f12]">{products.find((p)=> p.id === variant.id_product)?.name}:</span>
                    <Badge variant="outline" className="bg-[#db8935] text-white border-none">
                      {variant.grammage} grams
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-[#8b7355]" />
                    <span className="text-[#713f12]">Stock:</span>
                    <Badge variant="outline" className="bg-[#582f0e] text-white border-none">
                      {variant.stock} Und
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="text-center py-8">
            <Coffee className="h-12 w-12 mx-auto text-[#8b7355] mb-3 opacity-50" />
            <p className="text-[#8b7355]">No hay variaciones de café disponibles por el momento</p>
          </div>
        )}
      </Accordion>
    </DialogContent>
  </Dialog>
  );
};

export default VariantModal;
