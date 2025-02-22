import { BrandSocialNetworkType } from "./socialNetwork";
import * as z from "zod";

export type brandType = {
    id: number;
    name: string;
    image_url: string | null;
    razon: string | null;
    description: string;
    created_at: string;
    updated_at: string;
    products?: Array<{ id: string | number, name: string, status:boolean , create_at: string }>
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
  name: string;
  image_url: string | null;
  purpose: string | null;
  description: string;
  social_networks: BrandSocialNetworkType[];
}

export const brandFormSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  image_url: z.string().nullable(),
  purpose: z.string().nullable(),
  description: z.string().min(1, "La descripción es obligatoria"),
  social_networks: z.array(z.object({
    social_network_id: z.number(),
    description: z.string(),
    url: z.string().url("URL inválida"),
  })),
});

export type FormValues = z.infer<typeof brandFormSchema>;