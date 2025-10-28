import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./PrivateLayout.css";
import Footer from "../components/Footer";

export default function PrivateLayout() {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate("/login", { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>Gestor Activos</h2>
        <nav className="menu-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/assets">Activos</Link>
          <Link to="/employees">Empleados</Link>
        </nav>
        <div className="usuario">
          <div>{usuario?.name}</div>
          <button onClick={manejarCerrarSesion}>Cerrar sesión</button>
        </div>
      </aside>

      <main className="contenido-principal">
        <Outlet />
      </main>
      
    </div>
  );
}
