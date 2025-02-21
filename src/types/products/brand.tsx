
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