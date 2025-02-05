import { axiosInstance } from "../../API/axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

export const loginService = async (data: LoginData) => {
  const response = await axiosInstance.post("/auth", data);
  return response.data;
};