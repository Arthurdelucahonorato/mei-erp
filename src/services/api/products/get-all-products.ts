import { api } from "../api";

export type ProductSearchQueries = {
  descricao: string;
} & PaginationParams;

export const getAllProducts = async (
  data?: ProductSearchQueries
): Promise<PaginatedResult<Product[]>> => {
  const params = new URLSearchParams(data);

  const request = await api.get(`/products?${String(params)}`);

  return await request.data;
};
