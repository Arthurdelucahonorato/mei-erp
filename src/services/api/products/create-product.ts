import { api } from "../api";

type CreateProductBody = {
  imagensProduto?: File;
  descricao: string;
  categoriaId: number;
  variacaoId: number;
  unidade: "UN" | "KG";
};

export const createProduct = async (data: FormData) => {
  const request = await api.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Importante definir o tipo de conteúdo como multipart/form-data
    },
  });

  return await request.data;
};
