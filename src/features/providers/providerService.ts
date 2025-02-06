import { axiosInstance } from "../../API/axiosInstance";
import { Provider } from "../../types/providers/providers";

export const getProviders = async (): Promise<Provider[]> => {
  const response = await axiosInstance.get("/companies/providers"); 
  return response.data;
};

export const getProvidersByStore = async (storeId: number): Promise<Provider[]> => {
  const response = await axiosInstance.get(`/companies/alliances/store/${storeId}`);
  console.log("Respuesta del backend:", response.data);

  // Extraer solo los objetos `provider` de la respuesta
  const providers: Provider[] = response.data.map((item: { provider: Provider }) => item.provider);
  console.log("Proveedores transformados:", providers); // Verifica los proveedores transformados
  return providers;
};

export const createProvider = async (provider: Omit<Provider, "id">): Promise<Provider> => {
  const response = await axiosInstance.post("/companies/providers", provider);
  return response.data;
};

export const associateProviderToStore = async (storeId: number, providerId: number): Promise<void> => {
  await axiosInstance.post("/companies/alliances", { storeId, providerId });
};

export const updateProvider = async (id: string, provider: Partial<Provider>): Promise<Provider> => {
  const response = await axiosInstance.put(`/companies/providers/${id}`, provider);
  return response.data;
};

export const deleteProvider = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/companies/providers/${id}`);
};
