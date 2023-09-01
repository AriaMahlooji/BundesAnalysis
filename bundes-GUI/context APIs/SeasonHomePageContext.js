import React, { createContext, useContext, useState } from 'react';

const SeasonContext = createContext();

export const useSeason = () => {
  return useContext(SeasonContext);
};

export const SeasonProvider = ({ children }) => {
  const [seasons, setSeasons] = useState(["15/16", "16/17", "17/18", "18/19", "19/20", "20/21", "21/22"]);

  return (
    <SeasonContext.Provider value={{ seasons, setSeasons }}>
      {children}
    </SeasonContext.Provider>
  );
};