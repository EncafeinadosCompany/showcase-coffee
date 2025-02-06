import { axiosInstance } from "../../API/axiosInstance";
import { Shopping } from "../../types/transactions/shoppingModel";

export const getShopping = async () => {
  const response = await axiosInstance.get("/shopping");
  return response.data;
};

export const getShoppingVariant = async () => {
  const response = await axiosInstance.get("/transactions/shopping-variants");
  return response.data;
};

export const getShoppingById = async (id: any) => {
  const response = await axiosInstance.get(`/transactions/shopping/${id}`);
  return response.data;
};

export const getShoppingVariantById = async (id: any) => {
  const response = await axiosInstance.get(`/transactions/shopping/shopping-variants/${id}`);
  return response.data;
};

export const createShopping = async (shopping: Omit<Shopping, "id">) => {
  const response = await axiosInstance.post("/transactions/shopping", shopping);
  return response.data;
};
