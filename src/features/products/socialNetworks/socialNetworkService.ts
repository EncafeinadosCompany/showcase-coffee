import { axiosInstance } from "../../../API/axiosInstance";
import { BrandType } from "@/types/products/brand";

export const getSocialNetworks = async () => {
    const response = await axiosInstance.get("/products/brands/socialNetworks");
    return response.data;
};

export const createSocialBrand = async (socialNetwork: Omit<BrandType, "id">) => {
    const response = await axiosInstance.post("/products/brands/socialNetworks", socialNetwork);
    return response.data;
};
