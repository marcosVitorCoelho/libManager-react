import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Column, Data } from "../interfaces/Table.interface";
import { DeleteButton } from "../components/Buttons/DeleteButton";
import { EditButton } from "../components/Buttons/EditButton";
import { apiBase } from "../services/api";
import { AxiosResponse } from "axios";
import CircleIcon from "@mui/icons-material/Circle";

interface BookContextType {
  columns: Column[];
  bookRows: Data[] | undefined;
  books: BooksData[];
  handleDelete: (id: string) => void;
  handleCreateNewBooks: (values: NewBook) => void;
  handleGetBooks: () => void;
  handleGetOneBook: (id: string) => Promise<BooksData>;
  handleUpdateABook: (id: string, values: NewBook) => void;
}

interface BookContextProps {
  children: ReactNode;
}

export interface BooksData {
  _id: string;
  title: string;
  edition: string;
  pages: number;
  avaliable: boolean;
}

function createData(
  title: string,
  pages: number,
  avaliable: ReactNode,
  edition: string,
  del: ReactNode,
  edit: ReactNode
): Data {
  return {
    title,
    pages,
    edition,
    avaliable,
    del,
    edit,
  };
}

export interface NewBook {
  title: string;
  pages: number;
}

const BookContext = createContext({} as BookContextType);

const BookProvider: React.FC<BookContextProps> = ({ children }) => {
  const [books, setBooks] = useState<BooksData[]>([]);
  const [booksData, setBooksData] = useState<Data[]>([]);
  const navigate = useNavigate();

  const handleGetBooks = async () => {
    try {
      const responseData = await apiBase.get<AxiosResponse>("/books");
      if (responseData.status === 200) {
        const { data } = responseData;
        setBooks(data.data);
      }
    } catch (err) {
      alert("Nenhum livro encontrado, cadastre um novo");
    }
  };

  const handleGetOneBook = async (id: string) => {
    try {
      const responseData = await apiBase.get<AxiosResponse>(`/books/${id}`);
      if (responseData.status === 200) {
        const { data } = responseData;
        return data.data;
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleCreateNewBooks = async (values: NewBook) => {
    try {
      const responseData = await apiBase.post<AxiosResponse>("/books", values);
      if (responseData.status === 201) {
        alert("Livro cadastrado");
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateABook = async (id: string, values: NewBook) => {
    try {
      const responseData = await apiBase.put<AxiosResponse>(
        `/books/${id}`,
        values
      );
      if (responseData.status === 200) {
        alert("Livro atualizado!");
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function handleDelete(id: string) {
    try {
      const responseData = await apiBase.delete<AxiosResponse>(`/books/${id}`);
      if (responseData.status === 200) {
        alert("Livro Deletado!");
        location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const columns: Column[] = [
    { id: "title", label: "Título", minWidth: 170 },
    { id: "pages", label: "Páginas", minWidth: 170 },
    { id: "edition", label: "Edição", minWidth: 170 },
    { id: "avaliable", label: "Disponível", minWidth: 170 },
    {
      id: "edit",
      label: "Editar",
      minWidth: 170,
    },
    {
      id: "del",
      label: "Excluir",
      minWidth: 170,
    },
  ];

  useEffect(() => {
    if (books !== null) {
      setBooksData(
        books.map((book: BooksData) => {
          return createData(
            book.title,
            book.pages,
            <CircleIcon color={book.avaliable ? "success" : "warning"} />,
            book.edition,
            <DeleteButton id={book._id} />,
            <EditButton id={book._id} />
          );
        })
      );
    }
  }, [books]);

  return (
    <BookContext.Provider
      value={{
        columns,
        bookRows: booksData,
        handleDelete,
        handleCreateNewBooks,
        handleGetBooks,
        handleGetOneBook,
        handleUpdateABook,
        books,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContext;
export { BookProvider };
