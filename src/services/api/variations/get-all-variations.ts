import { api } from "../api";

export const getAllVariations = async (): Promise<Variation[]> => {
  const request = await api.get("/variations");

  return await request.data.content;
};
