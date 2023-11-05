import { api } from "../api";

export const getAllClients = async (): Promise<Client[]> => {
  const request = await api.get("/clients");
  return await request.data.content;
};
