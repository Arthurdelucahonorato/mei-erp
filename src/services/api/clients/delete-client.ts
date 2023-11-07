import { api } from "../api";

export const deleteClient = async (id: number) => {
    const request = await api.delete("/clients/" + String(id));
    return await request.data;
};
