import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { FC } from "react";

interface VariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  variants: { grammage: string; stock: number }[];
}

const VariantModal: FC<VariantModalProps> = ({ isOpen, onClose, variants }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Variantes del Producto</h2>
        <Accordion type="single" collapsible>
          {variants?.length > 0 ? (
            variants.map((variant, index) => (
              <AccordionItem key={index} value={`variant-${index}`}>
                <AccordionTrigger>{variant.grammage} g</AccordionTrigger>
                <AccordionContent>
                  <Badge variant="outline" className="mt-2">Stock: {variant.stock}</Badge>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hay variantes disponibles</p>
          )}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};

export default VariantModal;
