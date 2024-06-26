import { ComicCategories, LibraryState, ReadingListCategories } from "../redux/librarySlice";
import {
  AppInfoResponse,
  Comic,
  ComicSearchResultAPIResponse,
  FavoriteReadingListResponse,
  Issue,
  PostLibrarySyncResponse,
  PostUserLibrarySync,
  RateReadingListAPIResponse,
  ReadingListAPIResponse,
  ReadingListPostResponse,
  ReadingListSearchResultAPIResponse,
  ReadingListWithUserInfoAPIResponse,
  RetrieveSyncResponse,
  SearchResultDto,
  UpdateUserData,
  UpdateUserResponse,
  UserAuthResponse,
  UserReadingListPostRequest,
} from "../types";

export default class ComicCompanionAPIService {
  static async getPopularComics(pageNumber?: number, serverNumber?: number): Promise<ComicSearchResultAPIResponse> {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/comics/popular`;
    pageNumber ? (fetchUrl += `?pageNumber=${pageNumber}`) : (fetchUrl += `?pageNumber=1`);
    serverNumber ? (fetchUrl += `&serverNumber=${serverNumber}`) : `&serverNumber=1`;
    const apiResponse = await fetch(fetchUrl);
    const jsonResponse = await apiResponse.json();
    return jsonResponse as ComicSearchResultAPIResponse;
  }

  static async searchComics(keyword: string, serverNumber?: number, pageNumber?: number): Promise<SearchResultDto> {
    let fetchUrl = `${import.meta.env.VITE_API_URL}/comics/search?keyword=${keyword}`;
    if (serverNumber) {
      fetchUrl += `&serverNumber=${serverNumber}`;
    }
    if (pageNumber) {
      fetchUrl += `&pageNumber=${pageNumber}`;
    }
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

    return jsonResponse as ReadingListPostResponse;
  }

  static async deleteReadingList(readingListId: number | string, jwt: string): Promise<boolean> {
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

  static async rateReadingList(readingListId: number | string, rating: boolean, jwt: string): Promise<RateReadingListAPIResponse> {
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

  static async updateUser(jwt: string, userInfo: UpdateUserData): Promise<UpdateUserResponse> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/update`, {
      method: "PATCH",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse as UpdateUserResponse;
  }

  static async getUserLibrary(jwt: string) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/sync`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const jsonResponse: RetrieveSyncResponse = await response.json();

    if (jsonResponse.data !== "Library Not Found") {
      const deserializedLibrary: LibraryState = {
        comicCategories: JSON.parse(jsonResponse.data.comicLibrary) as ComicCategories,
        readingListCategories: JSON.parse(jsonResponse.data.readingListLibrary) as ReadingListCategories,
      };
      return deserializedLibrary;
    }
  }

  static async syncUserLibrary(jwt: string, library: PostUserLibrarySync) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/sync`, {
      method: "POST",
      body: JSON.stringify(library),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const jsonResponse: PostLibrarySyncResponse = await response.json();
    if (jsonResponse.data !== "User Not Found") {
      const newLibrary: LibraryState = {
        comicCategories: JSON.parse(jsonResponse.data.comicLibrary) as ComicCategories,
        readingListCategories: JSON.parse(jsonResponse.data.readingListLibrary) as ReadingListCategories,
      };
      return newLibrary;
    }
  }

  static async getAppInfo(): Promise<AppInfoResponse> {
    const fetchUrl = `${import.meta.env.VITE_API_URL}/info`;
    const apiResponse = await fetch(fetchUrl);
    const jsonResponse = await apiResponse.json();
    return jsonResponse as AppInfoResponse;
  }
}
