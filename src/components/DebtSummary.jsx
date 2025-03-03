// src/components/DebtSummary.jsx
import React from "react";
import { useAmedias } from "../hooks/useAmedias"; // Importa el hook personalizado

const DebtSummary = () => {
  const { state } = useAmedias(); // Accede al estado global

  // Formatea los montos como CLP (con separadores de miles)
  const deudaUsuario1Formateada = state.deudas.usuario1.toLocaleString("es-CL");
  const deudaUsuario2Formateada = state.deudas.usuario2.toLocaleString("es-CL");

  return (
    <div className="debt-summary">
      <h2>Resumen de Deudas</h2>
      <p>
        Yo debo:{" "}
        <span style={{ color: state.deudas.usuario1 > 0 ? "red" : "green" }}>
          ${deudaUsuario1Formateada}
        </span>
      </p>
      <p>
        Otro debe:{" "}
        <span style={{ color: state.deudas.usuario2 > 0 ? "red" : "green" }}>
          ${deudaUsuario2Formateada}
        </span>
      </p>
    </div>
  );
};

export default DebtSummary;