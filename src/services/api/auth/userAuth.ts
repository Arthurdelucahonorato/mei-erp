import { HttpStatusCode } from "axios";
import { api } from "../api";

type UserAuth = {
  email: string;
  senha: string;
};

type Response = {
  statusCode: HttpStatusCode;
  message: string;
  accessToken: string;
};

export const userAuth = async (data: UserAuth): Promise<Response> => {
  const request = await api.post("/auth", data);

  return request.data;
};
