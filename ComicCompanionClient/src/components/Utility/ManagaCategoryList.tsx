import { List, ListItemButton, ListItemIcon } from "@mui/material";
import ManageCategoryItem from "./ManageCategoryItem";
import NewCategoryModal from "./NewCategoryModal";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface ManageCategoryListProps {
  categories: { tagName: string; tagId: string }[];
  readingListOrComic: "readingList" | "comic";
}

export default function ManageCategoryList(props: ManageCategoryListProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);

  return (
    <>
      <NewCategoryModal open={modalOpen} setClose={handleClose} readingListOrComic={props.readingListOrComic} />
      <div>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }} onClick={handleOpen}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <p>Add Category</p>
          </ListItemButton>
          {props.categories.map((cat, index) => (
            <ListItemButton sx={{ pl: 6 }} key={index}>
              <ManageCategoryItem info={cat} readingListOrComic={props.readingListOrComic} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </>
  );
}
