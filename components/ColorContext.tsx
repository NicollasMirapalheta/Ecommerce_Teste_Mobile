import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ColorContextProps {
  colorAbaSigIn: string;
  colorAbaSigUp: string;
  toggleColors: () => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const useColorContext = (): ColorContextProps => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};

export const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorAbaSigIn, setColorAbaSigIn] = useState('#57CEA7');
  const [colorAbaSigUp, setColorAbaSigUp] = useState('white');

  const toggleColors = () => {
    setColorAbaSigIn(prev => (prev === '#57CEA7' ? 'white' : '#57CEA7'));
    setColorAbaSigUp(prev => (prev === 'white' ? '#57CEA7' : 'white'));
  };

  return (
    <ColorContext.Provider value={{ colorAbaSigIn, colorAbaSigUp, toggleColors }}>
      {children}
    </ColorContext.Provider>
  );
};
