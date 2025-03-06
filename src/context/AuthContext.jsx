import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicializa user como null

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Usuario autenticado:", result.user);
      })
      .catch((error) => {
        console.error("Error durante el login:", error);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuario cerró sesión");
      })
      .catch((error) => {
        console.error("Error durante el logout:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualiza el estado del usuario
      console.log("user", currentUser);
    });
    return () => unsubscribe(); // Limpia la suscripción
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};