import React, { createContext, useContext, useState } from 'react';

const TeamIdContext = createContext();

export const useTeamId = () => {
  return useContext(TeamIdContext);
};

export const TeamIdProvider = ({ children }) => {
  const [teamId, setTeamId] = useState(8);

  return (
    <TeamIdContext.Provider value={{ teamId, setTeamId }}>
      {children}
    </TeamIdContext.Provider>
  );
};