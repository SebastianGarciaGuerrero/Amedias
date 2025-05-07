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

      // Calcular total de gastos
      const totalGastos = nuevosGastos.reduce((sum, gasto) => sum + gasto.monto, 0);

      // Calcular cuánto ha gastado cada usuario
      const gastosUsuario1 = nuevosGastos
        .filter((gasto) => gasto.quienPago === "usuario1")
        .reduce((sum, gasto) => sum + gasto.monto, 0);

      const gastosUsuario2 = nuevosGastos
        .filter((gasto) => gasto.quienPago === "usuario2")
        .reduce((sum, gasto) => sum + gasto.monto, 0);

      // Calcular cuánto debería haber gastado cada usuario
      const deudaPorPersona = totalGastos / 2;

      // Calcular deudas finales
      const deudaUsuario1 = deudaPorPersona - gastosUsuario1;
      const deudaUsuario2 = deudaPorPersona - gastosUsuario2;

      return {
        ...state,
        gastos: nuevosGastos,
        deudas: {
          usuario1: deudaUsuario1,
          usuario2: deudaUsuario2,
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