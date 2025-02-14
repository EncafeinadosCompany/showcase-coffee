import { axiosInstance } from "../../../API/axiosInstance";

import { deposit } from "@/types/payments/deposit";

export const getDeposit = async () => {
  const response = await axiosInstance.get("/payments/deposit");
  return response.data;
};

export const createDeposit = async (deposit: Omit<deposit, "id">) => {
  const response = await axiosInstance.post("payments/deposit", deposit);
  return response.data;
};

export const getDepositById = async (id: string) => {
  const response = await axiosInstance.get(`/payments/deposit/${id}`);
  return response.data;
};


