import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define o tipo do contexto
interface StateLoginRenderContextType {
  loginRenderType: string;
  setLoginRenderType: React.Dispatch<React.SetStateAction<string>>;
}

// Cria o contexto com tipagem inicial como undefined
const StateLoginRender = createContext<StateLoginRenderContextType | undefined>(undefined);

// Define as props para o provider
interface LoginRenderProviderProps {
  children: ReactNode;
}

// Cria o provider para o contexto
export const LoginRenderProvider: React.FC<LoginRenderProviderProps> = ({ children }) => {
  // Estado para armazenar o tipo de autenticação
  const [loginRenderType, setLoginRenderType] = useState<string>('sign in'); // Ou 'sign up'

  return (
    <StateLoginRender.Provider value={{ loginRenderType, setLoginRenderType }}>
      {children}
    </StateLoginRender.Provider>
  );
};

// Custom hook para usar o StateLoginRender
export const useLoginRender = (): StateLoginRenderContextType => {
  const context = useContext(StateLoginRender);

  if (!context) {
    throw new Error('useLoginRender deve ser usado dentro de um LoginRenderProvider');
  }

  return context;
};
