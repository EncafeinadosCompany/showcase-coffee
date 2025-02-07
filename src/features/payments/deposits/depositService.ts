import { axiosInstance } from "../../../API/axiosInstance";

import { Deposit } from "@/types/payments/deposit";

export const getDeposit = async () => {
  const response = await axiosInstance.get("/payments/deposits");
  return response.data;
};

export const createDeposit = async (deposit: Omit<Deposit, "id">) => {
  const response = await axiosInstance.post("/payments/deposits", deposit);
  return response.data;
};

export const getDepositById = async (id: string) => {
  const response = await axiosInstance.get(`/payments/deposits/${id}`);
  return response.data;
};


