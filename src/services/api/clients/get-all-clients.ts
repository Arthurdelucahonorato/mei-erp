import { api } from "../api";

export const getAllClients = async (
  data?: PaginationParams
): Promise<Client[]> => {
  const params = new URLSearchParams({
    limit: data?.limit || "",
    page: data?.page || "",
  });

  const request = await api.get("/clients?" + String(params));
  console.log(request.data)
  return await request.data;
};
