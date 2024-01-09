export interface UserInfo {
  email: string;
  userName: string;
  token: string;
  userId: string;
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
}

interface APIResponse {
  status: string;
  statusCode: number;
  pageNumber: number | null;
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

interface ICreatedReadingList {
  [key: string]: string | Issue[] | boolean | undefined;
}

export interface CurrentlyCreatedReadingList extends ICreatedReadingList {
  issues: Issue[];
  isPrivate: boolean;
  userId: string;
  name: string;
  description: string;
  coverImg?: string;
}
