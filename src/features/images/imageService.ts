import { axiosInstance } from "@/API/axiosInstance";

export const createImages = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axiosInstance.post("/products/images/add-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};