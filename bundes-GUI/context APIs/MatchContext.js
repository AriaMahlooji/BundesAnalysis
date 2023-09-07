import React, { createContext, useContext, useState } from 'react';

const MatchContext = createContext();

export const useMatch = () => {
  return useContext(MatchContext);
};

export const MatchProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);

  return (
    <MatchContext.Provider value={{ matches, setMatches}}>
      {children}
    </MatchContext.Provider>
  );
};