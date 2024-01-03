import { PopularComicsApiResponse } from "../types";

export default class ComicCompanionAPIService {
  static async getPopularComics(serverNumber?: number): Promise<PopularComicsApiResponse> {
    const fetchUrl = serverNumber
      ? `${import.meta.env.VITE_API_URL}/comics/popular?serverNumber=${serverNumber}`
      : `${import.meta.env.VITE_API_URL}/comics/popular`;
    const apiResponse = await fetch(fetchUrl);
    const jsonReposnse = await apiResponse.json();
    return jsonReposnse as PopularComicsApiResponse;
  }
}
