import { OrderRequest } from "@/types/request";
import { api } from "../api";

export type GetRequests = {
  cliente?: string;
} & PaginationParams;

export const getAllRequests = async (
  data?: GetRequests
): Promise<PaginatedResult<OrderRequest[]>> => {
  const params = new URLSearchParams({
    cliente: data?.cliente || "",
    perPage: data?.perPage || "",
    page: data?.page || "",
  });

  const request = await api.get("/requests?" + String(params));
  return await request.data;
};
