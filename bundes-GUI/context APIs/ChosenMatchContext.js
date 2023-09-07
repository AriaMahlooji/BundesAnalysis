import React, { createContext, useContext, useState } from 'react';

const ChosenMatchContext = createContext();

export const useChosenMatch = () => {
  return useContext(ChosenMatchContext);
};

export const ChosenMatchProvider = ({ children }) => {
  const [chosenMatch, setChosenMatch] = useState();

  return (
    <ChosenMatchContext.Provider value={{ chosenMatch, setChosenMatch}}>
      {children}
    </ChosenMatchContext.Provider>
  );
};