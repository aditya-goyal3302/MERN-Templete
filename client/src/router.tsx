import { RouteObject, Navigate } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SidebarLayout from "./layouts/SidebarLayout";
import UserSettings from "./pages/UserSettings";
import useNetworkStatus from "./hooks/useNetworkStatus";
import Error from "./pages/Error";
import Maintaince from "./pages/Error/Maintaince";

function Route(isLogined: true | false, role: string) {
  const isOnline = useNetworkStatus();
  const routes: RouteObject[] = [
    {
      path: "auth",
      element: isLogined ? <Navigate to={"/dashboard"} /> : <BaseLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "/",
      element: isLogined ? <SidebarLayout /> : <Navigate to="/auth/login" />,
      children: [
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "setting",
          element: <UserSettings />,
        },
      ],
    },
    {
      path: "/",
      element: isLogined && role === "Admin" ? <SidebarLayout /> : <Navigate to="/auth/login" />,
      children: [
        {
          path: "admin",
          children: [

            ],
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
    {
      path: "/Maintaince",
      element: <Maintaince />,
    },
  ];
  if (!isOnline) {
    return [
      {
        path: "*",
        element: <Maintaince />,
      },
    ];
  }
  return routes;
}
export default Route;
