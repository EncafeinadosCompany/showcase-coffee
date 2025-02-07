import { axiosInstance } from "../../../API/axiosInstance";

import { Liquidation } from "@/types/payments/liquidation";

export const getLiquidation = async () => {
  const response = await axiosInstance.get("/payments/liquidations");
  return response.data;
};

export const createLiquidation = async (liquidation: Omit<Liquidation, "id">) => {
  const response = await axiosInstance.post("/payments/liquidations", liquidation);
  return response.data;
};

export const getLiquidationById = async (id: string) => {
  const response = await axiosInstance.get(`/payments/liquidations/${id}`);
  return response.data;
};
