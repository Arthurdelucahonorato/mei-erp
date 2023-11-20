import { api } from "../api";

export const getAllClients = async (
  data?: PaginationParams
): Promise<PaginatedResult<Client[]>> => {
  const params = new URLSearchParams({
    limit: data?.perPage || "",
    page: data?.page || "",
  });

  const request = await api.get("/clients?" + String(params));
  return await request.data;
};