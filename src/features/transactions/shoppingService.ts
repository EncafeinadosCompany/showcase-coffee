import { ShoppingData } from "@/types/transactions/shoppingModel";
import { axiosInstance } from "../../API/axiosInstance";

export const getShopping = async () => {
  const response = await axiosInstance.get("/transactions/shopping");
  return response.data;
};

export const getShoppingVariant = async () => {
  const response = await axiosInstance.get("/transactions/shopping/shopping-variants");
  return response.data;
};

export const getShoppingVariantsByShoppingId = async (id: string) => {
  const response = await axiosInstance.get(`/transactions/shopping/shopping-variants-by-shopping/${id}`);
  return response.data;
};

export const getShoppingById = async (id: unknown) => {
  const response = await axiosInstance.get(`/transactions/shopping/${id}`);
  return response.data;
};

export const getShoppingVariantById = async (id: string) => {
  const response = await axiosInstance.get(`/transactions/shopping/shopping-variants/${id}`);
  return Array.isArray(response.data) ? response.data : [response.data]; 
};

export const createShopping = async (shoppingData: ShoppingData) => {
  const response = await axiosInstance.post("/transactions/shopping", shoppingData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};