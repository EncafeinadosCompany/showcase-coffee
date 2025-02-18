import { axiosInstance } from "../../API/axiosInstance";

export const getTotalLiquidacions = async () => {
  const response = await axiosInstance.get("dashboard/total-liquidation");
  return response.data;
};

export const getTotalDeposit = async () => {
  const response = await axiosInstance.get("dashboard/total-deposits");
  return response.data;
};



