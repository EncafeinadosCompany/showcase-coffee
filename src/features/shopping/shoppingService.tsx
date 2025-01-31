import { axiosInstance } from "../../API/axiosInstance";
import { Shopping } from "../../types/shopping/shoppingModel";

export const getShopping = async () => {
  const response = await axiosInstance.get("/shopping");
  return response.data;
};

export const getShoppingVariant = async () => {
  const response = await axiosInstance.get("/shopping/variant/all");
  return response.data;
};

export const getShoppingById = async (id: any) => {
  const response = await axiosInstance.get(`/shopping/${id}`);
  return response.data;
};

export const getShoppingVariantById = async (id: any) => {
  const response = await axiosInstance.get(`/shopping/variant/${id}`);
  return response.data;
};

export const createShopping = async (shopping: Omit<Shopping, "id">) => {
  const response = await axiosInstance.post("/shopping", shopping);
  return response.data;
};
