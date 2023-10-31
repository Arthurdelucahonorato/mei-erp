import { api } from "../api";

export const getAllRequests = async (): Promise<ClientRequest[]> => {
  const request = await api.get("/requests");

  const response = await request.data.content;

  return response;
};
