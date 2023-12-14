import { Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  id: string;
}

export const EditButton = ({ id }: EditButtonProps) => {
  const navigate = useNavigate();

  const handleNewBook = () => {
    navigate(`/books/${id}`);
  };

  return (
    <IconButton onClick={handleNewBook}>
      <Edit color="info" />
    </IconButton>
  );
};
