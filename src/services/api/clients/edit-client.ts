import { api } from "../api";

export const editClient = async (id: number) => {
    const request = await api.put("/clients/" + String(id));
    return await request.data;
};
