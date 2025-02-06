import { ShoppingVariant2 } from "@/types/transactions/shoppingModel";
import { axiosInstance } from "../../API/axiosInstance";

export const getShopping = async () => {
  const response = await axiosInstance.get("/shopping");
  return response.data;
};

export const getShoppingVariant = async () => {
  const response = await axiosInstance.get("/transactions/shopping-variants");
  return response.data;
};

export const getShoppingById = async (id: unknown) => {
  const response = await axiosInstance.get(`/shopping/${id}`);
  return response.data;
};

export const getShoppingVariantById = async (id: string) => {
  const response = await axiosInstance.get(`/shopping/shopping-variants/${id}`);
  return response.data;
};

export const createShopping = async (shoppingData: ShoppingVariant2) => {
  const response = await axiosInstance.post("/shopping", shoppingData, {
    headers: {
      "Content-Type": "application/json", // Asegúrate de que el contenido sea JSON
    },
  });
  return response.data;
};