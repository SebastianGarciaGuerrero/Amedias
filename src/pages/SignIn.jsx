import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@chakra-ui/react";

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/profile"); // Redirige solo si el usuario está autenticado
    } else {
      setLoading(false); // Si no hay usuario, detén la carga
    }
  }, [user, navigate]);

  if (loading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <h1>Registro</h1>
      <div className="mt-16">
        <Input type="text" placeholder="Nombre" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Contraseña" />
      </div>
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
};

export default SignIn;