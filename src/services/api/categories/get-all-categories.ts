import { api } from "../api";
import { Product } from "@/types/product";


export const getAllCategories = async (): Promise<Product[]> => {
  const request = await api.get("/categories");

  return await request.data.content;
};
