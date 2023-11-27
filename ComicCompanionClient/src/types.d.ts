export interface IComic {
  comicId: string;
  name: string;
  coverImg: string;
  issueIds?: string[];
}

export interface IIssue {
  issueId: string;
  comicId: string;
  pages: string[] | null;
}

export interface ISearchResultDto {
  comics: IComic[];
  currentPage: number;
  maxPage: number;
}

export interface UserInfo {
  email: string;
  userName: string;
  token: string;
}
