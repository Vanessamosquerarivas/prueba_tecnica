import { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("usuario")) || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  const manejarAsync = async (callback) => {
    setLoading(true);
    try {
      const resultado = await callback();
      return resultado;
    } catch {
      return { ok: false, mensaje: "Error al conectar con la API" };
    } finally {
      setLoading(false);
    }
  };

  const login = (email, contraseña) =>
    manejarAsync(async () => {
      const { data } = await api.get("/users", {
        params: { email, password: contraseña },
      });
      const encontrado = data[0];
      if (!encontrado) return { ok: false, mensaje: "Credenciales inválidas" };
      setUsuario(encontrado);
      return { ok: true };
    });

  const register = (datosUsuario) =>
    manejarAsync(async () => {
      const { data } = await api.post("/users", {
        ...datosUsuario,
        role: "employee",
      });
      return { ok: true, usuario: data };
    });

  const cerrarSesion = () => setUsuario(null);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loading,
        login,
        register,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
