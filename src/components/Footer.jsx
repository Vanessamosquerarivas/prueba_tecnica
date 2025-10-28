import React from "react";
import "./Footer.css";

export default function Footer() {
  const añoActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {añoActual} Gestor Activos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
