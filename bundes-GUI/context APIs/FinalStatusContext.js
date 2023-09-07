import React, { createContext, useContext, useState } from 'react';

const FinalStatusContext = createContext();

export const useFinalStatus = () => {
  return useContext(FinalStatusContext);
};

export const FinalStatusProvider = ({ children }) => {
  const [finalStatus, setFinalStatus] = useState(["won", "draw", "lost"]);

  return (
    <FinalStatusContext.Provider value={{ finalStatus, setFinalStatus }}>
      {children}
    </FinalStatusContext.Provider>
  );
};