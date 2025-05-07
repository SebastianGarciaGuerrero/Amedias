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
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Gastos Compartidos
        </h2>
        <div className="chat-container space-y-4 mb-6">
          {gastos.map((gasto, index) => (
            <ChatMessage key={index} gasto={gasto} />
          ))}
        </div>
        <ExpenseForm onAgregarGasto={handleAgregarGasto} />
        <DebtSummary deudas={deudas} />
      </div>
    </div>
  );
}

export default Home;