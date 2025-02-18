import { axiosInstance } from "../../../API/axiosInstance";
import { attributeType } from "@/types/products/attribute";

export const getIdAttribute = async (id: string | number) => {
  const response = await axiosInstance.get(`/products/attributes${id}`);
  return response.data;
};

export const getAttributes = async () => {
  const response = await axiosInstance.get("/products/attributes");
  return response.data;
};

export const createAttribute = async (attribute: Omit<attributeType, "id">) => {
  const response = await axiosInstance.post("/products/attributes", attribute);
  return response.data;
};

export const updateAttribute = async (id: string | number, attribute: Partial<attributeType>) => {
  const response = await axiosInstance.put(`/products/attributes/${id}`, attribute);
  return response.data;
};


export const deleteAttribute = async (id: string | number) => {
  await axiosInstance.delete(`/products/attributes/${id}`);
};
