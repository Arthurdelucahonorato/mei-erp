import { OrderRequest } from "@/types/request";
import { api } from "../api";

type GetRequests = {
  pedidos: OrderRequest[];
} & Pagination;

export const getAllRequests = async (
  data?: PaginationParams
): Promise<OrderRequest[]> => {
  const params = new URLSearchParams({
    limit: data?.perPage || "",
    page: data?.page || "",
  });

  const request = await api.get("/requests?" + String(params));
  console.log(request.data);
  return await request.data;
};
