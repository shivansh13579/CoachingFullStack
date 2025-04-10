import { Navigate } from "react-router";
import { useAuth } from "./AuthContex";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
