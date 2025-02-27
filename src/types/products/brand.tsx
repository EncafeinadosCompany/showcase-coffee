import { BrandSocialNetworkType } from "./socialNetwork";
import { z } from "zod";

export type brandType = {
  id: number;
  name: string;
  image_url: string | null;
  razon: string | null;
  description: string;
  created_at: string;
  updated_at: string;
  products?: Array<{ id: string | number, name: string, status: boolean, create_at: string }>
  social_networks: {
    description: string;
    url: string;
    social_network: {
      id: number;
      name: string;
    };
  }[];
};

export type BrandType = {
  id?: number;
  name: string;
  image_url: string | null;
  purpose: string | null;
  description: string;
  social_networks: BrandSocialNetworkType[];
}

export const brandFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(50, "El nombre no debe exceder 50 caracteres"),
  image_url: z.string().nullable(),
  purpose: z.string().nullable(),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  social_networks: z.array(
    z.object({
      social_network_id: z.number().min(1, "Selecciona una red social"),
      url: z.string().refine(
        (_val) => {
          // Customizable validation based on network type can be added here
          return true;
        },
        {
          message: "Formato inválido para la red social seleccionada",
        }
      ),
      description: z.string(),
    })
  ),
});

export type BrandFormValues = z.infer<typeof brandFormSchema>;