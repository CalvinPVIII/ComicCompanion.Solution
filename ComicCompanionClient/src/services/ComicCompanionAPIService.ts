import { Comic, ComicSearchResultAPIResponse, ReadingListSearchResultAPIResponse, SearchResultDto } from "../types";

export default class ComicCompanionAPIService {
  static async getPopularComics(serverNumber?: number): Promise<ComicSearchResultAPIResponse> {
    const fetchUrl = serverNumber
      ? `${import.meta.env.VITE_API_URL}/comics/popular?serverNumber=${serverNumber}`
      : `${import.meta.env.VITE_API_URL}/comics/popular`;
    const apiResponse = await fetch(fetchUrl);
    const jsonResponse = await apiResponse.json();
    return jsonResponse as ComicSearchResultAPIResponse;
  }

  static async searchComics(keyword: string, serverNumber?: number, pageNumber?: number): Promise<SearchResultDto> {
    console.log(keyword);
    let fetchUrl = `${import.meta.env.VITE_API_URL}/comics/search?keyword=${keyword}`;
    if (serverNumber) {
      fetchUrl += `?serverNumber=${serverNumber}`;
    }
    if (pageNumber) {
      fetchUrl += `?pageNumber=${pageNumber}`;
    }
    console.log(fetchUrl);
    const apiResponse = await fetch(fetchUrl);
    const jsonResponse = await apiResponse.json();
    return jsonResponse as SearchResultDto;
  }

  static async getComic(comicId: string, serverNumber?: number): Promise<Comic> {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/comics/${comicId}`;
    if (serverNumber) {
      fetchUrl += `?serverNumber=${serverNumber}`;
    }
    const apiResponse = await fetch(fetchUrl);
    const jsonResponse = await apiResponse.json();
    console.log(jsonResponse);
    return jsonResponse as unknown as Comic;
  }

  static async getPopularReadingLists(): Promise<ReadingListSearchResultAPIResponse> {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/readinglists/popular`);
    const jsonResponse = await apiResponse.json();
    return jsonResponse as ReadingListSearchResultAPIResponse;
  }
}
