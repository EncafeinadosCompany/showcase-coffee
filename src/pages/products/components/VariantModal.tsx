import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FC, useState } from "react";
import { Coffee, Package, Scale } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion, AnimatePresence } from "framer-motion"

interface VariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  variants: { grammage: string; stock: number; id_product: number | string }[];
  product_name: string;
  imagen: string;
}

interface Variant {
  grammage: string
  stock: number
}

const VariantModal: FC<VariantModalProps> = ({ isOpen, onClose, variants, product_name, imagen }) => {

const [hoveredVariant, setHoveredVariant] = useState<Variant | null>(null)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="p-0 max-w-4xl bg-[#faf6f1] h-[calc(100vh-80px)] flex flex-col overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-3xl font-bold text-[#582f0e]">
            <Coffee className="h-8 w-8" /> {product_name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 p-6 flex-1 overflow-hidden">
          {/* Imagen creativa */}
          <div className="flex-shrink-0 w-full md:w-1/2 relative overflow-hidden rounded-2xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#db8935] to-[#582f0e] opacity-20"></div>
            {imagen ? (
              <img src={imagen || "/placeholder.svg"} alt={product_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#f3e5d8]">
                <Coffee className="h-32 w-32 text-[#8b7355]" />
              </div>
            )}
            <AnimatePresence>
              {hoveredVariant && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4"
                >
                  <p className="text-2xl font-bold">{hoveredVariant.grammage}</p>
                  <p className="text-sm">Stock: {hoveredVariant.stock} unidades</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ScrollArea className="flex-1 h-[60vh] overflow-auto">
            <div className="space-y-4 pr-4">
              {
                variants.length > 0 ? (
                  variants.map((variant, index) => (
                    <motion.div
                      key={variant.grammage}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white shadow-lg rounded-xl border-l-4 border-[#db8935] hover:shadow-xl transition-all"
                      onMouseEnter={() => setHoveredVariant(variant)}
                      onMouseLeave={() => setHoveredVariant(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#db8935] rounded-full p-2">
                            <Scale className="h-6 w-6 text-white" />
                          </div>
                          <span className="text-[#713f12] font-bold text-xl">{variant.grammage}</span>
                        </div>
                        <Badge variant="outline" className="bg-[#582f0e] text-white border-none px-3 py-1 text-sm">
                          Stock: {variant.stock}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-[#8b7355]">
                        <Package className="h-4 w-4" />
                        <span className="text-sm">Presentación de {variant.grammage} gramos</span>
                      </div>
                    </motion.div>
                  ))
                ): <div className="flex content-center justify-center items-center h-32">
                  <span className="text-[#713f12] text-xl ">No hay referencias disponibles</span>
                </div>

              }
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VariantModal;
