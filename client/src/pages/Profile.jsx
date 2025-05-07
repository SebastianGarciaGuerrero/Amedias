import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirige si no hay usuario
    } else {
      setLoading(false); // Si hay usuario, detén la carga
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga
  }

  return (
    <div className="grid grid-cols-1 items-center justify-center h-screen bg-gray-900">
      <h1 className="text-center">Perfil</h1>
      <div>
        <p className="text-center">Bienvenido, {user?.displayName}</p>
      </div>
      <button onClick={handleSignOut} className="justify-self-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
        Log Out
      </button>
    </div>
  );
};

export default Profile;
