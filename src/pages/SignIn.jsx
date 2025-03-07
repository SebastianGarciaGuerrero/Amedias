import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";

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
    <div className="flex items-center justify-center h-screen bg-gray-900 ">
      <div className="mt-16 grid grid-cols-1 grid-rows-3 space-y-4 border shadow-lg rounded-lg p-6">
        <h1 className="flex justify-center text-2xl">¡Hola!</h1>
        <p className="text-gray-600 text-sm">¡Bienvenido de vuelta!</p>
        <input placeholder="Email" />
        <input placeholder="Contraseña" type="password" />
        <button>Ingresar</button>
        <div className="grid grid-cols-2">
          <p className="hover:text-blue-500 cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
        </div>
        <p className="flex text-gray-600 text-sm justify-center">
          O continua con
        </p>
        <div className="flex justify-center">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
