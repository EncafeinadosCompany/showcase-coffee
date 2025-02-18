import { axiosInstance } from "../../API/axiosInstance";

export const getTotalLiquidacions = async (id: string) => {
  const response = await axiosInstance.get(`/products/products/${id}`);
  return response.data;
};

export const getTotalDeposit = async () => {
  const response = await axiosInstance.get("/products/products");
  return response.data;
};



