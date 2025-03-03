// src/components/ExpenseForm.jsx
import React, { useState } from "react";
import { useAmedias } from "../hooks/useAmedias"; // Importa el hook personalizado

const ExpenseForm = () => {
  const { dispatch } = useAmedias(); // Accede a dispatch
  const [monto, setMonto] = useState("");
  const [description, setDescription] = useState("");
  const [quienPago, setQuienPago] = useState("usuario1");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!monto || !description || !quienPago) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Enviar la acción AGREGAR_GASTO al reducer
    dispatch({
      type: "AGREGAR_GASTO",
      payload: {
        monto: parseInt(monto, 10), // Convertir el monto a número entero
        description,
        quienPago,
      },
    });

    // Limpiar el formulario después de enviar
    setMonto("");
    setDescription("");
    setQuienPago("usuario1"); // Reiniciar el select
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        required // Campo obligatorio
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required // Campo obligatorio
      />
      <select
        value={quienPago}
        onChange={(e) => setQuienPago(e.target.value)}
        required // Campo obligatorio
      >
        <option value="usuario1">Yo</option>
        <option value="usuario2">Mi pareja</option>
      </select>
      <button type="submit">Agregar gasto</button>
    </form>
  );
};

export default ExpenseForm;