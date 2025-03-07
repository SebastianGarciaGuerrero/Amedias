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
        <p className="text-gray-600 text-sm flex justify-center">
          ¡Bienvenido de vuelta!
        </p>
        <input
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          placeholder="Contraseña"
          type="password"
          className="p-2 border border-gray-300 rounded-lg"
        />
        <div className="flex justify-center">
          <button className="bg-green-600 border-gray-300 rounded-lg h-10 w-40">
            Ingresar
          </button>
        </div>
        <div className="grid grid-cols-2">
          <div className="space-x-1">
            <input
              type="checkbox"
              id="recordar"
              name="recordar"
              value="recordar"
            />
            <label for="recordar">Recordarme</label>
          </div>
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
