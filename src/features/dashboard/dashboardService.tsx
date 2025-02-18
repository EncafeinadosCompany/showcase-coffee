import { axiosInstance } from "../../API/axiosInstance";

export const getProductTop = async (month: number, year: number) => {
  const response = await axiosInstance.post("/dashboard/data-top", { month, year });
  return response.data;
};

export const getEarlyDate = async () => {
  const response = await axiosInstance.post("/dashboard/data-tostion");
  return response.data;
};

export const getEarnings = async (month: number, year: number) => {
  const response = await axiosInstance.post("/dashboard/data-earning", { month, year });
  return response.data;
};

export const getTotalLiquidation = async () => {
  const response = await axiosInstance.get("/dashboard/total-liquidation");
  return response.data;
};

export const getTotalDeposits = async () => {
  const response = await axiosInstance.get("/dashboard/total-deposits");
  return response.data;
};