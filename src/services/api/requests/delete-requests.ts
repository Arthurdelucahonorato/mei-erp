import { api } from "../api";

export const deleteRequests = async (id: number) => {
    const request = await api.delete("/pedidos" + String(id));
    return await request.data;
};