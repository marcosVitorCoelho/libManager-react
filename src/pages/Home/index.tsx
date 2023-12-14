import * as S from "./styles";
import { useContext, useEffect } from "react";
import CustomTable from "../../components/Table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookContext from "../../contexts/BookContext";
import NavBar from "../../components/NavBar/index";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ImpressaoLivro } from "../../utils/PDFReaderNDownloader/ImpressBook";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Home() {
  const { bookRows, columns, handleGetBooks, books } = useContext(BookContext);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetBooks();
  }, []);

  const handleNewBook = () => {
    navigate("/books");
  };

  const visualizarImpressao = async () => {
    const classeImpressao = new ImpressaoLivro(books || []);
    const documento = await classeImpressao.PreparaDocumento();
    pdfMake.createPdf(documento).download("relatorio-livros-cadastrados.pdf");
  };

  return (
    <>
      <NavBar />
      <S.Container>
        <h1>Livros</h1>
        <S.TableContainer>
          <CustomTable rows={bookRows} columns={columns} />
        </S.TableContainer>
        <S.ButtonContainer>
          <Button variant="contained" onClick={visualizarImpressao}>
            Exportar lista
          </Button>
          <Button variant="contained" onClick={handleNewBook}>
            Novo Livro
          </Button>
        </S.ButtonContainer>
      </S.Container>
    </>
  );
}
