import { api } from "../api";

type GetClients = {
  clientes: Client[];
} & Pagination;

export const getAllClients = async (
  data?: PaginationParams
): Promise<GetClients> => {
  const params = new URLSearchParams({
    limit: data?.perPage || "",
    page: data?.page || "",
  });

  const request = await api.get("/clients?" + String(params));
  return await request.data;
};
