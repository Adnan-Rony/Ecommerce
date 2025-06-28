import { Navigate, Outlet } from "react-router-dom";

// Example: check auth using localStorage or cookie
const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
