const BRANDS = [
    { id: 1, name: "Café Delicioso", description: "Una marca premium de café" },
    { id: 2, name: "Aroma Intenso", description: "Café de origen único" }
]

import * as z from "zod"
import { UseFormReturn} from "react-hook-form";
import { productSchema } from "./validation";
import { ScrollArea } from "@radix-ui/react-scroll-area";


type ProductFormValues = z.infer<typeof productSchema>
interface ReviewStepProps {
  form: UseFormReturn<ProductFormValues>;
}

export default function ReviewStep({ form }: ReviewStepProps) {
    const { watch } = form
    const values = watch()
    const selectedBrand = BRANDS.find((brand) => brand.id === values.id_brand)
  
    return (
      <div className="space-y-4 flex gap-5 ">
        <div className="space-y-4 w-[50%]">
        <div>
          <p>
            <strong className="text-gray-700 font-medium">Nombre:</strong> {values.name}
          </p>
          <p>
            <strong className="text-gray-700 font-medium">Marca:</strong> {selectedBrand?.name}
          </p>
          <p>
            <strong className="text-gray-700 font-medium">Estado:</strong> {values.status ? "Activo" : "Inactivo"}
          </p>
        </div>
        <div>
        <h3 className="text-md font-semibold text-[#6F4E37] mb-2">Atributos:</h3>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <ul className="space-y-2">
            {values.attributes.map((attr, index) => (
              <li key={index} className="text-gray-700">
                <span className="font-medium">{attr.description}:</span> {attr.value}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

        </div>
        <div className="w-[50%]">
        {values.image_url && (
          <div>
            <h3 className="text-md font-semibold text-[#6F4E37]">Imagen del Producto:</h3>
            <img
              src={values.image_url || "/placeholder.svg"}
              alt="Producto"
              className="mt-4 mx-auto w-60 h-60 rounded-full border-2 border-[#6F4E37] object-cover"
            />
          </div>
        )}
        </div>
    
        
      </div>
    )
  }
  