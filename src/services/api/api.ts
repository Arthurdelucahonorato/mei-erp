import axios from "axios";
import { parseCookies } from "nookies";

// const API_URL = "http://localhost:3000"; // Desenvolvimento com o back rodando local
const API_URL = "https://inoven-api.onrender.com"; // Produção

const { "mei.authToken": bearerToken } = parseCookies();

console.log(bearerToken);

// Instância de api
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
});
