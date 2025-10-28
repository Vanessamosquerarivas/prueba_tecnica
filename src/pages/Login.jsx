import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import "./Login.css";

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(email, password);
    if (res.ok) navigate("/dashboard");
    else setError(res.message || "Error");
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={manejarEnvio} className="login-form">
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
        <button disabled={loading}>
          {loading ? <Spinner/> : "Entrar"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
      </p>
    </div>
  );
}

