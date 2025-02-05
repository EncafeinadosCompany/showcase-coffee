import { axiosInstance } from "../../API/axiosInstance";
import {Store} from "../../types/stores/Store";

export const getStores = async () => {
  const response = await axiosInstance.get("/stores");
  return response.data;
};

export const createStore = async (store: Omit<Store, "id">) => {
  const response = await axiosInstance.post("/stores", store);
  return response.data;
};

export const updateStore = async (id: string, store: Partial<Store>) => {
  const response = await axiosInstance.put(`/stores/${id}`, store);
  return response.data;
};

export const deleteStore = async (id: string) => {
  await axiosInstance.delete(`/stores/${id}`);
};
