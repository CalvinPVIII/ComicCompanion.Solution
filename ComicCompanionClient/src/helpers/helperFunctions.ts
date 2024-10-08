import { Issue, PostUserLibrarySync, ReadingListDto, UserInfo, UserReadingListPostRequest } from "../types";
import { Dispatch } from "@reduxjs/toolkit";
import { LibraryState, removeReadingListFromAllCategories } from "../redux/librarySlice";
import ComicCompanionAPIService from "../services/ComicCompanionAPIService";
import { setLibrary } from "../redux/librarySlice";
import { v4 as uuidv4 } from "uuid";
import { createReadingList, deleteReadingList } from "../redux/createdReadingListsSlice";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const createLocalReadingList = (dispatch: Dispatch, readingList: UserReadingListPostRequest): ReadingListDto => {
  const deserializedIssues: Issue[] = JSON.parse(readingList.serializedIssues);
  const createdList: ReadingListDto = {
    name: readingList.name,
    readingListId: readingList.readingListId || uuidv4(),
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
  dispatch(createReadingList(createdList));
  return createdList;
};

export const deleteLocalReadingList = (dispatch: Dispatch, readingListId: string): boolean => {
  dispatch(deleteReadingList(readingListId));
  dispatch(removeReadingListFromAllCategories(readingListId));
  return true;
};

export const postLibrary = async (user: UserInfo, library: LibraryState) => {
  const libraryToSync: PostUserLibrarySync = {
    userId: user.userId,
    comicLibrary: JSON.stringify(library.comicCategories),
    readingListLibrary: JSON.stringify(library.readingListCategories),
    lastSynced: new Date().toJSON(),
    userLibrarySyncId: 0,
  };

  const syncResponse = await ComicCompanionAPIService.syncUserLibrary(user.token, libraryToSync);
  return syncResponse;
};

export const retrieveLibraryAndSync = async (user: UserInfo, dispatch: Dispatch): Promise<boolean> => {
  const library = await ComicCompanionAPIService.getUserLibrary(user.token);
  if (library) {
    dispatch(setLibrary(library));
    return true;
  } else {
    return false;
  }
};

export const updateLibraryAndSync = async (user: UserInfo, library: LibraryState, dispatch: Dispatch) => {
  try {
    const response = await postLibrary(user, library);
    if (response) {
      dispatch(setLibrary(response));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const areSameDay = (dateString: string, dateString2: string) => {
  const d1 = new Date(dateString);
  const d2 = new Date(dateString2);

  return d1.getUTCFullYear() === d2.getUTCFullYear() || d1.getUTCMonth() === d2.getUTCMonth() || d1.getUTCDate() === d2.getUTCDate();
};
