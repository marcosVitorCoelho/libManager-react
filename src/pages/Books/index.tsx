import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import * as S from "./styles";
import { useParams } from "react-router-dom";
import BookContext from "../../contexts/BookContext";
import { Field, Form, Formik } from "formik";
import CustomInput from "../../components/CustomInput";
import NavBar from "../../components/NavBar/index";
import { Button, CircularProgress } from "@mui/material";

const BookSchema = yup.object().shape({
  title: yup.string().required("Insira o nome do livro"),
  edition: yup.string().required("Insira a edição"),
  pages: yup
    .number()
    .required("Insira a quantidade de páginas")
    .min(1, "Insira a quantidade de páginas"),
});

export type BookSchemaData = yup.InferType<typeof BookSchema>;

export default function BookPage() {
  const { handleCreateNewBooks, handleGetOneBook, handleUpdateABook } =
    useContext(BookContext);
  const [initialValue, setInitialValue] = useState<BookSchemaData>({
    title: "",
    edition: "",
    pages: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  let { id } = useParams();

  async function getOneBook(id: string) {
    handleGetOneBook(id).then((res) => {
      setLoading(true);
      setInitialValue({
        title: res.title,
        pages: res.pages,
        edition: res.edition,
      });
      setLoading(false);
    });
  }

  function handleSubmitType(values: BookSchemaData) {
    if (id) {
      handleUpdateABook(id, values);
    } else {
      handleCreateNewBooks(values);
    }
  }

  useEffect(() => {
    if (id) {
      getOneBook(id);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <S.Container>
      <NavBar />
      <S.FormContainer>
        <h1>Livro</h1>
        <p>Informação do Livro</p>
        {loading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={initialValue}
            validationSchema={BookSchema}
            onSubmit={(values) => {
              handleSubmitType(values);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <S.FormInputContainer>
                  <Field
                    name="title"
                    label="Título"
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    component={CustomInput}
                  />
                  <Field
                    name="edition"
                    label="Edição"
                    error={touched.edition && Boolean(errors.edition)}
                    helperText={touched.edition && errors.edition}
                    component={CustomInput}
                  />
                  <Field
                    name="pages"
                    label="Quantidade de páginas"
                    type="number"
                    error={touched.pages && Boolean(errors.pages)}
                    helperText={touched.pages && errors.pages}
                    component={CustomInput}
                  />
                  <Button variant="contained" type="submit">
                    {id ? "Atualizar" : "Cadastrar"}
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
