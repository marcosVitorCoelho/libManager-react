import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import BookContext from "../../../contexts/BookContext";

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { handleDelete } = useContext(BookContext);

  return (
    <IconButton onClick={() => handleDelete(id)}>
      <Delete color="warning" />
    </IconButton>
  );
};
