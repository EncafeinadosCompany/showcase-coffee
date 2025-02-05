import { axiosInstance } from "../../API/axiosInstance";
import { Sales } from "../../types/sales/saleModel";

export const getSale = async (): Promise<Sales[]> => {
  const response = await axiosInstance.get<Sales[]>("/sales");
  return response.data;
};

export const getSaleById = async (id: string | number): Promise<Sales | null> => {
  try {
    const response = await axiosInstance.get<Sales>(`/sales/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createSale = async (sales: Omit<Sales, "id">): Promise<Sales> => {
  const response = await axiosInstance.post<Sales>("/sales", sales);
  return response.data;
};

export const getShoppingVariant = async () => {
  const response = await axiosInstance.get("/shopping/shopping-variants");
  return response.data;
};
