import {
  createBrowserRouter,
  RouterProvider as RouterProviderRRD,
} from "react-router-dom";

import RootLayout from "layouts/RootLayout";
import ErrorPage from "pages/ErrorPage";
import CreateTeam from "./pages/CreateTeam";
import MatchDayPage from "./pages/MatchDayPage";
import ProfilePage from "./pages/ProfilePage";
import AddPlayersPage from "./pages/AddPlayersPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const WorkdaysPage = () => <h1>workdays</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute page={WorkdaysPage} role="anonymous" />,
      },
      {
        path: "/matchday",
        element: <ProtectedRoute page={MatchDayPage} role="anonymous" />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute page={ProfilePage} role="anonymous" />,
      },
      {
        path: "/team/new",
        element: <ProtectedRoute page={CreateTeam} role="anonymous" />,
      },

      {
        path: "/team/addplayer",
        element: <ProtectedRoute page={AddPlayersPage} role="anonymous" />,
      },
      {
        path: "/login",
        element: <ProtectedRoute page={LoginPage} role="anonymous" />,
      },
      {
        path: "/register",
        element: <ProtectedRoute page={RegisterPage} role="anonymous" />,
      },
      {
        path: "/logout",
        element: <ProtectedRoute page={LogoutPage} role="auth" />,
      },
    ],
  },
]);

const RouterProvider = ({ children }) => <RouterProviderRRD router={router} />;

export default RouterProvider;
