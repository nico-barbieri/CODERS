import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [context, setContext] = useState(null);

  return (
    <GameContext.Provider value={{ context, setContext }}>
      {children}
    </GameContext.Provider>
  );
};