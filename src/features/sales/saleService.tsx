import { axiosInstance } from "../../API/axiosInstance";
import {Sales} from "../../types/sales/saleModel"


export const getSale = async () => {
  const response = await axiosInstance.get("/sales");
  return response.data;
};
export const getSaleVariant = async () => {
  const response = await axiosInstance.get("/sales/variant/all");
  return response.data;
};

export const getSaleById = async (id: any) => {
  const response = await axiosInstance.get(`/sales/${id}`);
  return response.data;
};

export const getSaleVariantById = async (id: any) => {
  const response = await axiosInstance.get(`/sales/variant/${id}`);
  return response.data;
};

export const createSale = async (sales: Omit<Sales, "id">) => {
  const response = await axiosInstance.post("/sales", sales);
  return response.data;
};
