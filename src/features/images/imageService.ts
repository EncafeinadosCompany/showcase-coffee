// const response = await fetch("http://localhost:3001/api/variants/upload-image", {
//     method: "POST",
//     body: formData,
//   })
import { axiosInstance } from "@/API/axiosInstance";




export const createImages = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image); // Asegurar que se envía correctamente como archivo
  
    const response = await axiosInstance.post("/products/images/add-image", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Necesario para enviar archivos
    });
  
    return response.data; 
  };