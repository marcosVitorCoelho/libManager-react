import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layout";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookPage from "./pages/Books";
import CustomerPage from "./pages/Customers";
import CustomerFormPage from "./pages/Customers/CustomerForm";
import LocationFormPage from "./pages/Location";
import LoanPage from "./pages/Location/LoanTable";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path={"/"} element={<Login />} />
        <Route
          path={"/home"}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={"/books"}
          element={
            <PrivateRoute>
              <BookPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/books/:id"}
          element={
            <PrivateRoute>
              <BookPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/customers"}
          element={
            <PrivateRoute>
              <CustomerPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/newCustomer"}
          element={
            <PrivateRoute>
              <CustomerFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/customers/:id"}
          element={
            <PrivateRoute>
              <CustomerFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/locationFormPage"}
          element={
            <PrivateRoute>
              <LocationFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/locationFormPage/:id"}
          element={
            <PrivateRoute>
              <LocationFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/loanPage"}
          element={
            <PrivateRoute>
              <LoanPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}
