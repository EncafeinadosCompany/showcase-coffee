import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Heart, List } from "lucide-react";
import VariantModal from "./VariantModal"; // Importamos el nuevo componente
import { productType } from "@/types/products/product";

const ProductCard = ({ product }: { product: productType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">

        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand?.name ?? "N/A"}</p>

        <div className="space-y-2">
          {/* Botón Ver Atributos con HoverCard */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button  className=" mx-auto  h-2 py-4 px-3 bg-[#ffffff] border-[1px] border-black text-black text-xs hover:bg-[#eec6a5] flex items-center gap-2   rounded-xl transition-all">
                <Heart className="h-4 w-4 text-[#db8935]" />
                Ver Atributos
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 p-4 shadow-lg rounded-lg bg-white">
              <div className="space-y-2">
                {product.attributes && product.attributes.length > 0 ? (
                  product.attributes.map((attr, index) => (
                    <div key={index} className="flex items-center gap-2 text-cafe-medium">
                      <span className="font-semibold">{attr.description}:</span>
                      <Badge variant="caramel">{attr.attributes_products?.value || "N/A"}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No hay atributos disponibles</p>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Botón Ver Variantes que abre el Modal */}
          <Button  onClick={() => setIsModalOpen(true)} className=" mx-auto h-2 py-4 px-3 bg-[#db8935] text-white text-xs hover:bg-[#eec6a5] flex items-center gap-2  rounded-xl transition-all w-full">
            <List className="h-4 w-4 text-white" />
            Ver Variantes
          </Button>

          {/* Modal de variantes */}
          <VariantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} variants={product.product ?? []} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
