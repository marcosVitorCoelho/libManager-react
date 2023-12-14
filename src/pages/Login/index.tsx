import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { Button } from "@mui/material";
import * as S from "./styles";
import { useContext } from "react";
import CustomInput from "../../components/CustomInput";
import UserAuthenticationContext from "../../contexts/UserAuthContex";

const SignInSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Preencha seu email"),
  password: yup.string().required("Digite sua senha"),
  second: yup.string(),
});

type userLoginSchema = yup.InferType<typeof SignInSchema>;

export default function Login() {
  const { handleAuthUser } = useContext(UserAuthenticationContext);

  const handleSubmit = async (values: userLoginSchema) => {
    try {
      handleAuthUser(values);
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues: userLoginSchema = {
    email: "",
    password: "",
    second: "",
  };

  return (
    <S.FormContainer>
      <h1>Login</h1>
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <S.FormInputContainer>
                <Field
                  name="email"
                  label="Email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  component={CustomInput}
                />
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  component={CustomInput}
                />
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </S.FormInputContainer>
            </Form>
          )}
        </Formik>
      </>
    </S.FormContainer>
  );
}
