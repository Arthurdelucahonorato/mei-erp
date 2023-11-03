import { api } from "../api";

export const getAllProducts = async (): Promise<Product[]> => {
  const request = await api.get("/products");

  return await request.data.content;
};
