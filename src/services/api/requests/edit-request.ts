import { api } from "../api";

export const editRequest = async (id: number, data: any) => {
    const request = await api.put("/requests/" + String(id), data);
    return await request.data;
};