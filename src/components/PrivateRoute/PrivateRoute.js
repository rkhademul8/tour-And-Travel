import { Navigate, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const user = secureLocalStorage.getItem("user-info");

  return !user?.user?.email ? (
    <Navigate to="/signin" state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
