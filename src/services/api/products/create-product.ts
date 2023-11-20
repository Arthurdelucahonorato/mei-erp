import { api } from "../api";

type CreateProductResponse = {
  content: Product;
  message: string;
};

export const createProduct = async (
  data: FormData
): Promise<CreateProductResponse> => {
  const request = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Importante definir o tipo de conteúdo como multipart/form-data
    },
  });

  return await request.data;
};
