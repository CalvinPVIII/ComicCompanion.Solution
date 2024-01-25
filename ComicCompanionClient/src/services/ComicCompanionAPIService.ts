import {
  Comic,
  ComicSearchResultAPIResponse,
  FavoriteReadingListResponse,
  Issue,
  RateReadingListAPIResponse,
  ReadingListAPIResponse,
  ReadingListPostResponse,
  ReadingListSearchResultAPIResponse,
  ReadingListWithUserInfoAPIResponse,
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
    page ? (fetchUrl += `&page=${page}`) : (fetchUrl += `&page=${1}`);
    if (listName) fetchUrl += `&listName=${listName}`;
    if (userId) fetchUrl += `&userId=${userId}`;
    if (userName) fetchUrl += `&userName=${userName}`;

    console.log(fetchUrl);

    const response = await fetch(fetchUrl);
    const jsonResponse = await response.json();
    return jsonResponse as ReadingListSearchResultAPIResponse;
  }

  static async getReadingList(readingListId: string, jwt?: string): Promise<ReadingListAPIResponse | ReadingListWithUserInfoAPIResponse> {
    const fetchUrl = `${import.meta.env.VITE_API_URL}/readinglists/${readingListId}?`;
    let options = {};
    if (jwt) {
      options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
    }
    const apiResponse = await fetch(fetchUrl, options);
    const jsonResponse = await apiResponse.json();
    console.log(jsonResponse);
    if (jwt) {
      return jsonResponse as unknown as ReadingListWithUserInfoAPIResponse;
    }
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

  static async postReadingList(readingList: UserReadingListPostRequest, jwt: string, type: "POST" | "PUT"): Promise<ReadingListPostResponse> {
    let fetchUrl;
    if (type === "POST") {
      fetchUrl = `${import.meta.env.VITE_API_URL}/readinglists`;
    } else {
      fetchUrl = `${import.meta.env.VITE_API_URL}/readinglists/${readingList.readingListId}`;
    }
    const apiResponse = await fetch(fetchUrl, {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(readingList),
    });
    const jsonResponse = await apiResponse.json();
    console.log(jsonResponse);
    return jsonResponse as ReadingListPostResponse;
  }

  static async deleteReadingList(readingListId: number, jwt: string): Promise<boolean> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/readinglists/${readingListId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status === 204) {
      return true;
    } else {
      return false;
    }
  }

  static async favoriteReadingList(readingListId: number, jwt: string): Promise<FavoriteReadingListResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/readinglists/${readingListId}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse as FavoriteReadingListResponse;
  }

  static async rateReadingList(readingListId: number, rating: boolean, jwt: string): Promise<RateReadingListAPIResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/readinglists/${readingListId}/vote`, {
      method: "PUT",
      body: JSON.stringify(rating),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse as RateReadingListAPIResponse;
  }

  static async getReadingListsFromUser(userId: string, jwt: string, pageNumber?: number): Promise<ReadingListSearchResultAPIResponse> {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/readinglists?userId=${userId}`;
    if (pageNumber) {
      fetchUrl += `&page=${pageNumber}`;
    }
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse as ReadingListSearchResultAPIResponse;
  }

  static async getFavoriteReadingLists(jwt: string): Promise<ReadingListSearchResultAPIResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/readinglists/favorite`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse as ReadingListSearchResultAPIResponse;
  }
}
