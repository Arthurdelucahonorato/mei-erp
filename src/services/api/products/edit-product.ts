import { api } from "../api";
import { Product } from "@/types/product";

type CreateProductResponse = {
    content: Product;
    message: string;
};

export const editProduct = async (
    id: number,
    data: FormData
): Promise<CreateProductResponse> => {
    const request = await api.put("/products/" + String(id), data, {
        headers: {
            "Content-Type": "multipart/form-data", // Importante definir o tipo de conteúdo como multipart/form-data
        },
    });

    return await request.data;
};
