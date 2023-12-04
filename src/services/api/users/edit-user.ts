import { api } from "../api";

export const editUser = async (id: number, data: any) => {
    const request = await api.put("/users/" + String(id), data);
    return await request.data;
};