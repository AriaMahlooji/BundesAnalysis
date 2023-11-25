import React, { createContext, useContext, useState } from 'react';

const AscendingContext = createContext();

export const useAscending = () => {
  return useContext(AscendingContext);
};

export const AscendingProvider = ({ children }) => {
  const [ascending, setAscending] = useState("false");

  return (
    <AscendingContext.Provider value={{ ascending, setAscending }}>
      {children}
    </AscendingContext.Provider>
  );
};