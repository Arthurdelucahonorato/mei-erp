import { api } from "../api";

export const deleteRequest = async (id: number) => {
  const request = await api.delete(`/requests/${id}`);
  return await request.data;
};
