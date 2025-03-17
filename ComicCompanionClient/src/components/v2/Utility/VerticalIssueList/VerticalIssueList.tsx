import { Chapter, ReadingListDto } from "../../../../types";
import { List, ListItem } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";
import { isCreatingSelector } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addComicAlert } from "../../../../helpers/alertCreators";
import { addIssue } from "../../../../redux/listCreationSlice";
import { createReadingListHistoryItem, setPlaylist, setPreviousPage } from "../../../../redux/readingHistorySlice";
import IssueInfo from "./IssueInfo";

interface VerticalIssueListProps {
  chapters: Chapter[];
  readingList?: ReadingListDto;
  showListNumbers?: boolean;
}

export default function VerticalIssueList(props: VerticalIssueListProps) {
  const [chaptersList, setChaptersList] = useState(props.chapters);
  const [dsc, setDsc] = useState(true);
  const isCreating = useSelector(isCreatingSelector);

  const dispatch = useDispatch();

  const toggleDsc = () => {
    setDsc(!dsc);
    const newList = [...chaptersList];
    setChaptersList(newList.reverse());
  };

  const handleAddToReadingListClick = (chapter: Chapter) => {
    dispatch(addIssue(chapter));
    addComicAlert(dispatch);
  };

  const handleSetPlaylist = () => {
    const chapters = [...props.chapters];

    if (props.chapters) {
      // Since the data comes back with the newest issue added first, the playlist should start with the oldest issue first. Hence needing to reverse. However, a reading list will start with the first issue in the list first, so the array does not need to be reversed
      props.readingList ? dispatch(setPlaylist(chapters)) : dispatch(setPlaylist(chapters.reverse()));

      dispatch(setPreviousPage(location.pathname));
    }
  };

  const generateLink = (chapter: Chapter) => {
    let link = "";
    if (props.readingList) {
      link = link + "/lists";
      if (props.readingList.shared) {
        link = link + `/shared/${props.readingList.readingListId}`;
      } else {
        link = link + `/local/${props.readingList.readingListId}`;
      }
      link + `/${props.readingList.readingListId}`;
    }
    link = link + `/comics/${chapter.comicId}/issue/${chapter.id}`;
    return link;
  };

  const handleIssueClick = () => {
    if (props.readingList) {
      dispatch(
        createReadingListHistoryItem({
          name: props.readingList.name,
          listId: props.readingList.readingListId,
          coverImg: props.readingList.coverImg || "",
          readIssues: {},
        })
      );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[#0f0f0f] -mb-2 p-2 grid grid-cols-4 grid-rows-1">
        <h2 className="text-md text-center col-start-2 col-span-2">{props.chapters.length} issues</h2>
        <span onClick={toggleDsc} className="col-start-4">
          {dsc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </span>
      </div>
      <List>
        {chaptersList.map((chapter, index) => (
          <ListItem
            key={chapter.id}
            sx={{ background: index % 2 === 0 ? "#1a1919" : "#121212", display: "flex", justifyContent: "space-between" }}
            onClick={handleSetPlaylist}
          >
            <IssueInfo
              handleIssueClick={handleIssueClick}
              generateLink={generateLink}
              isCreating={isCreating}
              chapter={chapter}
              showListNumbers={props.showListNumbers}
              handleAddToReadingListClick={handleAddToReadingListClick}
              index={index}
              readingListId={props.readingList?.readingListId.toString()}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
