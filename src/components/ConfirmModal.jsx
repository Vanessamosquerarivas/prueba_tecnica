import React from "react";
import "./ConfirmModal.css"; 

export default function ConfirmModal({ open, onConfirm, onCancel, text }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{text}</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
