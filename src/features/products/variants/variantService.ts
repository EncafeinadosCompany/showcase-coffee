import { axiosInstance } from "../../../API/axiosInstance";
import { variantType } from "@/types/products/variant";


export const getIdVariant = async (id: string | number) => {
  const response = await axiosInstance.get(`/products/variants/${id}`);
  return response.data;
};


export const getVariants = async () => {
  const response = await axiosInstance.get("/products/variants");
  return response.data;
};


export const createVariant = async (variant: Omit<variantType, "id">) => {
  const response = await axiosInstance.post("/products/variants", variant);
  return response.data;
};


export const updateVariant = async (
  id: string | number,
  variant: Partial<variantType>
) => {
  const response = await axiosInstance.put(`/products/variants/${id}`, variant);
  return response.data;
};


export const deleteVariant = async (id: string | number) => {
  await axiosInstance.delete(`/products/variants/${id}`);
};
