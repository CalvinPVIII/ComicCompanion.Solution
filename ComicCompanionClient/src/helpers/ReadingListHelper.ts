import { LocalReadingList, editCurrentEditingReadingList } from "../redux/readingListReducer";
import { IIssue } from "../types";
import { Dispatch } from "@reduxjs/toolkit";

export default class ReadingListHelper {
  static addIssueToList(issue: IIssue, currentList: LocalReadingList, dispatcher: Dispatch) {
    const issuesArray = [...currentList.issues, issue];
    const newList: LocalReadingList = { ...currentList, issues: issuesArray };
    dispatcher(editCurrentEditingReadingList(newList));
  }
}
