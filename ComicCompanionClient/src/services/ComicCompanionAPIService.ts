import {
  Comic,
  ComicSearchResultAPIResponse,
  Issue,
  ReadingListAPIResponse,
  ReadingListPostResponse,
  ReadingListSearchResultAPIResponse,
  SearchResultDto,
  UserAuthResponse,
  UserReadingListPostRequest,
} from "../types";

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
      fetchUrl += `&serverNumber=${serverNumber}`;
    }
    if (pageNumber) {
      fetchUrl += `&pageNumber=${pageNumber}`;
    }
    console.log(fetchUrl);
    const apiResponse = await fetch(fetchUrl);
    const jsonResponse = await apiResponse.json();
    return jsonResponse as SearchResultDto;
  }

  static async getComic(comicId: string, serverNumber?: number): Promise<Comic> {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/comics/${comicId}?`;
    if (serverNumber) {
      fetchUrl += `&serverNumber=${serverNumber}`;
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

  static async searchReadingLists(listName?: string, userId?: string, userName?: string, page?: number): Promise<ReadingListSearchResultAPIResponse> {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/readinglists?`;
    if (listName) fetchUrl += `&${listName}`;
    if (userId) fetchUrl += `&${userId}`;
    if (userName) fetchUrl += `&${userName}`;
    if (page) fetchUrl += `&${page}`;

    const response = await fetch(fetchUrl);
    const jsonResponse = await response.json();
    return jsonResponse as ReadingListSearchResultAPIResponse;
  }

  static async getReadingList(readingListId: string): Promise<ReadingListAPIResponse> {
    const fetchUrl = `${import.meta.env.VITE_API_URL}/readinglists/${readingListId}?`;
    const apiResponse = await fetch(fetchUrl);
    const jsonResponse = await apiResponse.json();
    return jsonResponse as unknown as ReadingListAPIResponse;
  }

  static async getIssue(comicId: string, issueId: string, serverNumber?: number): Promise<Issue> {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/comics/${comicId}/issues/${issueId}`;
    if (serverNumber) fetchUrl += `?serverNumber=${serverNumber}`;
    const apiResponse = await fetch(fetchUrl);
    const jsonResponse = await apiResponse.json();
    return jsonResponse as Issue;
  }

  static async signIn(email: string, password: string): Promise<UserAuthResponse> {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const jsonResponse = await apiResponse.json();
    return jsonResponse as UserAuthResponse;
  }

  static async signUp(email: string, userName: string, password: string): Promise<UserAuthResponse> {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, userName: userName, password: password }),
    });

    const jsonResponse = (await apiResponse.json()) as UserAuthResponse;

    if (jsonResponse.status === "error") {
      return jsonResponse;
    }
    const signInResponse = await this.signIn(email, password);
    return signInResponse;
  }

  static async createReadingList(readingList: UserReadingListPostRequest, jwt: string): Promise<ReadingListPostResponse> {
    const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/readinglists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(readingList),
    });
    const jsonResponse = await apiResponse.json();
    console.log(jsonResponse);
    return jsonResponse as ReadingListPostResponse;
  }
}
