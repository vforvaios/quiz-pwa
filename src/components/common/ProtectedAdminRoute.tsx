import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({
  isAllowed,
  children,
  redirectPath = "/login",
}: any) => {
  return isAllowed ? children : <Navigate to={redirectPath} replace />;
};

export default ProtectedAdminRoute;
