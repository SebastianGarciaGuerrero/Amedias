import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-900 text-white shadow-md flex items-center justify-between px-6 z-50">
      <h1 className="text-xl font-bold">Amedias!!</h1>
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-blue-400 transition-colors">
          Inicio
        </Link>
        {user?.displayName ? (
          <button onClick={handleSignOut}>Log Out</button>
        ) : (
          <Link to="/Signin" className="hover:text-blue-400 transition-colors">
            Sign in
          </Link>
        )}
        <Link to="/contacto" className="hover:text-blue-400 transition-colors">
          Contacto
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
