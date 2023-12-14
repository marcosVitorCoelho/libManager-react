import * as S from "./styles";
import { useContext, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/index";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import LoanContext from "../../../contexts/LoanContext";
import CustomLoanTable from "../../../components/LoanTable";
import { ImpressaoLoan } from "../../../utils/PDFReaderNDownloader/ImpressLoan";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function LoanPage() {
  const { loans, loanColumns, loanRows, handleGetLoans } =
    useContext(LoanContext);

  console.log(loanColumns);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetLoans();
  }, []);

  const handleNewCustomer = () => {
    navigate("/locationFormPage");
  };

  const visualizarImpressao = async () => {
    const classeImpressao = new ImpressaoLoan(loans || []);
    const documento = await classeImpressao.PreparaDocumento();
    pdfMake
      .createPdf(documento)
      .download("relatorio-empréstimos-cadastrados.pdf");
  };

  return (
    <>
      <NavBar />
      <S.Container>
        <h1>Empréstimos</h1>
        <S.TableContainer>
          <CustomLoanTable rows={loanRows} columns={loanColumns} />
        </S.TableContainer>
        <S.ButtonContainer>
          <Button variant="contained" onClick={visualizarImpressao}>
            Exportar lista
          </Button>
          <Button variant="contained" onClick={handleNewCustomer}>
            Novo Empréstimo
          </Button>
        </S.ButtonContainer>
      </S.Container>
    </>
  );
}
