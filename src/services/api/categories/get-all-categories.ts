import { api } from "../api";

export const getAllCategories = async (): Promise<Product[]> => {
  const request = await api.get("/categories");

  return await request.data.content;
};
