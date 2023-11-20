import { api } from "../api";

export const deleteProduct = async (
  id: number
): Promise<{ message: string }> => {
  const request = await api.delete(`/products/${id}`);

  const response = await request.data;

  return response;
};
