import * as z from "zod";
import { UseFormReturn } from "react-hook-form";
import { productSchema } from "./validation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchBrands } from "@/features/products/brands/brandSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tag, Info, CheckCircle, XCircle } from "lucide-react";

type ProductFormValues = z.infer<typeof productSchema>;

interface ReviewStepProps {
  form: UseFormReturn<ProductFormValues>;
}

export default function ReviewStep({ form }: ReviewStepProps) {
  const { watch } = form;
  const values = watch();
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((state) => state.brands) || { brands: [] };

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const brandName = values.id_brand
    ? brands.find((brand) => brand.id === values.id_brand)?.name
    : "No seleccionada";

  return (
    <div className="h-full w-full flex flex-col">
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-[#6F4E37]">
          Resumen del Producto
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna izquierda: Imagen */}
          <div className="lg:w-1/3 flex flex-col items-center justify-start">
            <div className="relative">
              <div className="w-full h-full rounded-xl overflow-hidden border-2 border-[#6F4E37]/20 shadow-lg">
                {values.image_url ? (
                  <img
                    src={values.image_url}
                    alt="Producto"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-64 flex items-center justify-center bg-gray-100">
                    <Info className="text-gray-300" />
                  </div>
                )}
              </div>
              <Badge
                className={`absolute top-3 right-3 ${values.status
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                  }`}
              >
                {values.status ? (
                  <CheckCircle className="w-4 h-4 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 mr-1" />
                )}
                {values.status ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>

          {/* Columna derecha: Información */}
          <div className="lg:w-2/3 space-y-1">
            {/* Información básica */}
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#6F4E37]/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Nombre del Producto</p>
                  <p className="font-medium text-lg">{values.name || "Sin nombre"}</p>
                </div>
                <div className="bg-[#6F4E37]/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Marca</p>
                  <p className="font-medium text-lg">{brandName}</p>
                </div>
              </div>
            </div>

            <Separator className="bg-[#6F4E37]/10" />

            {/* Atributos */}
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-[#6F4E37] flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Características del Producto
              </h3>

              {values.attributes.length > 0 ? (
                <ScrollArea className="rounded-xl border border-[#6F4E37]/10 max-h-60 overflow-auto">
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {values.attributes.map((attr, index) => (
                      <div
                        key={index}
                        className="bg-[#6F4E37]/5 p-3 rounded-xl hover:bg-[#6F4E37]/10 transition-colors"
                      >
                        <p className="text-sm font-medium text-[#6F4E37]">{attr.description}</p>
                        <p className="text-gray-700">{attr.value || "Sin valor"}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-xl">
                  <p className="text-gray-400">No se han agregado características al producto</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </CardContent>
    </div>
  );
}