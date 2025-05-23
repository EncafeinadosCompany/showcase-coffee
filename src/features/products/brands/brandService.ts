import { axiosInstance } from "../../../API/axiosInstance";
import { BrandType } from "@/types/products/brand";

export const getBrandById = async (id: string | number) => {
  const response = await axiosInstance.get(`/products/brands/${id}`);
  return response.data;
};

export const getBrands = async () => {
  const response = await axiosInstance.get("/products/brands");
  return response.data;
};

export const createBrand = async (brand: Omit<BrandType, "id">) => {
  const response = await axiosInstance.post("/products/brands", brand);
  return response.data;
};

export const editBrand = async (
  id: string | number,
  brand: Partial<BrandType>
) => {
  const response = await axiosInstance.put(`/products/brands/${id}`, brand);
  return response.data;
};

export const deleteBrand = async (id: string | number) => {
  await axiosInstance.delete(`/products/brands/${id}`);
};
