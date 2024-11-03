// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [rut, setRut] = useState(localStorage.getItem("rut"));

  // Función para iniciar sesión y guardar userType y rut en localStorage
  const login = (type, userRut) => {
    localStorage.setItem("userType", type);
    localStorage.setItem("rut", userRut);
    setUserType(type);
    setRut(userRut);
  };

  // Función para cerrar sesión y eliminar userType y rut de localStorage
  const logout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("rut");
    setUserType(null);
    setRut(null);
  };

  useEffect(() => {
    // Sincronizar userType y rut con localStorage cuando se actualizan
    setUserType(localStorage.getItem("userType"));
    setRut(localStorage.getItem("rut"));
  }, []);

  return (
    <UserContext.Provider value={{ userType, rut, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};