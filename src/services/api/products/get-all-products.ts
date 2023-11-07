import { api } from "../api";

export const getAllProducts = async (): Promise<Product[]> => {
  const request = await api.get("/products?page=1&limit=10");

  return await request.data.content;
};
