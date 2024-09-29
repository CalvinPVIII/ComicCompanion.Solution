export interface UserInfo {
  email: string;
  userName: string;
  token: string;
  userId: string;
}

export interface UserAuthResponse {
  status: "error" | "success";
  statusCode: number;
  data: string | object;
}

export interface Comic {
  comicId: string;
  name: string;
  coverImg: string;
  author: string | null;
  description: string | null;
  year: string | null;
  status: string | null;
  issueIds: string[] | null;
}

export interface Issue {
  issueId: string;
  comicId: string;
  pages: string[] | null;
  readingListIssueId?: string;
}

interface APIResponse {
  status: string;
  statusCode: number;
  pageNumber: number | null;
  maxPage: number | null;
}

export interface ReadingListDto {
  readingListId: number | string;
  issues: Issue[] | null;
  shared: boolean;
  userId: string;
  name: string;
  description: string;
  coverImg?: string;
  likes: number;
  dislikes: number;
  rating: number;
  createdBy: string;
}

export interface SearchResultDto {
  comics: Comic[];
  currentPage: number;
  maxPage: number;
}

export interface ComicSearchResultAPIResponse extends APIResponse {
  data: SearchResultDto;
}

export interface ReadingListSearchResultAPIResponse extends APIResponse {
  data: ReadingListDto[];
}

export interface ReadingListAPIResponse extends APIResponse {
  data: ReadingListDto;
}

export interface ReadingListWithUserInfoAPIResponse extends APIResponse {
  data: {
    list: ReadingListDto;
    userInfo: {
      favorite: boolean;
      rating: boolean | null;
    };
  };
}

interface ICreatedReadingList {
  [key: string]: string | Issue[] | boolean | undefined | number;
}

export interface CurrentlyCreatedReadingList extends ICreatedReadingList {
  issues: Issue[];
  shared: boolean;
  userId: string;
  name: string;
  description: string;
  coverImg?: string;
  readingListId?: number | string;
}

export interface UserReadingListPostRequest {
  readingListId: number | string;
  serializedIssues: string;
  shared: boolean;
  userId: string;
  name: string;
  description: string;
  coverImg: string | null;
}

export interface ReadingListPostResponse {
  status: string;
  statusCode: number;
  data: ReadingListDto;
}

export interface FavoriteReadingListResponse extends APIResponse {
  data: "Favorite Added" | "Favorite Removed";
}

export interface RateReadingListAPIResponse extends APIResponse {
  data: {
    message: "Rating Posted" | "Rating Updated" | "Rating Removed" | "Bad Request";
    content: ReadingListDto;
  };
}

export interface UpdateUserData {
  userName?: string;
  password?: string;
  email?: string;
  userId: string;
  originalPassword: string;
}

export interface UpdateUserResponse {
  status: "success" | "error";
  statusCode: 401 | 404 | 200;
  data: "Unauthorized" | "No user found" | "User Info Updated";
}

export interface UserLibrary {
  userId: string;
  userLibrarySyncId: number;
  comicLibrary: string;
  readingListLibrary: string;
  lastSynced: string;
}
export interface PostUserLibrarySync {
  userId: string;
  userLibrarySyncId: number;
  comicLibrary: string;
  readingListLibrary: string;
  lastSynced: string;
}

export interface RetrieveSyncResponse extends APIResponse {
  data: PostUserLibrarySync | "Library Not Found";
}

export interface PostLibrarySyncResponse extends APIResponse {
  data: PostUserLibrarySync | "User Not Found";
}

export interface AppInfoResponse extends APIResponse {
  data: { version: string; downloadLink: string; patchNotes: string[] };
}
