import { useContext } from "react";
import { AuthContext } from "../components/Contexts/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
