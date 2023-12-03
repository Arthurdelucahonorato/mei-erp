import { api } from "../api";

export const registerRequest = async (data: any) => {
    console.log(data)
    const request = await api.post("/requests", data);
    return await request.data;
};