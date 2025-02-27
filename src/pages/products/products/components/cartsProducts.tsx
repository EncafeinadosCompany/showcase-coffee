import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from "@/components/ui/tooltip";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { productType } from "@/types/products/product";
import { useState } from "react";
import { List } from "lucide-react";
import { motion } from "framer-motion";
import AttributeModal from "@/pages/products/products/components/attributesModal";
import VariantModal from "@/pages/products/products/components/VariantModal";
import ProductPage from "./example-usage";
export default function CartsProducts({ products }: { products: productType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden px-2">
      <div className="relative w-[300px]  min-w-full max-w-full sm:h-40 md:h-44 lg:h-[13rem] xl:h-[10rem] 2xl:h-[13rem]
             min-h-[10rem] max-h-[16rem] p-2 mt-2">
        <img
          src={products.image_url || "/public/undraw_coffee_7r49.svg"}
          alt={products.name}
          className="object-cover w-full h-full "
        />
      </div>
      <CardHeader className="flex flex-col items-center overflow-hidden ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="font-semibold text-lg mb-0 h-10overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
                {products.name}
              </p>
              <TooltipContent className="bg-[#99582a] text-white p-2 rounded-md text-sm">
                {products.name}
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardFooter>
        <div className="space-y-2 mt-auto  w-full">
          <AttributeModal attributes={products.attributes ?? []} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-full h-19 py-2 px-6 bg-gradient-to-r from-amber-600 to-amber-600 text-white text-xs font-medium  justify-center hover:from-amber-600 hover:to-amber-700 flex items-center gap-2 rounded-xl shadow-lg transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            <List className="h-4 w-4 text-white" />
            Ver Variantes
          </motion.button>
          <VariantModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            variants={products.product ?? []}
            productId={products.id}
            product_name={products.name}
            imagen={products?.image_url}
          />
          <ProductPage />
        </div>
      </CardFooter>
    </Card>
  );
}
