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

export interface PopularComicsApiResponse {
  status: string;
  statusCode: number;
  data: { ["comics"]: Comic[]; ["currentPage"]: number; ["maxpage"]: number };
  pageNumber: number | null;
}
