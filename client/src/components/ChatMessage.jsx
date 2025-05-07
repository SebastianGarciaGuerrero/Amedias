import React from "react";

const ChatMessage = ({ gasto }) => {
  const montoFormateado = gasto.monto.toLocaleString("es-CL"); // Formatea como CLP
  return (
    <div
      className={`p-4 rounded-lg max-w-xs ${
        gasto.quienPago === "usuario1"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      <strong>{gasto.quienPago === "usuario1" ? "Persona 1" : "Persona 2"}</strong>: $
      {montoFormateado} - {gasto.description}
    </div>
  );
};

export default ChatMessage;