import { axiosInstance } from "../../../API/axiosInstance";
import { variantType } from "@/types/variants";

// Obtener una variante por ID
export const getIdVariant = async (id: string | number) => {
  const response = await axiosInstance.get(`/variants/${id}`);
  return response.data;
};

// Obtener todas las variantes
export const getVariants = async () => {
  const response = await axiosInstance.get("/variants");
  return response.data;
};

// Crear una nueva variante
export const createVariant = async (variant: Omit<variantType, "id">) => {
  const response = await axiosInstance.post("/variants", variant);
  return response.data;
};

// Actualizar una variante existente
export const updateVariant = async (id: string | number, variant: Partial<variantType>) => {
  const response = await axiosInstance.put(`/variants/${id}`, variant);
  return response.data;
};

// Eliminar una variante
export const deleteVariant = async (id: string | number) => {
  await axiosInstance.delete(`/variants/${id}`);
};
