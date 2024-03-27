import { LocalPrintshopSharp } from "@mui/icons-material";
import { ReadingListHistoryItem } from "../../redux/readingHistorySlice";
import { Avatar, List, ListItem, ListItemAvatar } from "@mui/material";
interface ReadingListHistoryListProps {
  list: { [issueId: string]: ReadingListHistoryItem };
}

export default function ReadingListHistoryList(props: ReadingListHistoryListProps) {
  console.log(props);
  return (
    <>
      <ListItem>
        <ListItemAvatar>{/* <Avatar src={props.list.}/> */}</ListItemAvatar>
      </ListItem>
    </>
  );
}
