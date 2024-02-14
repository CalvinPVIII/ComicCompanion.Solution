import { Issue, ReadingListDto, UserReadingListPostRequest } from "../types";
import { Dispatch } from "@reduxjs/toolkit";
import { addReadingList } from "../redux/librarySlice";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const createLocalReadingList = (dispatch: Dispatch, readingList: UserReadingListPostRequest): ReadingListDto => {
  const deserializedIssues: Issue[] = JSON.parse(readingList.serializedIssues);
  const createdList: ReadingListDto = {
    name: readingList.name,
    readingListId: readingList.readingListId,
    coverImg: readingList.coverImg as string,
    description: readingList.description,
    shared: false,
    userId: "local",
    likes: 0,
    dislikes: 0,
    issues: deserializedIssues,
    createdBy: "local",
    rating: 0,
  };
  dispatch(addReadingList({ tagId: "created", readingList: createdList }));
  return createdList;
};
