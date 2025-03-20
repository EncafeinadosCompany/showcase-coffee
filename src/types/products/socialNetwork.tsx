export type SocialNetwork = {
  id: number;
  name: string;
};

export type BrandSocialNetworkType = {
  id_brand?: number;
  id_social_network: number;
  description: string;
  url: string;
};
