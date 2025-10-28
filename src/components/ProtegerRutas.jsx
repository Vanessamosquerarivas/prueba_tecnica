import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtegerRutas= ({ children }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) return <Navigate to="/login" replace />;

  return children;
};

export default ProtegerRutas;
