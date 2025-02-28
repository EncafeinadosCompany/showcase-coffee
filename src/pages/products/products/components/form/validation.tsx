import * as z from "zod"


export const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  id_brand:  z.number().positive().or(z.undefined()).refine((val) => val !== undefined, {
    message: "Debe seleccionar una marca",
  }),
  image_url: z.string().url("URL de imagen inválida").optional().or(z.literal("")),
  status: z.boolean(),
  attributes: z.array(
    z.object({
      id: z.number().optional(),
      description: z.string().min(1, "La descripción es requerida"),
      value: z.string().min(1, "El valor es requerido").max(500, "El valor no puede superar los 500 caracteres"),
    }),
  ).min(1, "Debe agregar al menos un atributo")
})