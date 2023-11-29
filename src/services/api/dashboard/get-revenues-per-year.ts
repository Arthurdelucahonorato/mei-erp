import { api } from "../api";

export type ResponseGetRevenuesPerYear = {
  months: string[];
  values: number[];
};

export const getRevenuesPerYear =
  async (): Promise<ResponseGetRevenuesPerYear> => {
    const request = await api.get("/dashboard/revenue-per-year");

    const result = await request.data.content;

    return result;
  };
