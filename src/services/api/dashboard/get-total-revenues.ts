import { api } from "../api";

export const getTotalRevenues = async (): Promise<number> => {
  const request = await api.get("/dashboard/total-revenues");

  const result = await request.data.content.value;

  return result;
};
