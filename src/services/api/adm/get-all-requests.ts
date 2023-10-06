import { api } from "../api";

export const getAllRequests = async (route: string): Promise<ClientRequest[]> => {
  var request: any;
  if (route == "pedidos") {
    request = await api.get("/pedidos");
  } else
    if (route == "clientes") {
      request = await api.get("/clientes");
    }


  const response = await request.data;

  return response;
};
