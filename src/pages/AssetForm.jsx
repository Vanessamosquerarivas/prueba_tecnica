import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Spinner from "../components/Spinner";
import "./AssetForm.css";
import Footer from "../components/Footer";

export default function AssetForm() {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    model: "",
    status: "available",
    userId: null
  });
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let montado = true;
    (async () => {
      try {
        setCargando(true);
        const [uRes] = await Promise.all([api.get("/users")]);
        if (montado) setUsuarios(uRes.data);
        if (esEdicion) {
          const assetRes = await api.get(`/assets/${id}`);
          if (montado) setForm({
            name: assetRes.data.name,
            model: assetRes.data.model,
            status: assetRes.data.status,
            userId: assetRes.data.userId
          });
        }
      } catch {
        setError("Error al cargar datos");
      } finally {
        if (montado) setCargando(false);
      }
    })();
    return () => (montado = false);
  }, [id, esEdicion]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value === "null" ? null : value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!form.name || !form.model) return setError("Nombre y modelo son obligatorios.");
    setGuardando(true);
    try {
      if (esEdicion) {
        await api.put(`/assets/${id}`, { ...form, userId: form.userId ? Number(form.userId) : null });
      } else {
        await api.post(`/assets`, { ...form, userId: form.userId ? Number(form.userId) : null });
      }
      navigate("/assets");
    } catch {
      setError("Error al guardar.");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <Spinner/>;

  return (
    <div className="formulario-activo">
      <h2>{esEdicion ? "Editar Activo" : "Nuevo Activo"}</h2>
      <form onSubmit={manejarEnvio} className="formulario">
        <input name="name" value={form.name} onChange={manejarCambio} placeholder="Nombre" />
        <input name="model" value={form.model} onChange={manejarCambio} placeholder="Modelo" />
        <select name="status" value={form.status} onChange={manejarCambio}>
          <option value="assigned">assigned</option>
          <option value="available">available</option>
          <option value="maintenance">maintenance</option>
        </select>
        <select name="userId" value={form.userId ?? "null"} onChange={manejarCambio}>
          <option value="null">Sin asignar</option>
          {usuarios.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>

        <div>
          <button disabled={guardando}>{guardando ? "Guardando..." : "Guardar"}</button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
        <Footer />
    </div>
  );
}
