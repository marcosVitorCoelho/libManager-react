import * as S from "./styles";
import { useContext, useEffect } from "react";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/index";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import CustomerContext from "../../contexts/CustomerContext";
import CustomCustomerTable from "../../components/CustomerTable";
import { ImpressaoCustomer } from "../../utils/PDFReaderNDownloader/ImpressCustomer";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function CustomerPage() {
  const { customerRows, customerColumns, handleGetCustomers, customers } =
    useContext(CustomerContext);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetCustomers();
  }, []);

  const handleNewCustomer = () => {
    navigate("/newCustomer");
  };

  const visualizarImpressao = async () => {
    const classeImpressao = new ImpressaoCustomer(customers || []);
    const documento = await classeImpressao.PreparaDocumento();
    pdfMake.createPdf(documento).download("relatorio-clientes-cadastrados.pdf");
  };

  return (
    <>
      <NavBar />
      <S.Container>
        <h1>Clientes</h1>
        <S.TableContainer>
          <CustomCustomerTable rows={customerRows} columns={customerColumns} />
        </S.TableContainer>
        <S.ButtonContainer>
          <Button variant="contained" onClick={visualizarImpressao}>
            Exportar lista
          </Button>
          <Button variant="contained" onClick={handleNewCustomer}>
            Novo Cliente
          </Button>
        </S.ButtonContainer>
      </S.Container>
    </>
  );
}
