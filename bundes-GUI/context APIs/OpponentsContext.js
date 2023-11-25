import React, { createContext, useContext, useState } from 'react';

const OpponentsContext = createContext();

export const useOpponents = () => {
  return useContext(OpponentsContext);
};

export const OpponentsProvider = ({ children }) => {
  const [opponents, setOpponents] = useState();

  return (
    <OpponentsContext.Provider value={{ opponents, setOpponents }}>
      {children}
    </OpponentsContext.Provider>
  );
};