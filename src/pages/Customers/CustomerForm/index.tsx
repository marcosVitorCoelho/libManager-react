import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import * as S from "./styles";
import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import CustomInput from "../../../components/CustomInput";
import NavBar from "../../../components/NavBar/index";
import { Button, CircularProgress } from "@mui/material";
import CustomerContext from "../../../contexts/CustomerContext";

const CustomerSchema = yup.object().shape({
  firstName: yup.string().required("Insira o primeiro nome"),
  lastName: yup.string().required("Insira o sobrenome"),
  rg: yup.string().required("Insira o RG"),
  cpf: yup.string().required("Insira o CPF"),
  phoneNumber: yup
    .string()
    .required("Insira o número de telefone")
    .matches(/^\d{11}$/, "Formato de número de telefone inválido"),
  email: yup
    .string()
    .email("Formato de e-mail inválido")
    .required("Insira o e-mail"),
  address: yup.object().shape({
    street: yup.string().required("Insira o nome da rua"),
    city: yup.string().required("Insira o nome da cidade"),
    state: yup
      .string()
      .required("Insira o estado")
      .max(2, "Use a sigla do estado"),
    number: yup.string().required("Insira o número do endereço"),
    zipCode: yup.string().required("Insira o CEP"),
  }),
  birthDate: yup.string().required("Insira a data de nascimento"),
});

export type CustomerSchemaData = yup.InferType<typeof CustomerSchema>;

export default function CustomerFormPage() {
  const {
    handleCreateNewCustomers,
    handleGetOneCustomer,
    handleUpdateACustomer,
  } = useContext(CustomerContext);
  const [initialValue, setInitialValue] = useState<CustomerSchemaData>({
    firstName: "",
    lastName: "",
    rg: "",
    cpf: "",
    phoneNumber: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      number: "",
      zipCode: "",
    },
    birthDate: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  let { id } = useParams();

  async function getOneCustomer(id: string) {
    handleGetOneCustomer(id).then((res) => {
      setLoading(true);
      setInitialValue({
        firstName: res.firstName,
        lastName: res.lastName,
        rg: res.rg,
        cpf: res.cpf,
        phoneNumber: res.phoneNumber,
        email: res.email,
        address: {
          street: res.address.street,
          city: res.address.city,
          state: res.address.state,
          number: res.address.number,
          zipCode: res.address.zipCode,
        },
        birthDate: res.birthDate,
      });
      setLoading(false);
    });
  }

  function handleSubmitType(values: CustomerSchemaData) {
    if (id) {
      handleUpdateACustomer(id, values);
    } else {
      handleCreateNewCustomers(values);
    }
  }

  useEffect(() => {
    if (id) {
      getOneCustomer(id);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <S.Container>
      <NavBar />
      <S.FormContainer>
        <h1>Cliente</h1>
        <p>Informação do Cliente</p>
        {loading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={initialValue}
            validationSchema={CustomerSchema}
            onSubmit={(values) => {
              handleSubmitType(values);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <S.FormInputContainer>
                  <Field
                    name="firstName"
                    label="Nome"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    component={CustomInput}
                  />
                  <Field
                    name="lastName"
                    label="Sobrenome"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    component={CustomInput}
                  />
                  <Field
                    name="rg"
                    label="RG"
                    error={touched.rg && Boolean(errors.rg)}
                    helperText={touched.rg && errors.rg}
                    component={CustomInput}
                  />
                  <Field
                    name="cpf"
                    label="CPF"
                    error={touched.cpf && Boolean(errors.cpf)}
                    helperText={touched.cpf && errors.cpf}
                    component={CustomInput}
                  />
                  <Field
                    name="phoneNumber"
                    label="Telefone"
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    component={CustomInput}
                  />
                  <Field
                    name="email"
                    label="Email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    component={CustomInput}
                  />
                  <Field
                    name="address.street"
                    label="Rua"
                    error={
                      touched.address?.street && Boolean(errors.address?.street)
                    }
                    helperText={
                      touched.address?.street && errors.address?.street
                    }
                    component={CustomInput}
                  />
                  <Field
                    name="address.city"
                    label="Cidade"
                    error={
                      touched.address?.city && Boolean(errors.address?.city)
                    }
                    helperText={touched.address?.city && errors.address?.city}
                    component={CustomInput}
                  />
                  <Field
                    name="address.state"
                    label="Estado"
                    error={
                      touched.address?.state && Boolean(errors.address?.state)
                    }
                    helperText={touched.address?.state && errors.address?.state}
                    component={CustomInput}
                  />
                  <Field
                    name="address.number"
                    label="Número"
                    error={
                      touched.address?.number && Boolean(errors.address?.number)
                    }
                    helperText={
                      touched.address?.number && errors.address?.number
                    }
                    component={CustomInput}
                  />
                  <Field
                    name="address.zipCode"
                    label="CEP"
                    error={
                      touched.address?.zipCode &&
                      Boolean(errors.address?.zipCode)
                    }
                    helperText={
                      touched.address?.zipCode && errors.address?.zipCode
                    }
                    component={CustomInput}
                  />
                  <Field
                    name="birthDate"
                    label="Nascimento"
                    error={touched.birthDate && Boolean(errors.birthDate)}
                    helperText={touched.birthDate && errors.birthDate}
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
