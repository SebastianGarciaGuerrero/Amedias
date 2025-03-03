// src/context/AmediasContext.jsx
import { createContext, useReducer } from "react";

export const amediasContext = createContext();

const initialState = {
  gastos: [], // Lista de gastos registrados
  deudas: { usuario1: 0, usuario2: 0 }, // Deudas entre usuarios
};

function amediasReducer(state, action) {
  switch (action.type) {
    case "AGREGAR_GASTO": {
      const nuevoGasto = action.payload;
      const nuevosGastos = [...state.gastos, nuevoGasto];

      // Calcular deudas
      const totalGastos = nuevosGastos.reduce((sum, gasto) => sum + gasto.monto, 0);
      const deudaPorPersona = totalGastos / 2;

      const deudaUsuario1 = nuevosGastos
        .filter((gasto) => gasto.quienPago === "usuario1")
        .reduce((sum, gasto) => sum + gasto.monto, 0);

      const deudaUsuario2 = nuevosGastos
        .filter((gasto) => gasto.quienPago === "usuario2")
        .reduce((sum, gasto) => sum + gasto.monto, 0);

      return {
        ...state,
        gastos: nuevosGastos,
        deudas: {
          usuario1: deudaPorPersona - deudaUsuario1,
          usuario2: deudaPorPersona - deudaUsuario2,
        },
      };
    }
    default:
      return state;
  }
}

export function AmediasProvider({ children }) {
  const [state, dispatch] = useReducer(amediasReducer, initialState);
  return (
    <amediasContext.Provider value={{ state, dispatch }}>
      {children}
    </amediasContext.Provider>
  );
}