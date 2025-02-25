import { axiosInstance } from "../../API/axiosInstance";

export const getProductTop = async (month: number, year: number) => {
  const response = await axiosInstance.post("/dashboard/data-top", { month, year });
  return response.data.data;
};

export const getEarlyDate = async () => {
  const response = await axiosInstance.post("/dashboard/data-tostion");
  return response.data;
};

export const getEarnings = async (month: number, year: number) => {
  const response = await axiosInstance.post("/dashboard/data-earning", { month, year });
  return response.data.data;
};

export const getTotalLiquidation = async () => {
  const response = await axiosInstance.get("/dashboard/total-liquidation");
  return response.data;
};

export const getTotalDeposits = async () => {
  const response = await axiosInstance.get("/dashboard/total-deposits");
  return response.data;
};

export const getTotalBrands = async () => {
  const response = await axiosInstance.get("/dashboard/total-brands");
  return response.data;
};

export const getTotalSalesByMonth = async (month: number, year: number) => {
  const response = await axiosInstance.post("/dashboard/total-sales-month", { month, year });
  return response.data;
};

export const getTotalSalesByYear = async (year: number) => {
  const response = await axiosInstance.post("/dashboard/total-sales-year", { year });
  return response.data;
};

export const getSalesCountByMonth = async (month: number, year: number) => {
  const response = await axiosInstance.post("/dashboard/sales-count-month", { month, year });
  return response.data;
};

export const getSalesCountByYear = async (year: number) => {
  const response = await axiosInstance.post("/dashboard/sales-count-year", { year });
  return response.data;
};