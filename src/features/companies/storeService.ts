import { axiosInstance } from "../../API/axiosInstance";
import {Store} from "../../types/companies/store";

export const getStores = async () => {
  const response = await axiosInstance.get("/companies/stores");
  return response.data;
};

export const createStore = async (store: Omit<Store, "id">) => {
  const response = await axiosInstance.post("/companies/stores", store);
  return response.data;
};

export const updateStore = async (id: string, store: Partial<Store>) => {
  const response = await axiosInstance.put(`/companies/stores/${id}`, store);
  return response.data;
};

export const deleteStore = async (id: string) => {
  await axiosInstance.delete(`/companies/stores/${id}`);
};
