import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";

const ExpenseForm = ({ onAgregarGasto }) => {
  const [monto, setMonto] = useState("");
  const [description, setDescription] = useState("");
  const [quienPago, setQuienPago] = useState("usuario1");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!monto || !description || !quienPago) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    onAgregarGasto({
      monto: parseInt(monto, 10),
      description,
      quienPago,
    });

    setMonto("");
    setDescription("");
    setQuienPago("usuario1");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <Input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <select
          value={quienPago}
          onChange={(e) => setQuienPago(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="usuario1">Yo</option>
          <option value="usuario2">Mi pareja</option>
        </select>
      </div>
      <Button
        type="submit"
        className="self-end bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Agregar gasto
      </Button>
    </form>
  );
};

export default ExpenseForm;
