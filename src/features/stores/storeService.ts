import { axiosInstance } from "../../API/axiosInstance";
import {Store} from "../../types/stores/Store";

export const getStores = async () => {
  const response = await axiosInstance.get("/store");
  return response.data;
};

export const createStore = async (store: Omit<Store, "id">) => {
  const response = await axiosInstance.post("/store", store);
  return response.data;
};

export const updateStore = async (id: string, store: Partial<Store>) => {
  const response = await axiosInstance.put(`/store/${id}`, store);
  return response.data;
};

export const deleteStore = async (id: string) => {
  await axiosInstance.delete(`/store/${id}`);
};
