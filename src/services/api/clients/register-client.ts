import { api } from "../api";

export const registerClient = async (data: any) => {
    const request = await api.post("/clients", data);
    return await request.data;
};