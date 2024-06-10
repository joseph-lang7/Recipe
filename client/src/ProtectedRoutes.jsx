import { Outlet } from "react-router-dom";
import { useGetUserId } from "./hooks/useGetUserId";
import { Login } from "./pages";

export const ProtectedRoutes = () => {
  const token = useGetUserId();
  const isAuth = !!token;
  return isAuth ? <Outlet /> : <Login />;
};
