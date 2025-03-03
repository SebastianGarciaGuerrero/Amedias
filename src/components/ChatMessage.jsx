import React from "react";

const ChatMessage = ({ gasto }) => {
  const montoFormateado = gasto.monto.toLocaleString("es-CL"); // Formatea como CLP
  return (
    <div className="chat-message">
      <strong>{gasto.quienPago}</strong>: ${montoFormateado} - {gasto.description}
    </div>
  );
};

export default ChatMessage;