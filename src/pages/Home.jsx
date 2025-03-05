import { useAmedias } from "../hooks/useAmedias";
import ChatMessage from "../components/ChatMessage";
import ExpenseForm from "../components/ExpenseForm";
import DebtSummary from "../components/DebtSummary";

function Home() {
  const { state, dispatch } = useAmedias();
  const { gastos, deudas } = state;

  const handleAgregarGasto = (gasto) => {
    dispatch({ type: "AGREGAR_GASTO", payload: gasto });
    dispatch({ type: "CALCULAR_DEUDAS" });
  };

  return (
    <div className="app2-container">
      <h2>Gastos Compartidos</h2>
      <div className="chat-container">
        {gastos.map((gasto, index) => (
          <ChatMessage key={index} gasto={gasto} />
        ))}
      </div>
      <ExpenseForm onAgregarGasto={handleAgregarGasto} />
      <DebtSummary deudas={deudas} />
    </div>
  );
}

export default Home;