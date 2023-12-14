import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import * as S from "./styles";
import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import NavBar from "../../components/NavBar/index";
import {
  Autocomplete,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CustomerContext from "../../contexts/CustomerContext";
import BookContext from "../../contexts/BookContext";
import CustomInput from "../../components/CustomInput";
import LoanContext from "../../contexts/LoanContext";

const LocationSchema = yup.object().shape({
  clientId: yup.string().required("Selecione o cliente."),
  bookId: yup.string().required("Selecione o livro."),
  loanDate: yup.string().required("Insira a data de empréstimo"),
  returnDate: yup.string().required("Insira a data de devolução"),
});

export type LocationSchemaData = yup.InferType<typeof LocationSchema>;

export default function LocationFormPage() {
  const [initialValue, setInitialValue] = useState<LocationSchemaData>({
    clientId: "",
    bookId: "",
    loanDate: new Date().toLocaleDateString("pt-br"),
    returnDate: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  let { id } = useParams();
  const { customers, handleGetCustomers } = useContext(CustomerContext);
  const { books, handleGetBooks } = useContext(BookContext);
  const { handleGetOneLoan, handleUpdateALoan, handleCreateNewLoans } =
    useContext(LoanContext);

  const availableBooks = books.filter((book) => book.avaliable);

  useEffect(() => {
    handleGetCustomers();
    handleGetBooks();
  }, []);

  async function getOneLoan(id: string) {
    handleGetOneLoan(id).then((res) => {
      setLoading(true);
      setInitialValue({
        clientId: res.clientId,
        bookId: res.bookId,
        loanDate: res.loanDate,
        returnDate: res.returnDate,
      });
      setLoading(false);
    });
  }

  function handleSubmitType(values: LocationSchemaData) {
    if (id) {
      handleUpdateALoan(id, values);
    } else {
      handleCreateNewLoans(values);
    }
  }

  useEffect(() => {
    if (id) {
      getOneLoan(id);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <S.Container>
      <NavBar />
      <S.FormContainer>
        <h1>Registro de locação</h1>
        <p>Informação do locação de livros</p>
        {loading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={initialValue}
            validationSchema={LocationSchema}
            onSubmit={(values) => {
              handleSubmitType(values);
            }}
          >
            {({ handleSubmit, errors, touched, handleChange, values }) => (
              <Form onSubmit={handleSubmit}>
                <S.FormInputContainer>
                  <TextField
                    label={"Cliente"}
                    variant="outlined"
                    name="clientId"
                    id="clientId"
                    select
                    sx={{ width: 300 }}
                    size="small"
                    value={values.clientId}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.clientId && Boolean(errors.clientId)}
                    helperText={touched.clientId && errors.clientId}
                  >
                    {customers.map((customer) => {
                      return (
                        <MenuItem value={customer._id} key={customer._id}>
                          {customer.firstName + " " + customer.lastName}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <TextField
                    label={"Livros"}
                    variant="outlined"
                    name="bookId"
                    id="bookId"
                    select
                    sx={{ width: 300 }}
                    size="small"
                    value={values.bookId}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={touched.bookId && Boolean(errors.bookId)}
                    helperText={touched.bookId && errors.bookId}
                  >
                    {availableBooks.map((book) => {
                      return (
                        <MenuItem value={book._id} key={book._id}>
                          {book.title + ", " + book.edition}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <Field
                    name="loanDate"
                    label="Data de empréstimo"
                    error={touched.loanDate && Boolean(errors.loanDate)}
                    helperText={touched.loanDate && errors.loanDate}
                    component={CustomInput}
                  />
                  <Field
                    name="returnDate"
                    label="Data de retorno"
                    error={touched.returnDate && Boolean(errors.returnDate)}
                    helperText={touched.returnDate && errors.returnDate}
                    component={CustomInput}
                  />
                  <Button variant="contained" type="submit">
                    {id ? "Atualizar" : "Fazer emprestimo"}
                  </Button>
                </S.FormInputContainer>
              </Form>
            )}
          </Formik>
        )}
      </S.FormContainer>
    </S.Container>
  );
}
