import React, { createContext, useContext, useState } from 'react';

const SideContext = createContext();

export const useSide = () => {
  return useContext(SideContext);
};

export const SideProvider = ({ children }) => {
  const [side, setSide] = useState("by");

  return (
    <SideContext.Provider value={{ side, setSide }}>
      {children}
    </SideContext.Provider>
  );
};