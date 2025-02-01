import { Link } from "react-router-dom";
import { Chapter } from "../../../types";
import { List, ListItem } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";

interface VerticalIssueListProps {
  chapters: Chapter[];
  comicId: string;
}

export default function VerticalIssueList(props: VerticalIssueListProps) {
  const [chaptersList, setChaptersList] = useState(props.chapters);
  const [dsc, setDsc] = useState(true);

  const toggleDsc = () => {
    setDsc(!dsc);
    const newList = [...chaptersList];
    setChaptersList(newList.reverse());
  };

  return (
    <>
      <div className="bg-[#0f0f0f] -mb-2 p-2 grid grid-cols-4 grid-rows-1">
        <h2 className="text-md text-center col-start-2 col-span-2">{props.chapters.length} issues</h2>
        <span onClick={toggleDsc} className="col-start-4">
          {dsc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </span>
      </div>
      <List>
        {chaptersList.map((chapter, index) => (
          <ListItem key={chapter.id} sx={{ background: index % 2 === 0 ? "#1a1919" : "#121212" }}>
            <Link to={`/comics/${props.comicId}/issue/${chapter.id}`}>
              {chapter.title} - {chapter.date}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
}
