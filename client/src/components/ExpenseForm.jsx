import React, { useState } from "react";
import { useAmedias } from "../hooks/useAmedias";

const ExpenseForm = ({ onAgregarGasto }) => {
  const { dispatch } = useAmedias();
  const [monto, setMonto] = useState(""); // Guarda el valor sin formato
  const [montoFormateado, setMontoFormateado] = useState(""); // Guarda el valor formateado
  const [description, setDescription] = useState("");
  const [quienPago, setQuienPago] = useState("usuario1");

  // Función para formatear el monto como CLP
  const formatearMonto = (valor) => {
    // Eliminar todos los caracteres que no sean números
    const soloNumeros = valor.replace(/\D/g, "");

    // Convertir a número
    const numero = parseInt(soloNumeros, 10);
    if (isNaN(numero)) return ""; // Si no es un número, devolver vacío

    // Redondear el número
    const numeroRedondeado = Math.round(numero);

    // Formatear con separadores de miles y agregar el signo de peso
    return `$${numeroRedondeado.toLocaleString("es-CL")}`;
  };

  // Manejar cambios en el input de monto
  const handleMontoChange = (e) => {
    const valor = e.target.value;
    const formateado = formatearMonto(valor);

    // Actualizar el estado con el valor formateado y sin formato
    setMontoFormateado(formateado);
    setMonto(valor.replace(/\D/g, "")); // Guardar solo números
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!monto || !description || !quienPago) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    onAgregarGasto({
      monto: parseInt(monto, 10), // Convertir el monto a número entero
      description,
      quienPago,
    });

    // Limpiar el formulario después de enviar
    setMonto("");
    setMontoFormateado("");
    setDescription("");
    setQuienPago("usuario1");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <input
          type="text" // Usamos text en lugar de number para permitir el formateo
          placeholder="Monto"
          value={montoFormateado}
          onChange={handleMontoChange}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
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
          <option value="usuario1" className="bg-gray-500">
            Persona 1
          </option>
          <option value="usuario2" className="bg-gray-500">
            Persona 2
          </option>
        </select>
      </div>
      <button
        type="submit"
        className="self-end bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
      >
        Agregar gasto
      </button>
    </form>
  );
};

export default ExpenseForm;
