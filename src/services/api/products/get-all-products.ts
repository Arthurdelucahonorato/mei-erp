import { api } from "../api";

export const getAllProducts = async (
  data?: FilterPaginatedRequest<Product>
): Promise<PaginatedResult<Product[]>> => {
  const params = new URLSearchParams({
    categoria: String(data?.params?.categoria?.id) || "",
    limit: data?.pagination?.perPage || "",
    page: data?.pagination?.page || "",
  });

  const request = await api.get(`/products?${String(params)}`);

  return await request.data;
};
