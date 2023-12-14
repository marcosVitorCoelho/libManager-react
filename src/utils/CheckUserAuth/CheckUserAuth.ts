import SessionConstants from "../../constants/SessionConstants";
import Cookies from "universal-cookie";

export const checkUserAuth = () => {
  const newCookies = new Cookies();
  const userToken = newCookies.get(SessionConstants.ACCESS_TOKEN_COOKIE_KEY);

  return !!userToken;
};
