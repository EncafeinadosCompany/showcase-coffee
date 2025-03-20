import { axiosInstance } from "../../API/axiosInstance";
import { Sale, SalesPayload } from "../../types/transactions/saleModel";

export const getSale = async (): Promise<Sale[]> => {
  const response = await axiosInstance.get<Sale[]>("/transactions/sales");
  return response.data;
};

export const getSaleById = async (id: string | number): Promise<Sale | null> => {
  try {
    const response = await axiosInstance.get<Sale>(`/transactions/sales/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const createSale = async (sales: SalesPayload): Promise<Sale> => {
  const response = await axiosInstance.post<Sale>("/transactions/sales", sales);
  return response.data;
};

export const getShoppingVariant = async () => {
  const response = await axiosInstance.get("/transactions/shopping/shopping-variants");
  return response.data;
};