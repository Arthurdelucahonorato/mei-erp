import { api } from "../api";

export type ResponseGetRevenuesThisMonth = {
  revenue: number;
  variation: number;
};

export const getRevenuesThisMonth =
  async (): Promise<ResponseGetRevenuesThisMonth> => {
    const request = await api.get("/dashboard/month-revenues");

    const result = await request.data.content;

    return result;
  };
