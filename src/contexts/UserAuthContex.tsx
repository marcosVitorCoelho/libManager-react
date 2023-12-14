import { ReactNode, createContext } from "react";
import Cookies from "universal-cookie";
import { apiBase } from "../services/api";
import SessionConstants from "../constants/SessionConstants";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { checkUserAuth } from "../utils/CheckUserAuth/CheckUserAuth";

interface UserAuthentcationContextType {
  createUser: (values: IFormSignUp) => void;
  handleAuthUser: (values: IFormSignIn) => void;
  handleSessionUser: () => void;
}

interface UserAuthentcationContextProps {
  children: ReactNode;
}

export interface IFormSignIn {
  email: string;
  password: string;
}

export interface IFormSignUp extends IFormSignIn {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

const UserAuthenticationContext = createContext(
  {} as UserAuthentcationContextType
);

const UserAuthenticationProvider: React.FC<UserAuthentcationContextProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const handleAuthUser = async (values: IFormSignIn) => {
    console.log(values);
    const newCookies = new Cookies();
    try {
      const responseData = await apiBase.post<AxiosResponse>(
        "/user/login",
        values
      );
      if (responseData.status === 200) {
        const { data } = responseData;
        newCookies.set(
          SessionConstants.ACCESS_TOKEN_COOKIE_KEY,
          data.data.token
        );
        navigate("/home");
      }
    } catch (error) {
      alert("Credenciais inválidas");
      console.warn(error);
    }
  };

  const createUser = async (values: IFormSignUp) => {
    try {
      const data = await apiBase.post("/user/registeruser", values);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSessionUser = async () => {
    try {
      if (checkUserAuth()) {
        const cookies = new Cookies();
        cookies.remove(SessionConstants.ACCESS_TOKEN_COOKIE_KEY);
      }
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  };

  return (
    <UserAuthenticationContext.Provider
      value={{ createUser, handleAuthUser, handleSessionUser }}
    >
      {children}
    </UserAuthenticationContext.Provider>
  );
};

export default UserAuthenticationContext;
export { UserAuthenticationProvider };
