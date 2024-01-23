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
  readingListId: number;
  issues: Issue[] | null;
  isPrivate: boolean;
  userId: string;
  name: string;
  description: string;
  coverImg?: string;
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
  isPrivate: boolean;
  userId: string;
  name: string;
  description: string;
  coverImg?: string;
  readingListId?: number;
}

export interface UserReadingListPostRequest {
  readingListId: number;
  serializedIssues: string;
  isPrivate: boolean;
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
