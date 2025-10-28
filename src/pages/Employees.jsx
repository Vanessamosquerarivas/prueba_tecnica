import React, { useEffect, useState } from "react";
import api from "../api/api";
import Spinner from "../components/Spinner";
import "./Employees.css";
import Footer from "../components/Footer";  

export default function Employees() {
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true); 

  useEffect(() => {
    let montado = true;
    (async () => {
      try {
        setCargando(true);
        const res = await api.get("/users");
        if (montado) setEmpleados(res.data);
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
    <div>
      <h1>Empleados</h1>
      <ul>
        {empleados.map(e => (
          <li key={e.id}>{e.name}</li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
