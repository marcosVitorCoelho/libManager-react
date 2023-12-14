import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./style/theme/default";
import { CssBaseline } from "@mui/material";
import { GlobalStyle } from "./style/GlobalStyle";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { UserAuthenticationProvider } from "./contexts/UserAuthContex";
import { BookProvider } from "./contexts/BookContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { LoanProvider } from "./contexts/LoanContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <UserAuthenticationProvider>
          <CustomerProvider>
            <BookProvider>
              <LoanProvider>
                <Router />
              </LoanProvider>
            </BookProvider>
          </CustomerProvider>
        </UserAuthenticationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
