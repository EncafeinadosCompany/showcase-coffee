import { Award, Coffee, Sparkles, Star, Stars } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
interface VariantModalProps {
  attributes: Array<{ id?: number, description: string; value?: string, attributes_products?: { value: string } }>;
}

const getIconForAttribute = (description: string) => {
  const lowerDesc = description.toLowerCase()
  if (lowerDesc.includes("aroma") || lowerDesc.includes("sabor")) return Coffee
  if (lowerDesc.includes("calidad") || lowerDesc.includes("premium")) return Star
  if (lowerDesc.includes("origen") || lowerDesc.includes("variedad")) return Sparkles
  return Award
}


const AttributeModal = ({ attributes }: VariantModalProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-full h-19 py-2 px-6 bg-gradient-to-r bg-white text-amber-950 justify-center border-gray-300 border-[0.01px] text-xs font-medium hover:from-gray-100 hover:to-gray-200 flex items-center gap-2 rounded-xl shadow-lg transition-all"
        >
          <Star className="h-4 w-4 text-yellow-700" />
          Ver Atributos
        </motion.button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px] min-h-[320px] bg-[#faf6f1] rounded-lg p-0 overflow-hidden border border-amber-200">
        <DialogHeader className="pt-4 px-6 bg-gradient-to-b from-gray-200 to-[#faf6f1] rounded-t-lg">
          <div className="flex items-center gap-2 text-center">
            <Stars className="h-7 w-7 text-amber-500" />
            <DialogTitle className="text-xl font-semibold text-amber-700 font-serif ">
              Cada café tiene su esencia. Descubre sus atributos.
            </DialogTitle>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-auto px-4 py-2">
          <div className="space-y-2">
            {attributes?.length ? (
              attributes.map((attr, index) => {
                const Icon = getIconForAttribute(attr.description)
                return (
                  <motion.div
                    key={attr.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3  p-4 bg-white shadow-lg rounded-xl border-l-4 border-[#db8935] hover:shadow-xl transition-all"
                  >
                    <div className="bg-gradient-to-r from-amber-400 to-yellow-400 p-2 rounded-full">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-800">{attr.description}</h3>
                      <Badge className="mt-1 bg-[#faf6f1] text-amber-950 hover:bg-amber-200 rounded-2xl ">
                        {attr.attributes_products?.value || "N/A"}
                      </Badge>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <p className="text-amber-800 text-center italic">No hay atributos disponibles para este producto.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )

}

export default AttributeModal;