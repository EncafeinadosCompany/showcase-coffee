import { axiosInstance } from "../../API/axiosInstance";
import { Provider } from "../../types/providers/providers";

export const getProviders = async (): Promise<Provider[]> => {
  const response = await axiosInstance.get("/provider");
  return response.data;
};

export const createProvider = async (provider: Omit<Provider, "id">): Promise<Provider> => {
  const response = await axiosInstance.post("/providers", provider);
  return response.data;
};

export const updateProvider = async (id: string, provider: Partial<Provider>): Promise<Provider> => {
  const response = await axiosInstance.put(`/providers/${id}`, provider);
  return response.data;
};

export const deleteProvider = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/providers/${id}`);
};
