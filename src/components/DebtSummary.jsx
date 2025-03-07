import React from "react";
import { useAmedias } from "../hooks/useAmedias";

const DebtSummary = () => {
  const { state } = useAmedias();

  // Función para redondear y formatear como CLP
  const formatearMonto = (monto) => {
    const montoRedondeado = Math.round(monto); // Redondear al entero más cercano
    return `$${montoRedondeado.toLocaleString("es-CL")}`; // Formatear como CLP
  };

  // Formatea los montos como CLP (con separadores de miles y sin decimales)
  const deudaUsuario1Formateada = formatearMonto(Math.abs(state.deudas.usuario1));
  const deudaUsuario2Formateada = formatearMonto(Math.abs(state.deudas.usuario2));

  return (
    <div className="mt-6 p-4 bg-gray-700 rounded-lg text-white">
      <h2 className="text-xl font-bold mb-2">Resumen de Deudas</h2>
      {state.deudas.usuario1 > 0 && (
        <p>
          zeva le debe:{" "}
          <span style={{ color: "red" }}>{deudaUsuario1Formateada}</span> a Pao.
        </p>
      )}
      {state.deudas.usuario2 > 0 && (
        <p>
          Pao le debe:{" "}
          <span style={{ color: "green" }}>{deudaUsuario2Formateada}</span> a zeva.
        </p>
      )}
      {state.deudas.usuario1 === 0 && state.deudas.usuario2 === 0 && (
        <p>No hay deudas pendientes.</p>
      )}
    </div>
  );
};

export default DebtSummary;