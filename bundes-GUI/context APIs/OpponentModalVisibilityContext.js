import React, { createContext, useContext, useState } from 'react';

const OpponentsModalIsOpenContext = createContext();

export const useOpponentsModalIsOpen = () => {
  return useContext(OpponentsModalIsOpenContext);
};

export const OpponentsModalIsOpenProvider = ({ children }) => {
  const [opponentsModalIsOpen, setOpponentsModalIsOpen] = useState(false);

  return (
    <OpponentsModalIsOpenContext.Provider value={{ opponentsModalIsOpen, setOpponentsModalIsOpen }}>
      {children}
    </OpponentsModalIsOpenContext.Provider>
  );
};