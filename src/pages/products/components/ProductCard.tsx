import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { List } from "lucide-react";
import VariantModal from "./VariantModal";
import { productType } from "@/types/products/product";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AttributeModal from "./attributesModal";
import { motion } from "framer-motion";

const ProductCard = ({ product }: { product: productType }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="font-semibold text-lg mb-2 h-12 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
              {product.name}
            </h3>
          </TooltipTrigger>
          <TooltipContent className="bg-[#99582a] text-white p-2 rounded-md text-sm">
            {product.name}
          </TooltipContent>
        </Tooltip>

        <p className="text-sm text-gray-600 mb-2">{product.brand?.name ?? "N/A"}</p>
        <div className="space-y-2 mt-auto">
          <AttributeModal attributes={product.attributes ?? []} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto h-19 py-2 px-6 bg-gradient-to-r from-amber-600 to-amber-600 text-white text-xs font-medium hover:from-amber-600 hover:to-amber-700 flex items-center gap-2 rounded-xl shadow-lg transition-all"
            onClick={() => setIsModalOpen(true)}

          >
            <List className="h-4 w-4 text-white" />
            Ver Variantes
          </motion.button>
          <VariantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} variants={product.product ?? []} product_name={product.name} imagen={product.image_url} />
        </div>

      </CardContent>
    </Card>

  );
};

export default ProductCard;
