import { axiosInstance } from "../../API/axiosInstance";

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const getProviders = async () => {
  const response = await axiosInstance.get("/provider");
  return response.data;
};

export const createProvider = async (provider: Omit<Provider, "id">) => {
  const response = await axiosInstance.post("/provider", provider);
  return response.data;
};

export const updateProvider = async (id: string, provider: Partial<Provider>) => {
  const response = await axiosInstance.put(`/provider/${id}`, provider);
  return response.data;
};

export const deleteProvider = async (id: string) => {
  await axiosInstance.delete(`/providers/${id}`);
};
