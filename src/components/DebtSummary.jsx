import React from "react";
import { useAmedias } from "../hooks/useAmedias";

const DebtSummary = () => {
  const { state } = useAmedias();

  // Formatea los montos como CLP (con separadores de miles)
  const deudaUsuario1Formateada = Math.abs(state.deudas.usuario1).toLocaleString("es-CL");
  const deudaUsuario2Formateada = Math.abs(state.deudas.usuario2).toLocaleString("es-CL");

  return (
    <div className="mt-6 p-4 bg-gray-700 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Resumen de Deudas</h2>
      {state.deudas.usuario1 > 0 && (
        <p>
          Usuario 1 le debe:{" "}
          <span style={{ color: "red" }}>${deudaUsuario1Formateada}</span> a Usuario 2.
        </p>
      )}
      {state.deudas.usuario2 > 0 && (
        <p>
          Usuario 2 le debe:{" "}
          <span style={{ color: "red" }}>${deudaUsuario2Formateada}</span> a Usuario 1.
        </p>
      )}
      {state.deudas.usuario1 === 0 && state.deudas.usuario2 === 0 && (
        <p>No hay deudas pendientes.</p>
      )}
    </div>
  );
};

export default DebtSummary;