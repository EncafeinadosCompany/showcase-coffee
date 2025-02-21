import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form"

import * as z from "zod"

const BRANDS = [
    { id: 1, name: "Café Delicioso", description: "Una marca premium de café" },
    { id: 2, name: "Aroma Intenso", description: "Café de origen único" },
    // ... más marcas
  ]


  const productSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    id_brand: z.number().min(1, "Seleccione una marca"),
    image_url: z.string().url("URL de imagen inválida"),
    status: z.boolean(),
    attributes: z.array(
      z.object({
        id: z.number().optional(),
        description: z.string().min(1, "La descripción es requerida"),
        value: z.string().min(1, "El valor es requerido"),
      }),
    ),
  })
  
  type ProductFormValues = z.infer<typeof productSchema>


interface BasicInfoStepProps {
    form: UseFormReturn<ProductFormValues>;
    imagePreview: string | null;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicInfoStep({ form, imagePreview, handleImageChange }: BasicInfoStepProps) {
    return (
        <div className="grid grid-cols-2 gap-6 items-center">
          {/* Vista previa de la imagen */}
          <div className="flex justify-center">
            <img
              src={imagePreview || "/placeholder.svg"}
              alt="Vista previa del producto"
              className="w-52 h-52 rounded-full border-2 border-[#6F4E37] object-cover"
            />
          </div>
      
          {/* Formulario */}
          <div className="space-y-4">
           
            <FormField
              control={form.control}
              name="id_brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#6F4E37]">Marca</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[#6F4E37]">
                        <SelectValue placeholder="Seleccione una marca" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BRANDS.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url"
              render={() => (
                <FormItem>
                  <FormLabel className="text-[#6F4E37]">Imagen del producto</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="border-[#6F4E37]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#6F4E37]">Nombre del producto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el nombre del producto"
                      {...field}
                      className="border-[#6F4E37] rounded-[5px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );      
  }