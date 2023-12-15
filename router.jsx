import React from "react";
import {
  createBrowserRouter,
  RouterProvider as RouterProviderRRD,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, // Página de inicio de sesión por defecto en la ruta principal
  },
  {
    path: "/register",
    element: <RegisterPage />, // Página de registro en la ruta /register
  },
]);

const RouterProvider = ({ children }) => <RouterProviderRRD router={router} />;

export default RouterProvider;
