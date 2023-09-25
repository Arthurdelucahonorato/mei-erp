import { api } from "../api";

export const getAllRequests = async (): Promise<ClientRequest[]> => {
  const request = await api.get("/pedidos");

  const response = await request.data;

  return response;
};
