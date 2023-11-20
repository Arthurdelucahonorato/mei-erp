import { api } from "../api";

export type GetClients = {
  nomeCliente?: string;
} & PaginationParams;

export const getAllClients = async (
  data?: GetClients
): Promise<PaginatedResult<Client[]>> => {
  const params = new URLSearchParams({
    nomeCliente: data?.nomeCliente || "",
    limit: data?.perPage || "",
    page: data?.page || "",
  });

  const request = await api.get("/clients?" + String(params));

  return await request.data;
};
