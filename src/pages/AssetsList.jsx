import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import "./AssetList.css";
import Footer from "../components/Footer";


export default function AssetsList() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/assets?_expand=user");
      setAssets(res.data);
    } catch (err) {
      setError("No se pudieron cargar los activos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAssets(); }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("¿Eliminar activo?");
    if (!ok) return;
    try {
      await api.delete(`/assets/${id}`);
      setAssets(prev => prev.filter(a => a.id !== id));
    } catch {
      alert("Error al eliminar");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Activos</h2>
        <Link to="/assets/new"><button>Agregar Nuevo Activo</button></Link>
      </div>

      <table style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Estado</th>
            <th>Asignado a</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.model}</td>
              <td>{a.status}</td>
              <td>{a.user ? a.user.name : "—"}</td>
              <td>
                <Link to={`/assets/edit/${a.id}`}><button>Editar</button></Link>
                <button onClick={() => handleDelete(a.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <Footer />
    </div>
  );
}
