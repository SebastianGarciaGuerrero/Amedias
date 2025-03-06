import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirige si no hay usuario
    } else {
      setLoading(false); // Si hay usuario, detén la carga
    }
  }, [user, navigate]);

  if (loading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga
  }

  return children; // Renderiza el contenido protegido
};

export default Protected;
