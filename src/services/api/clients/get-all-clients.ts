import { api } from "../api";

export const getAllClients = async (
  data?: PaginationParams
): Promise<Client[]> => {
  const params = new URLSearchParams({
    limit: data?.limit || "",
    page: data?.page || "",
  });

  const request = await api.get("/clients?" + String(params));
  return await request.data;
};
