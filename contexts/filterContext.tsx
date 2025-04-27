import React, { createContext, useState, useContext } from 'react';

// Tipo para o valor do contexto
type FiltroContextType = {
  filtro: string;
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
};

const FiltroContext = createContext<FiltroContextType | undefined>(undefined);

export const FiltroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filtro, setFiltro] = useState('');

  return (
    <FiltroContext.Provider value={{ filtro, setFiltro }}>
      {children}
    </FiltroContext.Provider>
  );
};

// Hook para usar o contexto
export const useFiltro = () => {
  const context = useContext(FiltroContext);
  if (!context) {
    throw new Error('useFiltro deve ser usado dentro de um FiltroProvider');
  }
  return context;
};
