import { axiosInstance } from "../../../API/axiosInstance";
import { productType } from "@/types/products/product";

export const getIdProduct = async (id: string) => {
  const response = await axiosInstance.get(`/products/products/${id}`);
  return response.data;
};

export const getProduct = async () => {
  const response = await axiosInstance.get("/products/products");
  return response.data;
};

export const createProduct = async (products: Omit<productType, "id">) => {
  const response = await axiosInstance.post("/products/products", products);
  return response.data;
};

export const updateProduct = async (
  id: string,
  products: Partial<productType>
) => {
  const response = await axiosInstance.put(`/products/products/${id}`, products);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  await axiosInstance.delete(`/products/products/${id}`);
};
