import { SearchResultAPIResponse } from "../types";

export default class ComicCompanionAPIService {
  static async getPopularComics(serverNumber?: number): Promise<SearchResultAPIResponse> {
    const fetchUrl = serverNumber
      ? `${import.meta.env.VITE_API_URL}/comics/popular?serverNumber=${serverNumber}`
      : `${import.meta.env.VITE_API_URL}/comics/popular`;
    const apiResponse = await fetch(fetchUrl);
    const jsonReposnse = await apiResponse.json();
    return jsonReposnse as SearchResultAPIResponse;
  }

  static async searchComics(keyword: string, serverNumber?: number, pageNumber?: number): Promise<SearchResultAPIResponse> {
    console.log(keyword);
    const fetchUrl = `${import.meta.env.VITE_API_URL}/comics/search?keyword=${keyword}`;
    if (serverNumber) {
      fetchUrl + `?serverNumber=${serverNumber}`;
    }
    if (pageNumber) {
      fetchUrl + `?pageNumber=${pageNumber}`;
    }
    console.log(fetchUrl);
    const apiResponse = await fetch(fetchUrl);
    const jsonReposnse = await apiResponse.json();
    return jsonReposnse as SearchResultAPIResponse;
  }
}
