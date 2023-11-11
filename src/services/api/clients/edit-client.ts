import { api } from "../api";

export const editClient = async (id: number, data: any) => {
    const request = await api.put("/clients/" + String(id), data);
    return await request.data;
};