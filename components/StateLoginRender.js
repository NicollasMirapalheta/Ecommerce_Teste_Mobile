// StateLoginRender.js
import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const StateLoginRender = createContext();

// Cria o provider para o contexto
export const LoginRenderProvider = ({ children }) => {
  // Estado para armazenar o tipo de autenticação
  const [loginRenderType, setLoginRenderType] = useState('sign in'); // Ou 'sign up'

  return (
    <StateLoginRender.Provider value={{ loginRenderType, setLoginRenderType }}>
      {children}
    </StateLoginRender.Provider>
  );
};

// Custom hook para usar o StateLoginRender
export const useLoginRender = () => {
  return useContext(StateLoginRender);
};
