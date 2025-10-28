
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Register.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");
    if (!nombre || !email || !password) return setError("Completa todos los campos.");
    const res = await register({ name: nombre, email, password });
    if (res.ok) navigate("/login");
    else setError(res.message || "Error al registrar");
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={manejarEnvio} className="register-form">
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Registrarse</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
