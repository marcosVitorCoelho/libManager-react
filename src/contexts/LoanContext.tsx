import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoanColumn, LoanData } from "../interfaces/Table.interface";
import { apiBase } from "../services/api";
import { AxiosResponse } from "axios";
import { Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { LocationSchemaData } from "../pages/Location";
import { ImpressaoUnicaLoan } from "../utils/PDFReaderNDownloader/ImpressaoUnicaLoan";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface LoanContextType {
  loanColumns: LoanColumn[];
  loanRows: LoanData[] | undefined;
  loans: Root[];
  handleDelete: (id: string) => void;
  handleCreateNewLoans: (values: LocationSchemaData) => void;
  handleGetLoans: () => void;
  handleGetOneLoan: (id: string) => Promise<LocationSchemaData>;
  handleUpdateALoan: (id: string, values: LocationSchemaData) => void;
}

interface LoanContextProps {
  children: ReactNode;
}

export interface LoansData {
  _id: string;
  clientId: string;
  bookId: string;
  loanDate: string;
  returnDate: string;
}

export interface Root {
  _id: string
  clientId: ClientId
  bookId: BookId
  loanDate: string
  returnDate: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ClientId {
  address: Address
  _id: string
  firstName: string
  lastName: string
  email: string
  cpf: string
  rg: string
  phoneNumber: string
  birthDate: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Address {
  street: string
  city: string
  state: string
  number: string
  zipCode: string
}

export interface BookId {
  _id: string
  title: string
  edition: string
  pages: number
  avaliable: boolean
  createdAt: string
  updatedAt: string
  __v: number
}


export interface LoansImpress {
  clientId: string;
  bookId: string;
  bookEdition: string;
  loanDate: string;
  returnDate: string;
}

function createData(
  clienteName: string,
  bookName: string,
  loanDate: string,
  returnDate: string,
  del: ReactNode,
  edit: ReactNode
): LoanData {
  return {
    clienteName,
    bookName,
    loanDate,
    returnDate,
    del,
    edit,
  };
}


const LoanContext = createContext({} as LoanContextType);

const LoanProvider: React.FC<LoanContextProps> = ({ children }) => {
  const [loans, setLoans] = useState<Root[]>([]);
  const [loansData, setLoansData] = useState<LoanData[]>([]);
  const navigate = useNavigate();

  const handleGetLoans = async () => {
    try {
      const responseData = await apiBase.get<AxiosResponse>("/loan");
      if (responseData.status === 200) {
        const { data } = responseData;
        setLoans(data.data)
      }
    } catch (err) {
      alert("Nenhum empréstimo encontrado");
    }
  };

  const handleGetOneLoan = async (id: string) => {
    try {
      const responseData = await apiBase.get<AxiosResponse>(`/loan/${id}`);
      if (responseData.status === 200) {
        const { data } = responseData;
        return data.data;
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleCreateNewLoans = async (values: LocationSchemaData) => {
    try {
      const responseLoanData = await apiBase.post<AxiosResponse>("/loan", values);
      if (responseLoanData.status === 201) {
        alert("Empréstimo realizado");
        const responseCustomerData = await apiBase.get<AxiosResponse>(`/customers/${values.clientId}`);
        const responseBookData = await apiBase.get<AxiosResponse>(`/books/${values.bookId}`);

        console.log("livro: ", responseBookData.data.data)
        console.log("Cliente: ", responseCustomerData.data.data)

        const classeImpressao = new ImpressaoUnicaLoan({
          clientId: responseCustomerData.data.data.firstName + " " + responseCustomerData.data.data.lastName,
          bookId: responseBookData.data.data.title,
          bookEdition: responseBookData.data.data.edition,
          loanDate: values.loanDate,
          returnDate: values.returnDate
        });
        const documento = await classeImpressao.PreparaDocumento();
        pdfMake
          .createPdf(documento)
          .download("relatorio-empréstimos-cadastrados.pdf");
        navigate("/loanPage")
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateALoan = async (id: string, values: LocationSchemaData) => {
    try {
      const responseData = await apiBase.put<AxiosResponse>(
        `/loan/${id}`,
        values
      );
      if (responseData.status === 200) {
        alert("Empréstimo atualizado!");
        navigate("/loanPage");
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function handleDelete(id: string) {
    try {
      const responseData = await apiBase.delete<AxiosResponse>(`/loan/${id}`);
      if (responseData.status === 200) {
        alert("Empréstimo Deletado!");
        location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const columns: LoanColumn[] = [
    { id: "clienteName", label: "Cliente", minWidth: 170 },
    { id: "bookName", label: "Livro", minWidth: 170 },
    { id: "loanDate", label: "Data de emprestimo", minWidth: 170 },
    { id: "returnDate", label: "Data de retorno", minWidth: 170 },
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

  interface EditButtonProps {
    id: string;
  }

  const EditButton = ({ id }: EditButtonProps) => {
    const navigate = useNavigate();

    const handleEditLoan = () => {
      navigate(`/locationFormPage/${id}`);
    };

    return (
      <IconButton onClick={handleEditLoan}>
        <Edit color="info" />
      </IconButton>
    );
  };

  interface DeleteButtonProps {
    id: string;
  }

  const DeleteButton = ({ id }: DeleteButtonProps) => {
    return (
      <IconButton onClick={() => handleDelete(id)}>
        <Delete color="warning" />
      </IconButton>
    );
  };

  useEffect(() => {
    if (loans !== null) {
      console.log("EMPRESTIMOS: ", loans)
      setLoansData(
        loans.map((Loan: Root) => {
          return createData(
            Loan.clientId.firstName,
            Loan.bookId.title,
            Loan.loanDate,
            Loan.returnDate,
            <DeleteButton id={Loan._id} />,
            <EditButton id={Loan._id} />
          );
        })
      );
    }
  }, [loans]);

  return (
    <LoanContext.Provider
      value={{
        loanColumns: columns,
        loanRows: loansData,
        handleDelete,
        handleCreateNewLoans,
        handleGetLoans,
        handleGetOneLoan,
        handleUpdateALoan,
        loans,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export default LoanContext;
export { LoanProvider };
