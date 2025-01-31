import { axiosInstance } from "../../../API/axiosInstance";
import { brandType } from "@/types/products/brand";


export const getBrandById = async (id: string | number) => {
  const response = await axiosInstance.get(`/brands/${id}`);
  return response.data;
};


export const getBrands = async () => {
  const response = await axiosInstance.get("/brands");
  return response.data;
};


export const createBrand = async (brand: Omit<brandType, "id">) => {
  const response = await axiosInstance.post("/brands", brand);
  return response.data;
};


export const updateBrand = async (id: string | number, brand: Partial<brandType>) => {
  const response = await axiosInstance.put(`/brands/${id}`, brand);
  return response.data;
};


export const deleteBrand = async (id: string | number) => {
  await axiosInstance.delete(`/brands/${id}`);
};
