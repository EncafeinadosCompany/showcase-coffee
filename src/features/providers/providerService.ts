import { axiosInstance } from "../../API/axiosInstance";
import { Provider } from "../../types/providers/providers";

export const getProviders = async (): Promise<Provider[]> => {
  const response = await axiosInstance.get("/providers"); 
  return response.data;
};

export const getProvidersByStore = async (storeId: number): Promise<Provider[]> => {
  const response = await axiosInstance.get(`/store-provider/store/${storeId}`);
  return response.data;
};

export const createProvider = async (provider: Omit<Provider, "id">): Promise<Provider> => {
  const response = await axiosInstance.post("/providers", provider);
  return response.data;
};

export const associateProviderToStore = async (storeId: number, providerId: number): Promise<void> => {
  await axiosInstance.post("/store-provider", { storeId, providerId });
};

export const updateProvider = async (id: string, provider: Partial<Provider>): Promise<Provider> => {
  const response = await axiosInstance.put(`/providers/${id}`, provider);
  return response.data;
};

export const deleteProvider = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/providers/${id}`);
};
