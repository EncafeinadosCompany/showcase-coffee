import * as z from "zod"


export const productSchema = z.object({
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