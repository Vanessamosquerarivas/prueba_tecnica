import React, { useEffect, useState } from "react";
import api from "../api/api";
import Spinner from "../components/Spinner";
import "./Dashboard.css";
import Footer from "../components/Footer";


export default function Dashboard() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [cargando, setCargando] = useState(true); 

  useEffect(() => {
    let montado = true;
    (async () => {
      try {
        setCargando(true);
        const activosRes = await api.get("/assets");
        const activos = activosRes.data;
        const total = activos.length;
        const asignados = activos.filter(a => a.status === "assigned").length;
        const disponibles = activos.filter(a => a.status === "available").length;
        if (montado) setEstadisticas({ total, asignados, disponibles });
      } catch (err) {
        console.error(err);
      } finally {
        if (montado) setCargando(false);
      }
    })();
    return () => (montado = false);
  }, []);

  if (cargando) return <Spinner />;

  return (
    <div className="dashboard">
      <h1>Bienvenido al Panel de Control</h1>
      <div className="estadisticas">
        <div className="tarjeta">
          <h4>Total de Activos</h4>
          <p>{estadisticas?.total}</p>
        </div>
        <div className="tarjeta">
          <h4>Asignados</h4>
          <p>{estadisticas?.asignados}</p>
        </div>
        <div className="tarjeta">
          <h4>Disponibles</h4>
          <p>{estadisticas?.disponibles}</p>

        </div>
      
      </div>
      <Footer />
    </div>
  );
}
