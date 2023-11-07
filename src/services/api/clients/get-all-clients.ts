import { api } from "../api";

export const getAllClients = async ({ limit, page }: PaginationParams): Promise<Client[]> => {
  const params = new URLSearchParams({
    limit: limit, page: page
  });
  const request = await api.get("/clients?" + String(params));
  return await request.data;
};
